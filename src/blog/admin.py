"""
Blog admin
"""

from django.contrib.admin import ModelAdmin, site

from blog.models import Image, Post, Tag


class PostAdmin(ModelAdmin):
    """
    Blog post model admin controller
    """

    prepopulated_fields = {"slug": ("title",)}
    exclude = ["author"]

    def save_model(self, request, obj: Post, form, change):
        """
        Save the model to the database.
        Automatically attach user from request.
        """

        if not obj.pk:
            obj.author = request.user

        super().save_model(request, obj, form, change)


site.register(Post, PostAdmin)
site.register(Image)
site.register(Tag)
