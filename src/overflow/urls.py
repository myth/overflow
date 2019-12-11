"""
Root URL config
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from overflow.views import FrontPageView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', FrontPageView.as_view(), name='index'),
    path('blog/', include('blog.urls', namespace='blog'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
