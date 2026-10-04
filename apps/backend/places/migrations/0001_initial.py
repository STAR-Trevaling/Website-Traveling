import uuid
import django.db.models.deletion
from django.contrib.gis.db.models.fields import PointField
from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True
    dependencies = [("destinations", "0001_initial")]
    operations = [
        migrations.CreateModel(name="Category", fields=[
            ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
            ("name", models.CharField(max_length=100, unique=True)),
            ("slug", models.SlugField(max_length=120, unique=True)),
        ], options={"ordering": ("name",), "verbose_name_plural": "categories"}),
        migrations.CreateModel(name="Place", fields=[
            ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
            ("slug", models.SlugField(max_length=180, unique=True)),
            ("name", models.CharField(max_length=180)),
            ("short_description", models.CharField(blank=True, max_length=280)),
            ("description", models.TextField(blank=True)),
            ("image_url", models.URLField(blank=True)),
            ("overlay_image_url", models.URLField(blank=True)),
            ("address", models.CharField(blank=True, max_length=255)),
            ("website_url", models.URLField(blank=True)),
            ("location", PointField(geography=True, srid=4326)),
            ("is_published", models.BooleanField(db_index=True, default=False)),
            ("average_rating", models.DecimalField(decimal_places=2, default=0, max_digits=3)),
            ("review_count", models.PositiveIntegerField(default=0)),
            ("created_at", models.DateTimeField(auto_now_add=True)),
            ("updated_at", models.DateTimeField(auto_now=True)),
            ("category", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="places", to="places.category")),
            ("destination", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="places", to="destinations.destination")),
        ], options={"ordering": ("name",)}),
        migrations.AddIndex(model_name="place", index=models.Index(fields=["is_published", "destination"], name="place_pub_dest_idx")),
        migrations.AddIndex(model_name="place", index=models.Index(fields=["category", "is_published"], name="place_cat_pub_idx")),
    ]
