import uuid
from django.contrib.gis.db.models.fields import PointField
from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [migrations.CreateModel(
        name="Destination",
        fields=[
            ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
            ("slug", models.SlugField(max_length=180, unique=True)),
            ("name", models.CharField(max_length=160)),
            ("country", models.CharField(blank=True, max_length=120)),
            ("summary", models.TextField(blank=True)),
            ("description", models.TextField(blank=True)),
            ("image_url", models.URLField(blank=True)),
            ("hero_image_url", models.URLField(blank=True)),
            ("starting_price", models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
            ("center", PointField(blank=True, geography=True, null=True, srid=4326)),
            ("is_published", models.BooleanField(db_index=True, default=False)),
            ("created_at", models.DateTimeField(auto_now_add=True)),
            ("updated_at", models.DateTimeField(auto_now=True)),
        ],
        options={"ordering": ("name",)},
    ), migrations.AddIndex(model_name="destination", index=models.Index(fields=["is_published", "name"], name="dest_pub_name_idx"))]
