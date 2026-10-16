import uuid
from decimal import Decimal

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("bookings", "0002_add_payment_fields"),
    ]

    operations = [
        migrations.CreateModel(
            name="PaymentTransaction",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4, editable=False, primary_key=True, serialize=False
                    ),
                ),
                (
                    "transaction_code",
                    models.CharField(
                        db_index=True,
                        help_text="Mã giao dịch gửi sang cổng thanh toán (vnp_TxnRef)",
                        max_length=64,
                        unique=True,
                    ),
                ),
                (
                    "provider",
                    models.CharField(
                        choices=[
                            ("vnpay", "VNPay"),
                            ("vietqr", "VietQR"),
                            ("momo", "MoMo"),
                            ("zalopay", "ZaloPay"),
                            ("stripe", "Stripe"),
                        ],
                        db_index=True,
                        default="vnpay",
                        max_length=32,
                    ),
                ),
                (
                    "provider_ref",
                    models.CharField(
                        blank=True,
                        db_index=True,
                        help_text="Mã tham chiếu từ cổng thanh toán (vnp_TransactionNo)",
                        max_length=128,
                        null=True,
                    ),
                ),
                (
                    "amount",
                    models.DecimalField(decimal_places=2, default=Decimal("0.00"), max_digits=12),
                ),
                ("currency", models.CharField(default="VND", max_length=8)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "Chờ thanh toán"),
                            ("success", "Thành công"),
                            ("failed", "Thất bại"),
                            ("expired", "Hết hạn"),
                            ("refunded", "Đã hoàn tiền"),
                        ],
                        db_index=True,
                        default="pending",
                        max_length=32,
                    ),
                ),
                (
                    "idempotency_key",
                    models.CharField(
                        db_index=True,
                        help_text="Khóa chống xử lý lặp lại webhook",
                        max_length=128,
                        unique=True,
                    ),
                ),
                ("request_payload", models.JSONField(blank=True, default=dict)),
                ("response_payload", models.JSONField(blank=True, default=dict)),
                ("error_code", models.CharField(blank=True, max_length=64, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
                ("completed_at", models.DateTimeField(blank=True, null=True)),
                ("expires_at", models.DateTimeField(blank=True, null=True)),
                (
                    "booking",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="payment_transactions",
                        to="bookings.booking",
                    ),
                ),
            ],
            options={
                "verbose_name": "Payment Transaction",
                "verbose_name_plural": "Payment Transactions",
                "ordering": ["-created_at"],
            },
        ),
    ]
