"""Blog views"""

from datetime import timedelta

from django.conf import settings
from django.contrib import messages
from django.db.models import QuerySet
from django.utils import timezone
from django.views.generic import DetailView, ListView

from blog.models import Post


class BlogListView(ListView):
    model = Post
    template_name = "blog/list.html"
    context_object_name = "posts"

    def get_queryset(self) -> QuerySet:
        qs = Post.objects.all()

        if not self.request.user.is_superuser:
            now = timezone.now()
            qs = qs.filter(published__lte=now)

        return qs


class BlogDetailView(DetailView):
    model = Post
    template_name = "blog/detail.html"
    context_object_name = "post"

    def get_object(self, queryset=None):
        obj = super().get_object()

        age = timezone.now() - obj.published

        if age > timedelta(days=settings.BLOG_OUTDATED_POST_THRESHOLD):
            messages.warning(self.request, f"This post is {age.days} days old and may contain outdated information.")

        return obj


class BlogTagsView(BlogListView):
    template_name = "blog/tags.html"
    allow_empty = False

    def get_queryset(self) -> QuerySet:
        qs = super().get_queryset()

        if "tag" in self.kwargs:
            return qs.filter(tags__name=self.kwargs["tag"])

        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        tag_count = {}

        for post in Post.objects.prefetch_related("tags"):
            for tag in post.tags.all():
                tag_count[tag] = tag_count.get(tag, 0) + 1

        context["active"] = self.kwargs.get("tag", "anything")
        context["tags"] = sorted(((tag, count) for tag, count in tag_count.items()), key=lambda x: x[1], reverse=True)

        return context
