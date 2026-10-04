import pytest
from django.urls import reverse

@pytest.mark.django_db
def test_health(client):
    response = client.get("/api/v1/health/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
