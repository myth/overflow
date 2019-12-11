"""
Blog views
"""

from django.db.models import QuerySet
from django.views.generic import DetailView, ListView

from blog.models import Post, Tag

class BlogListView(ListView):
    model = Post
    template_name = 'blog/list.html'
    context_object_name = 'posts'

    def get_queryset(self) -> QuerySet:
        qs = Post.objects.all()

        if 'tag' in self.kwargs:
            return qs.filter(tags__name=self.kwargs['tag'])
        else:
            if 'year' in self.kwargs:
                qs = qs.filter(published__year=self.kwargs['year'])
            if 'month' in self.kwargs:
                qs = qs.filter(published__month=self.kwargs['month'])
            if 'day' in self.kwargs:
                qs = qs.filter(published__day=self.kwargs['day'])

        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['tags'] = Tag.objects.all()

        if 'year' not in self.kwargs and 'tag' not in self.kwargs:
            context['years'] = list(sorted(
                set(p.published.year for p in self.get_queryset()),
                reverse=True
            ))
        elif 'month' not in self.kwargs:
            context['months'] = list(sorted(
                set(p.published.month for p in self.get_queryset()),
                reverse=True
            ))
        else:
            context['days'] = list(sorted(
                set(p.published.day for p in self.get_queryset()),
                reverse=True
            ))

        return context


class BlogDetailView(DetailView):
    model = Post
    template_name = 'blog/detail.html'
    context_object_name = 'post'
