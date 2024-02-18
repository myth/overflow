"""About urls"""

from django.urls import path

from about.views import index

app_name = "about"

urlpatterns = [
    path("", index, name="index"),
]
