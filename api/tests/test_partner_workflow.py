import pytest

from accounts.models import User
from partners.models import PartnerApplication, PartnerMembership
from partners.services import approve_application


@pytest.mark.django_db(transaction=True)
def test_approval_creates_owner_membership_and_promotes_applicant():
    reviewer = User.objects.create_user(username="admin", password="x", is_staff=True)
    applicant = User.objects.create_user(username="traveler", password="x")
    application = PartnerApplication.objects.create(
        applicant=applicant, business_name="Local Co", email="a@example.com"
    )
    approved = approve_application(application_id=application.pk, reviewer=reviewer)
    applicant.refresh_from_db()
    assert approved.status == PartnerApplication.Status.APPROVED
    assert applicant.role == User.Role.PARTNER
    assert (
        PartnerMembership.objects.filter(user=applicant, role=PartnerMembership.Role.OWNER).count()
        == 1
    )
