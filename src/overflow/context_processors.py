"""Site wide context processors
"""

from typing import Any

from django.conf import settings
from django.http import HttpRequest

from overflow.settings import BUILD_DATE, GIT_BRANCH, GIT_COMMIT, GIT_RELEASE


def build_metadata(request: HttpRequest) -> dict[str, Any]:
    """Context processor that injects build environment information to the request."""
    return {
        "production": settings.PRODUCTION,
        "build_date": BUILD_DATE,
        "git_revision": GIT_RELEASE,
        "git_branch": GIT_BRANCH,
        "git_commit": GIT_COMMIT,
    }
