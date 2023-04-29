"""
Main views
"""

from blog.views import BlogListView


class FrontPageView(BlogListView):
    template_name = "index.html"
