from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.


class Tag(models.Model):
    name = models.CharField(max_length=256)


class Post(models.Model):
    title = models.CharField(max_length=256)
    description = models.CharField(max_length=1024)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    published = models.DateTimeField()
    edited = models.DateTimeField(auto_now=True)
    content = models.TextField()
    tags = models.ManyToManyField(Tag)
