import uuid
from django.conf import settings
import django.db.models.deletion
from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True
    dependencies = [migrations.swappable_dependency(settings.AUTH_USER_MODEL)]
    operations = [migrations.CreateModel(name="AuditEvent", fields=[
        ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
        ("action", models.CharField(db_index=True, max_length=120)),
        ("target_type", models.CharField(db_index=True, max_length=120)),
        ("target_id", models.CharField(db_index=True, max_length=120)),
        ("payload", models.JSONField(blank=True, default=dict)),
        ("created_at", models.DateTimeField(auto_now_add=True, db_index=True)),
        ("actor", models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name="audit_events", to=settings.AUTH_USER_MODEL)),
    ], options={"ordering": ("-created_at",)})]
