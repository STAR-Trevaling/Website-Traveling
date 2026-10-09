from django.urls import path

from .views import (
    PaymentCreateView,
    PaymentQueryView,
    PaymentStatusView,
    VietQRConfirmView,
    VNPayIPNView,
)

urlpatterns = [
    path("payments/create/", PaymentCreateView.as_view(), name="payment_create"),
    path("payments/<str:id>/status/", PaymentStatusView.as_view(), name="payment_status"),
    path(
        "payments/<str:id>/vietqr-confirm/",
        VietQRConfirmView.as_view(),
        name="payment_vietqr_confirm",
    ),
    path("payments/webhook/vnpay/", VNPayIPNView.as_view(), name="vnpay_webhook"),
    path("payments/vnpay/ipn/", VNPayIPNView.as_view(), name="vnpay_ipn_alias"),
    path("payments/query/", PaymentQueryView.as_view(), name="payment_query"),
]
