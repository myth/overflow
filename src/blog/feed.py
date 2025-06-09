from __future__ import annotations

from datetime import datetime
from mimetypes import guess_type
from pathlib import Path
from typing import TYPE_CHECKING
from urllib.parse import urljoin
from zoneinfo import ZoneInfo

if TYPE_CHECKING:
    from collections.abc import Iterable, Sequence

from django.conf import settings
from django.contrib.syndication.views import Feed
from django.urls import reverse_lazy
from django.utils.feedgenerator import Atom1Feed

from .models import Post


class BaseBlogFeed(Feed):
    title = "Overflow Blog - Latest posts"
    author_name = "Aleksander S."
    author_link = reverse_lazy("about:index")

    def items(self) -> Iterable[Post]:
        tz = ZoneInfo(settings.TIME_ZONE)
        now = datetime.now(tz=tz)

        return Post.objects.filter(published__lte=now).order_by("-published")[: settings.BLOG_FEED_MAX_ITEMS]

    def item_title(self, item: Post) -> str:
        return item.title

    def item_description(self, item: Post) -> str:
        return item.description

    def item_author_name(self, item: Post) -> str:  # noqa
        return self.author_name

    def item_link(self, item: Post) -> str:
        return item.get_absolute_url()

    def item_pubdate(self, item: Post) -> datetime:
        return item.published

    def item_updated(self, item: Post) -> datetime:
        return item.edited

    def item_categories(self, item: Post) -> Sequence[str]:
        return [tag.name for tag in item.tags.all()]


class BlogRSSFeed(BaseBlogFeed):
    link = "/rss/"
    description = "Latest posts from overflow.no"


class BlogAtomFeed(BaseBlogFeed):
    feed_type = Atom1Feed
    link = "/atom/"
    subtitle = "Latest posts from overflow.no"

    def item_enclosure_url(self, item: Post) -> str | None:
        if item.image:
            return urljoin(settings.BLOG_FEED_BASE_URL, item.image.file.url)

        return None

    def item_enclosure_length(self, item: Post) -> int | None:
        if item.image and item.image.file.path:
            try:
                return Path(item.image.file.path).stat().st_size
            except FileNotFoundError:
                return None

        return None

    def item_enclosure_mime_type(self, item: Post) -> str | None:
        if item.image and item.image.file.path:
            mime, _ = guess_type(item.image.file.path)
            return mime or "application/octet-stream"

        return None
