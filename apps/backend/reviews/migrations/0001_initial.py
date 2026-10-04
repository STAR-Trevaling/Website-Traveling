import uuid
from django.conf import settings
import django.db.models.deletion
from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True
    dependencies = [migrations.swappable_dependency(settings.AUTH_USER_MODEL), ("places", "0001_initial")]
    operations = [
        migrations.CreateModel(name="Favorite", fields=[
            ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
            ("created_at", models.DateTimeField(auto_now_add=True)),
            ("place", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="favorites", to="places.place")),
            ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="favorites", to=settings.AUTH_USER_MODEL)),
        ], options={"ordering": ("-created_at",)}),
        migrations.CreateModel(name="Review", fields=[
            ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
            ("rating", models.PositiveSmallIntegerField()),
            ("body", models.TextField(blank=True)),
            ("is_published", models.BooleanField(db_index=True, default=True)),
            ("created_at", models.DateTimeField(auto_now_add=True)),
            ("updated_at", models.DateTimeField(auto_now=True)),
            ("place", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="reviews", to="places.place")),
            ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="reviews", to=settings.AUTH_USER_MODEL)),
        ], options={"ordering": ("-created_at",)}),
        migrations.AddConstraint(model_name="favorite", constraint=models.UniqueConstraint(fields=("user", "place"), name="unique_user_place_favorite")),
        migrations.AddConstraint(model_name="review", constraint=models.UniqueConstraint(fields=("user", "place"), name="unique_user_place_review")),
        migrations.AddConstraint(model_name="review", constraint=models.CheckConstraint(condition=models.Q(("rating__gte", 1), ("rating__lte", 5)), name="rating_1_5")),
    ]
