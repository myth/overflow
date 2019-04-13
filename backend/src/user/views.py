from django.contrib.auth import get_user_model
from rest_framework import viewsets

from user.serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read only access to selected fields from the user database
    """

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
