"""Blog urls
"""

from django.urls import path

from .views import KeyboardIndexView

app_name = "keyboard"
urlpatterns = [
    path("", KeyboardIndexView.as_view(), name="index"),
]
