from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class TravelUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (("Platform", {"fields": ("role",)}),)
    add_fieldsets = UserAdmin.add_fieldsets + (("Platform", {"fields": ("role",)}),)
    list_display = ("username", "email", "role", "is_staff", "is_active")
    list_filter = ("role", "is_staff", "is_active")
