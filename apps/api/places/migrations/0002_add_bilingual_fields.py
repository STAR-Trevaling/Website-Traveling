from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("places", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="category",
            name="name_en",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="place",
            name="name_en",
            field=models.CharField(blank=True, max_length=180),
        ),
        migrations.AddField(
            model_name="place",
            name="short_description_en",
            field=models.CharField(blank=True, max_length=280),
        ),
        migrations.AddField(
            model_name="place",
            name="description_en",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="place",
            name="address_en",
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
