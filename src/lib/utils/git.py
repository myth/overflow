"""
Git utilities
"""

from logging import getLogger
from os import popen


LOG = getLogger(__name__)


def git_describe() -> str:
    """
    Attempt to get the current output of 'git describe', otherwise returning unknown revision.
    """

    try:
        version = popen('git describe').read().strip()
    except Exception as e:
        LOG.error(f'Could not get git information: {e}')
        version = 'unknown git revision'

    return version


def git_branch() -> str:
    """
    Attempt to get the current branch, otherwise returning unknown branch.
    """

    try:
        branch = popen('git branch --show-current').read().strip()
    except Exception as e:
        LOG.error(f'Could not get git information: {e}')
        branch = 'unknown branch'

    return branch
