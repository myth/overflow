"""Blog models
"""

from django.contrib.auth import get_user_model
from django.db import models
from django.utils.text import slugify
from markdown2 import markdown


class Tag(models.Model):
    """Blog tag model"""

    name = models.CharField(max_length=256)

    def __str__(self) -> str:
        """String representation of this tag"""
        return str(self.name)


class Image(models.Model):
    """Blog post image model"""

    file = models.ImageField(upload_to="blog/")
    title = models.CharField(max_length=256)

    def __str__(self) -> str:
        """String representation of this blog post image"""
        return str(self.title)


class Post(models.Model):
    """Blog post model"""

    title = models.CharField(max_length=256)
    description = models.CharField(max_length=1024)
    image = models.ForeignKey(Image, blank=True, null=True, on_delete=models.SET_NULL)
    author = models.ForeignKey(get_user_model(), null=True, on_delete=models.SET_NULL)
    published = models.DateTimeField(auto_created=True)
    edited = models.DateTimeField(auto_now=True)
    content = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True)
    slug = models.SlugField(max_length=256, unique=True)

    def save(self, *args, **kwargs):
        """Saves the changes in this model."""
        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    @property
    def markdown(self) -> str:
        """Returns a markdown rendered version of the content field"""
        return markdown(str(self.content), extras=["fenced-code-blocks", "tables"])

    @property
    def read_time(self) -> int:
        """Returns a rough estimated read time in minutes based on 200 words per minute."""
        return max(1, round(len(self.content.split(" ")) / 200))

    @property
    def updated(self) -> bool:
        """Whether or not an edit has been made more than a day after publishing."""
        return (self.edited.date() - self.published.date()).days > 1

    def __str__(self) -> str:
        """String representation of this blog post"""
        return str(self.title)

    class Meta:
        """Post model metadata"""

        ordering = ("-published",)
