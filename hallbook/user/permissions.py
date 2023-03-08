from rest_framework.permissions import BasePermission
from .models import CustomUser


class IsAdminUser(BasePermission):
    """
    Custom permission to only allow admin users to access the view.
    """

    def has_permission(self, request, view):
        """
        Check if user is authenticated and is an admin user.
        """
        return request.user.is_authenticated and request.user.user_type == "admin"


class IsStudentUser(BasePermission):
    """
    Custom permission to only allow student users to access the view.
    """

    def has_permission(self, request, view):
        """
        Check if user is authenticated and is a student user.
        """
        return request.user.is_authenticated and request.user.user_type == "student"


class IsFacultyUser(BasePermission):
    """
    Custom permission to only allow faculty users to access the view.
    """

    def has_permission(self, request, view):
        """
        Check if user is authenticated and is a faculty user.
        """
        return request.user.is_authenticated and request.user.user_type == "faculty"


class IsFacultyOrAdminUser(BasePermission):
    def has_permission(self, request, view):
        return IsFacultyUser().has_permission(request, view) or IsAdminUser().has_permission(request, view)
