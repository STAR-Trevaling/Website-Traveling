import hashlib
import hmac
import logging
from typing import Any

from django.conf import settings
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .adapters.vnpay import VNPayAdapter
from .serializers import PaymentCreateSerializer, VietQRConfirmSerializer
from .services import PaymentService

logger = logging.getLogger(__name__)


class PaymentCreateView(APIView):
    permission_classes = (permissions.AllowAny,)

    @extend_schema(
        request=PaymentCreateSerializer,
        responses={201: dict},
        description="Khởi tạo giao dịch thanh toán trực tuyến qua VNPay hoặc VietQR.",
    )
    def post(self, request):
        serializer = PaymentCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        gateway = str(data.get("gateway", "vnpay")).lower().strip()
        service = PaymentService()

        if gateway == "vietqr":
            result = service.create_vietqr_payment(
                booking_code=data["booking_code"],
            )
            return Response(result, status=status.HTTP_201_CREATED)

        if gateway == "vnpay":
            client_ip = VNPayAdapter.get_client_ip(request)
            result = service.create_vnpay_payment(
                booking_code=data["booking_code"],
                client_ip=client_ip,
                bank_code=data.get("bank_code") or None,
                locale=data.get("locale", "vn"),
                return_url=data.get("return_url") or None,
            )
            return Response(result, status=status.HTTP_201_CREATED)

        return Response(
            {
                "gateway": (
                    f"Cổng thanh toán '{gateway}' chưa được hỗ trợ. "
                    "Vui lòng chọn 'vnpay' hoặc 'vietqr'."
                )
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class PaymentStatusView(APIView):
    """
    API truy vấn trạng thái thanh toán theo ID giao dịch hoặc transaction_code (cho frontend polling).
    Endpoint: GET /api/v1/payments/{id}/status/
    """

    permission_classes = (permissions.AllowAny,)

    @extend_schema(
        responses={200: dict},
        description="Truy vấn trạng thái thanh toán hiện tại của giao dịch.",
    )
    def get(self, request, id: str):
        service = PaymentService()
        result = service.query_transaction_status(id)
        if not result:
            return Response(
                {"detail": f"Không tìm thấy giao dịch thanh toán với mã {id}."},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(result, status=status.HTTP_200_OK)


class VietQRConfirmView(APIView):
    """
    Endpoint nội bộ nhận xác nhận thanh toán VietQR từ Odoo ERP (kế toán xác nhận hoặc SePay/Casso).
    Bảo vệ bằng HMAC-SHA256 signature (X-Signature-SHA256 header) từ Odoo ERP.
    Endpoint: POST /api/v1/payments/{id}/vietqr-confirm/
    """

    permission_classes = (permissions.AllowAny,)

    def _verify_hmac(self, request) -> bool:
        secret = getattr(
            settings, "ODOO_WEBHOOK_SECRET", "star_travels_super_secret_webhook_key_2026"
        )
        sig_header = request.headers.get("X-Signature-SHA256")
        if not sig_header:
            return False

        raw_body = request.body
        computed_sig = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
        return hmac.compare_digest(sig_header, computed_sig)

    @extend_schema(
        request=VietQRConfirmSerializer,
        responses={200: dict},
        description="Xác nhận thanh toán VietQR từ Odoo ERP (yêu cầu chữ ký HMAC-SHA256).",
    )
    def post(self, request, id: str):
        # 1. Verify HMAC-SHA256 Signature
        if not self._verify_hmac(request):
            logger.warning(
                f"Unauthorized attempt to confirm VietQR payment {id} without valid HMAC-SHA256."
            )
            return Response(
                {
                    "type": "https://star-travels.com/errors/unauthorized",
                    "title": "Unauthorized",
                    "status": 401,
                    "detail": "Invalid or missing HMAC-SHA256 signature in X-Signature-SHA256 header.",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = VietQRConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        service = PaymentService()
        result = service.confirm_vietqr_payment(id, serializer.validated_data)

        return Response(result, status=status.HTTP_200_OK)


class VNPayIPNView(APIView):
    """
    Webhook tiếp nhận Instant Payment Notification (IPN) từ máy chủ VNPay (Server-to-Server).
    Hỗ trợ cả giao thức HTTP GET và POST theo tiêu chuẩn tài liệu VNPay 2.1.0.
    """

    permission_classes = (permissions.AllowAny,)

    def _handle_ipn(self, request) -> Response:
        params: dict[str, Any] = {}
        if request.GET:
            params.update(request.GET.dict())
        if request.data and isinstance(request.data, dict):
            params.update(request.data)

        logger.info(f"Received VNPay IPN payload with {len(params)} parameters.")
        service = PaymentService()
        rsp = service.process_vnpay_ipn(params)

        return Response(rsp, status=status.HTTP_200_OK)

    def get(self, request):
        return self._handle_ipn(request)

    def post(self, request):
        return self._handle_ipn(request)


class PaymentQueryView(APIView):
    """
    API truy vấn trạng thái thanh toán từ Database theo query params (txn_ref hoặc vnp_TxnRef).
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        txn_ref = request.query_params.get("txn_ref") or request.query_params.get("vnp_TxnRef")
        if not txn_ref:
            return Response(
                {"detail": "Vui lòng cung cấp tham số txn_ref hoặc vnp_TxnRef."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        service = PaymentService()
        result = service.query_transaction_status(txn_ref)
        if not result:
            return Response(
                {"detail": f"Không tìm thấy giao dịch thanh toán {txn_ref}."},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(result, status=status.HTTP_200_OK)
