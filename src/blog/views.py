"""
Blog views
"""

from datetime import datetime

from django.db.models import QuerySet
from django.views.generic import DetailView, ListView

from blog.models import Post, Tag

class BlogListView(ListView):
    model = Post
    template_name = 'blog/list.html'
    context_object_name = 'posts'

    def get_queryset(self) -> QuerySet:
        qs = Post.objects.all()

        if not self.request.user.is_superuser:
            now = datetime.now()
            qs = qs.filter(published__lte=now)

        return qs


class BlogDetailView(DetailView):
    model = Post
    template_name = 'blog/detail.html'
    context_object_name = 'post'


class BlogTagsView(BlogListView):
    template_name = 'blog/tags.html'

    def get_queryset(self) -> QuerySet:
        qs = super().get_queryset()

        if 'tag' in self.kwargs:
            return qs.filter(tags__name=self.kwargs['tag'])

        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        tag_count = {tag: 0 for tag in Tag.objects.all()}

        for post in Post.objects.all():
            for tag in post.tags.all():
                tag_count[tag] = tag_count[tag] + 1

        context['active'] = self.kwargs['tag'] if 'tag' in self.kwargs else None
        context['tags'] = sorted(((tag, count) for tag, count in tag_count.items()), key=lambda x: x[1], reverse=True)

        return context
