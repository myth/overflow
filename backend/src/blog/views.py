from rest_framework import viewsets

from blog.models import Post, Tag
from blog.serializers import PostSerializer, TagSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read only list and detail view of Blog Posts
    """

    queryset = Post.objects.all()
    serializer_class = PostSerializer


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read only list and detail view of Tags
    """

    queryset = Tag.objects.all()
    serializer_class = TagSerializer
