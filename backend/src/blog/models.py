from django.contrib.auth import get_user_model
from django.db import models
from django.utils.text import slugify


class Image(models.Model):
    path = models.CharField(max_length=2048)
    title = models.CharField(max_length=512)

    def __str__(self):
        return "{} ({})".format(self.path, self.title)


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
    illustration = models.CharField(max_length=2048, blank=True, null=True)
    slug = models.SlugField(max_length=256, null=True)

    class Meta:
        ordering = ('-published',)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    def __str__(self):
        return '{}'.format(self.title)
