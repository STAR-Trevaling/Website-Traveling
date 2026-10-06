from django.db import transaction
from django.db.models import Avg, Count
from rest_framework.exceptions import ValidationError

from places.models import Place

from .models import Review


def ensure_publishable_place(place: Place):
    if not place.is_published or not place.destination.is_published:
        raise ValidationError("Reviews and favorites are only allowed for published places.")


@transaction.atomic
def refresh_place_rating(place_id):
    aggregate = Review.objects.filter(place_id=place_id, is_published=True).aggregate(
        avg=Avg("rating"), count=Count("id")
    )
    Place.objects.filter(pk=place_id).update(
        average_rating=aggregate["avg"] or 0, review_count=aggregate["count"] or 0
    )
