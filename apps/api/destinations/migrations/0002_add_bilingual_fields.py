from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("destinations", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="destination",
            name="name_en",
            field=models.CharField(blank=True, max_length=160),
        ),
        migrations.AddField(
            model_name="destination",
            name="country_en",
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.AddField(
            model_name="destination",
            name="summary_en",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="destination",
            name="description_en",
            field=models.TextField(blank=True),
        ),
    ]
