from rest_framework import serializers

from blog.models import Post, Tag
from user.serializers import UserSerializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name')


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Post
        fields = (
            'title',
            'author',
            'published',
            'edited',
            'description',
            'content',
            'tags',
            'illustration'
        )
