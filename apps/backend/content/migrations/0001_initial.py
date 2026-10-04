import uuid
import django.db.models.deletion
from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True
    dependencies = [("destinations", "0001_initial"), ("places", "0001_initial")]
    operations = [migrations.CreateModel(name="Article", fields=[
        ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
        ("slug", models.SlugField(max_length=220, unique=True)),
        ("title", models.CharField(max_length=220)),
        ("excerpt", models.TextField(blank=True)),
        ("body", models.TextField()),
        ("cover_image", models.URLField(blank=True)),
        ("status", models.CharField(choices=[("draft", "Draft"), ("review", "In review"), ("published", "Published")], db_index=True, default="draft", max_length=20)),
        ("published_at", models.DateTimeField(blank=True, null=True)),
        ("created_at", models.DateTimeField(auto_now_add=True)),
        ("updated_at", models.DateTimeField(auto_now=True)),
        ("destination", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="articles", to="destinations.destination")),
        ("place", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="articles", to="places.place")),
    ], options={"ordering": ("-published_at", "-created_at")})]
