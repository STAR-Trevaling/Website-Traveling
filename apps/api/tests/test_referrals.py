from decimal import Decimal

import pytest
from django.contrib.gis.geos import Point
from rest_framework.test import APIClient

from accommodations.models import Accommodation
from bookings.models import Booking
from destinations.models import Destination
from restaurants.models import Restaurant


@pytest.mark.django_db
def test_referral_tracking_accommodation():
    dest = Destination.objects.create(
        name="Hà Nội",
        slug="ha-noi",
        country="Việt Nam",
        summary="Thủ đô nghìn năm văn hiến",
        description="Thủ đô cổ kính",
        image_url="https://example.com/hanoi.jpg",
        hero_image_url="https://example.com/hanoi-hero.jpg",
    )

    acc = Accommodation.objects.create(
        destination=dest,
        slug="sofitel-metropole-test",
        name="Sofitel Legend Metropole Hanoi",
        category="heritage_hotel",
        star_rating=5,
        address="15 Ngô Quyền, Hà Nội",
        location=Point(105.8562, 21.0253, srid=4326),
        description="Khách sạn di sản",
        amenities=["Hồ bơi", "Spa"],
        price_from=Decimal("7500000"),
        image_url="https://example.com/metropole.jpg",
        partner_name="Booking.com",
        partner_booking_url="https://www.booking.com/hotel/vn/metropole.html?aid=startravels",
        partner_commission_rate=Decimal("8.50"),
    )

    client = APIClient()
    response = client.post(
        "/api/v1/referrals/track/",
        {
            "item_type": "accommodation_referral",
            "item_id": str(acc.id),
            "contact_name": "Nguyễn Văn A",
            "contact_phone": "0912345678",
            "contact_email": "nguyenvana@example.com",
        },
        format="json",
    )

    assert response.status_code == 201
    data = response.json()
    assert "booking_id" in data
    assert "booking_code" in data
    assert data["redirect_url"] == acc.partner_booking_url
    assert data["item_type"] == "accommodation_referral"
    assert data["partner_name"] == "Booking.com"

    # Verify Booking record in database
    booking = Booking.objects.get(id=data["booking_id"])
    assert booking.item_type == Booking.ItemType.ACCOMMODATION_REFERRAL
    assert booking.status == Booking.Status.REFERRED
    assert booking.accommodation == acc
    assert booking.referral_partner_name == "Booking.com"
    assert booking.referral_target_url == acc.partner_booking_url
    assert booking.total_amount is None
    assert booking.contact_name == "Nguyễn Văn A"
    assert booking.contact_phone == "0912345678"


@pytest.mark.django_db
def test_referral_tracking_restaurant():
    dest = Destination.objects.create(
        name="Đà Nẵng",
        slug="da-nang",
        country="Việt Nam",
        summary="Thành phố biển đáng sống",
        description="Thành phố biển miền Trung",
        image_url="https://example.com/danang.jpg",
        hero_image_url="https://example.com/danang-hero.jpg",
    )

    res = Restaurant.objects.create(
        destination=dest,
        slug="madame-lan-test",
        name="Nhà Hàng Madame Lân",
        cuisine_type="central_vietnamese",
        price_range="$$",
        address="04 Bạch Đằng, Đà Nẵng",
        location=Point(108.2238, 16.0792, srid=4326),
        description="Ẩm thực miền Trung",
        signature_dishes=["Bánh xèo", "Mì Quảng"],
        image_url="https://example.com/madamelan.jpg",
        contact_type="url",
        contact_value="https://madamelan.vn/dat-ban?ref=startravels",
        partner_commission_rate=Decimal("5.00"),
    )

    client = APIClient()
    response = client.post(
        "/api/v1/referrals/track/",
        {
            "item_type": "restaurant_referral",
            "item_id": str(res.id),
        },
        format="json",
    )

    assert response.status_code == 201
    data = response.json()
    assert data["redirect_url"] == res.contact_value

    booking = Booking.objects.get(id=data["booking_id"])
    assert booking.item_type == Booking.ItemType.RESTAURANT_REFERRAL
    assert booking.status == Booking.Status.REFERRED
    assert booking.restaurant == res
    assert booking.referral_partner_name == res.name
    assert booking.referral_target_url == res.contact_value
    assert booking.total_amount is None


@pytest.mark.django_db
def test_referral_tracking_validation_error():
    client = APIClient()
    response = client.post(
        "/api/v1/referrals/track/",
        {
            "item_type": "invalid_type",
            "item_id": "00000000-0000-0000-0000-000000000000",
        },
        format="json",
    )
    assert response.status_code == 400
