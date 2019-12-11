"""
Blog urls
"""

from django.urls import path

from blog.views import BlogDetailView, BlogListView

app_name = 'blog'

urlpatterns = [
    path('', BlogListView.as_view(), name='index'),
    path('<int:year>/', BlogListView.as_view(), name='year_list'),
    path('<int:year>/<int:month>/', BlogListView.as_view(), name='month_list'),
    path('<int:year>/<int:month>/<int:day>/', BlogListView.as_view(), name='day_list'),
    path('<int:year>/<int:month>/<int:day>/<str:slug>/', BlogDetailView.as_view(), name='detail'),
    path('tag/', BlogListView.as_view(), name='tag'),
    path('tag/<str:tag>/', BlogListView.as_view(), name='tag'),
]
