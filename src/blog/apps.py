"""
Blog appconfig
"""

from django.apps import AppConfig


class BlogConfig(AppConfig):
    name: str = 'blog'
    verbose_name: str = 'Blog'
