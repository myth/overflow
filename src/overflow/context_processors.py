"""Site wide context processors"""

from typing import TYPE_CHECKING, Any

from django.conf import settings

from overflow.settings import BUILD_DATE, GIT_BRANCH, GIT_COMMIT, GIT_RELEASE

if TYPE_CHECKING:
    from django.http import HttpRequest


def build_metadata(request: HttpRequest) -> dict[str, Any]:
    """Context processor that injects build environment information to the request."""
    return {
        "production": settings.PRODUCTION,
        "build_date": BUILD_DATE,
        "git_revision": GIT_RELEASE,
        "git_branch": GIT_BRANCH,
        "git_commit": GIT_COMMIT,
    }
