import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        TRAVELER = "traveler", "Traveler"
        PARTNER = "partner", "Partner"
        ADMIN = "admin", "Admin"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(
        max_length=24, choices=Role.choices, default=Role.TRAVELER, db_index=True
    )

    def save(self, *args, **kwargs):
        if self.is_staff and self.role != self.Role.ADMIN:
            self.role = self.Role.ADMIN
        super().save(*args, **kwargs)
