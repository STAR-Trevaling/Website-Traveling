from django.urls import path

from .views import InquiryCreateView, OdooWebhookReceiverView

urlpatterns = [
    path("inquiries/", InquiryCreateView.as_view(), name="inquiry-create"),
    path(
        "integrations/v1/odoo/events", OdooWebhookReceiverView.as_view(), name="odoo-webhook-events"
    ),
]
