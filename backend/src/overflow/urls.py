from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth.models import User
from django.urls import include, path
from rest_framework import routers

from blog.views import PostViewSet, TagViewSet

# Django Rest Framework routes
router = routers.DefaultRouter()

router.register(r'posts', PostViewSet, r'post')
router.register(r'tags', TagViewSet, r'tag')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]
