"""
Keyboard views
"""

from django.views.generic.base import TemplateView


class KeyboardIndexView(TemplateView):
    template_name = "keyboard/index.html"
