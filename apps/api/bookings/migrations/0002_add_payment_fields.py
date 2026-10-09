from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("bookings", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="booking",
            name="payment_method",
            field=models.CharField(default="vnpay", max_length=32),
        ),
        migrations.AddField(
            model_name="booking",
            name="payment_status",
            field=models.CharField(db_index=True, default="unpaid", max_length=32),
        ),
        migrations.AlterField(
            model_name="booking",
            name="status",
            field=models.CharField(
                choices=[
                    ("pending", "Chờ xác nhận"),
                    ("paid", "Đã thanh toán"),
                    ("confirmed", "Đã xác nhận"),
                    ("cancelled", "Đã hủy"),
                    ("completed", "Hoàn thành"),
                ],
                db_index=True,
                default="pending",
                max_length=32,
            ),
        ),
    ]
