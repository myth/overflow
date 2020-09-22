"""
Site wide context processors
"""

from typing import Any, Dict

from django.http import HttpRequest

from overflow.settings import BUILD_DATE, GIT_BRANCH, GIT_REVISION


def build_metadata(request: HttpRequest) -> Dict[str, Any]:
    """
    Context processor that injects build environment information to the request.
    """

    return {
        'build_date': BUILD_DATE,
        'git_revision': GIT_REVISION,
        'git_branch': GIT_BRANCH,
    }