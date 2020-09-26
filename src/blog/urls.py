"""
Blog urls
"""

from django.urls import path

from blog.views import BlogDetailView, BlogListView, BlogTagsView

app_name = 'blog'

urlpatterns = [
    path('', BlogListView.as_view(), name='index'),
    path('<int:year>/<int:month>/<int:day>/<str:slug>/', BlogDetailView.as_view(), name='detail'),
    path('tag/', BlogTagsView.as_view(), name='tags'),
    path('tag/<str:tag>/', BlogTagsView.as_view(), name='tags'),
]
