"""About views"""

from __future__ import annotations

from typing import TYPE_CHECKING

from django.shortcuts import render

if TYPE_CHECKING:
    from django.http import HttpRequest, HttpResponse

SOCIALS = [
    {"name": "GitHub", "url": "https://github.com/myth", "icon": "components.html#icon-github"},
    {
        "name": "LinkedIn",
        "url": "https://www.linkedin.com/in/aleksander-skraastad",
        "icon": "components.html#icon-linkedin",
    },
    {"name": "Bluesky", "url": "https://bsky.app/profile/overflow.no", "icon": "components.html#icon-bluesky"},
]


def index(request: HttpRequest) -> HttpResponse:
    """Renders the about page."""
    return render(request, "about/index.html", {"socials": SOCIALS})
