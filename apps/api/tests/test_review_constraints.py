import pytest
from django.contrib.gis.geos import Point
from django.db import IntegrityError

from accounts.models import User
from destinations.models import Destination
from places.models import Category, Place
from reviews.models import Review


@pytest.mark.django_db(transaction=True)
def test_one_review_per_user_place():
    user = User.objects.create_user(username="u", password="x")
    destination = Destination.objects.create(slug="d", name="D", is_published=True)
    category = Category.objects.create(slug="c", name="C")
    place = Place.objects.create(
        slug="p",
        name="P",
        destination=destination,
        category=category,
        location=Point(0, 0, srid=4326),
        is_published=True,
    )
    Review.objects.create(user=user, place=place, rating=5)
    with pytest.raises(IntegrityError):
        Review.objects.create(user=user, place=place, rating=4)
