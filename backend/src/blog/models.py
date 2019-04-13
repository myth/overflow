from django.contrib.auth import get_user_model
from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=256)

    def __str__(self):
        return '{}'.format(self.name)


class Post(models.Model):
    title = models.CharField(max_length=256)
    description = models.CharField(max_length=1024)
    author = models.ForeignKey(get_user_model(), blank=True, null=True, on_delete=models.SET_NULL)
    published = models.DateTimeField()
    edited = models.DateTimeField(auto_now=True)
    content = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return '{}'.format(self.title)
