from django.db import transaction
from django.utils import timezone
from django.utils.text import slugify
from rest_framework.exceptions import ValidationError
from accounts.models import User
from audit.models import AuditEvent
from .models import PartnerApplication, PartnerMembership, PartnerOrganization

TERMINAL = {PartnerApplication.Status.APPROVED, PartnerApplication.Status.REJECTED}

def _unique_slug(name: str) -> str:
    base = slugify(name)[:160] or "partner"
    slug = base
    counter = 2
    while PartnerOrganization.objects.filter(slug=slug).exists():
        slug = f"{base}-{counter}"
        counter += 1
    return slug

@transaction.atomic
def mark_under_review(*, application_id, reviewer):
    application = PartnerApplication.objects.select_for_update().get(pk=application_id)
    if application.status != PartnerApplication.Status.SUBMITTED:
        raise ValidationError("Only submitted applications can move under review.")
    application.status = PartnerApplication.Status.UNDER_REVIEW
    application.reviewed_by = reviewer
    application.reviewed_at = timezone.now()
    application.save(update_fields=("status", "reviewed_by", "reviewed_at", "updated_at"))
    AuditEvent.objects.create(actor=reviewer, action="partner_application.under_review", target_type="PartnerApplication", target_id=str(application.pk))
    return application

@transaction.atomic
def approve_application(*, application_id, reviewer):
    application = PartnerApplication.objects.select_for_update().select_related("applicant").get(pk=application_id)
    if application.status in TERMINAL:
        raise ValidationError("Terminal applications cannot be reviewed again.")
    if application.status not in {PartnerApplication.Status.SUBMITTED, PartnerApplication.Status.UNDER_REVIEW}:
        raise ValidationError("Application cannot be approved from its current state.")
    organization = PartnerOrganization.objects.create(name=application.business_name, slug=_unique_slug(application.business_name), source_application=application)
    PartnerMembership.objects.create(organization=organization, user=application.applicant, role=PartnerMembership.Role.OWNER)
    if application.applicant.role == User.Role.TRAVELER:
        application.applicant.role = User.Role.PARTNER
        application.applicant.save(update_fields=("role",))
    application.status = PartnerApplication.Status.APPROVED
    application.reviewed_by = reviewer
    application.reviewed_at = timezone.now()
    application.rejection_reason = ""
    application.save(update_fields=("status", "reviewed_by", "reviewed_at", "rejection_reason", "updated_at"))
    AuditEvent.objects.create(actor=reviewer, action="partner_application.approved", target_type="PartnerApplication", target_id=str(application.pk), payload={"organization_id": str(organization.pk)})
    return application

@transaction.atomic
def reject_application(*, application_id, reviewer, reason: str):
    reason = reason.strip()
    if not reason:
        raise ValidationError("A rejection reason is required.")
    application = PartnerApplication.objects.select_for_update().get(pk=application_id)
    if application.status in TERMINAL:
        raise ValidationError("Terminal applications cannot be reviewed again.")
    application.status = PartnerApplication.Status.REJECTED
    application.rejection_reason = reason
    application.reviewed_by = reviewer
    application.reviewed_at = timezone.now()
    application.save(update_fields=("status", "rejection_reason", "reviewed_by", "reviewed_at", "updated_at"))
    AuditEvent.objects.create(actor=reviewer, action="partner_application.rejected", target_type="PartnerApplication", target_id=str(application.pk), payload={"reason": reason})
    return application
