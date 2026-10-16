import hashlib
import hmac
import os
import urllib.parse
from datetime import datetime, timedelta, timezone
from typing import Any

try:
    from django.conf import settings

    def _get_setting(key: str, default: str) -> str:
        if settings.configured:
            return getattr(settings, key, os.getenv(key, default))
        return os.getenv(key, default)
except ImportError:

    def _get_setting(key: str, default: str) -> str:
        return os.getenv(key, default)


# Vietnam Timezone (UTC+7)
VN_TZ = timezone(timedelta(hours=7))


class VNPayAdapter:
    """
    VNPay Gateway Adapter implementing API Version 2.1.0 specifications.
    Handles HMAC-SHA512 signature creation, URL generation, and IPN verification.
    """

    def __init__(
        self,
        tmn_code: str | None = None,
        hash_secret: str | None = None,
        payment_url: str | None = None,
        return_url: str | None = None,
    ):
        self.tmn_code = tmn_code or _get_setting("VNPAY_TMN_CODE", "")
        self.hash_secret = hash_secret or _get_setting("VNPAY_HASH_SECRET", "")
        self.payment_url = payment_url or _get_setting(
            "VNPAY_PAYMENT_URL",
            "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
        )
        self.return_url = return_url or _get_setting(
            "VNPAY_RETURN_URL",
            "http://localhost:3000/payment/return",
        )

    def generate_payment_url(
        self,
        txn_ref: str,
        amount: int | float,
        order_info: str,
        client_ip: str,
        bank_code: str | None = None,
        locale: str = "vn",
        return_url: str | None = None,
        created_at: datetime | None = None,
        expire_minutes: int = 15,
    ) -> dict[str, Any]:
        """
        Builds the query string, computes HMAC-SHA512 hash, and returns the redirect URL
        and payload for audit logging.
        """
        now = created_at or datetime.now(VN_TZ)
        if now.tzinfo is None:
            now = now.replace(tzinfo=VN_TZ)
        expire_time = now + timedelta(minutes=expire_minutes)

        vnp_create_date = now.strftime("%Y%m%d%H%M%S")
        vnp_expire_date = expire_time.strftime("%Y%m%d%H%M%S")
        vnp_amount = int(round(float(amount) * 100))

        params: dict[str, Any] = {
            "vnp_Version": "2.1.0",
            "vnp_Command": "pay",
            "vnp_TmnCode": self.tmn_code,
            "vnp_Amount": vnp_amount,
            "vnp_CurrCode": "VND",
            "vnp_TxnRef": str(txn_ref),
            "vnp_OrderInfo": order_info,
            "vnp_OrderType": "other",
            "vnp_Locale": "vn" if locale.lower() in ("vi", "vn") else "en",
            "vnp_ReturnUrl": return_url or self.return_url,
            "vnp_IpAddr": client_ip or "127.0.0.1",
            "vnp_CreateDate": vnp_create_date,
            "vnp_ExpireDate": vnp_expire_date,
        }

        if bank_code:
            params["vnp_BankCode"] = bank_code.strip()

        # Step 1 & 2: Filter non-empty and sort keys alphabetically
        sorted_items = sorted(
            [
                (k, str(v))
                for k, v in params.items()
                if v is not None
                and str(v) != ""
                and k not in ("vnp_SecureHash", "vnp_SecureHashType")
            ],
            key=lambda item: item[0],
        )

        # Step 3: Build urlencoded query string with quote_plus
        query_string = urllib.parse.urlencode(sorted_items, quote_via=urllib.parse.quote_plus)

        # Step 4: Calculate HMAC-SHA512 hash
        secure_hash = self._hmac_sha512(self.hash_secret, query_string)

        # Step 5: Append hash to URL
        full_payment_url = f"{self.payment_url}?{query_string}&vnp_SecureHash={secure_hash}"

        return {
            "payment_url": full_payment_url,
            "query_string": query_string,
            "secure_hash": secure_hash,
            "params": params,
            "expires_at": expire_time,
        }

    def verify_ipn_signature(self, data: dict[str, Any]) -> bool:
        """
        Verifies the HMAC-SHA512 checksum sent in VNPay IPN or Return callback.
        """
        received_hash = data.get("vnp_SecureHash")
        if not received_hash:
            return False

        # Filter out hash parameters and empty values
        sorted_items = sorted(
            [
                (k, str(v))
                for k, v in data.items()
                if v is not None
                and str(v) != ""
                and k not in ("vnp_SecureHash", "vnp_SecureHashType")
                and k.startswith("vnp_")
            ],
            key=lambda item: item[0],
        )

        if not sorted_items:
            return False

        query_string = urllib.parse.urlencode(sorted_items, quote_via=urllib.parse.quote_plus)
        expected_hash = self._hmac_sha512(self.hash_secret, query_string)

        return hmac.compare_digest(expected_hash.lower(), str(received_hash).lower())

    @staticmethod
    def _hmac_sha512(key: str, data: str) -> str:
        byte_key = key.encode("utf-8")
        byte_data = data.encode("utf-8")
        return hmac.new(byte_key, byte_data, hashlib.sha512).hexdigest()

    @staticmethod
    def get_client_ip(request: Any) -> str:
        """Extracts client IP handling X-Forwarded-For load balancer proxies."""
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0].strip()
        else:
            ip = request.META.get("REMOTE_ADDR", "127.0.0.1")
        return ip
