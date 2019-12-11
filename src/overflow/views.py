"""
Main views
"""

from django.views.generic import ListView

from blog.models import Post

class FrontPageView(ListView):
    model = Post
    template_name = 'index.html'
    context_object_name = 'posts'
