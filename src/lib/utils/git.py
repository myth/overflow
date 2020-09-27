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
        version = popen('git describe --long --always 2>/dev/null').read().strip()
    except Exception as e:
        LOG.error(f'Could not get git information: {e}')
        version = 'unknown git revision'

    return version


def git_branch() -> str:
    """
    Attempt to get the current branch, otherwise returning unknown branch.
    """

    try:
        branch = popen('git rev-parse --abbrev-ref HEAD 2>/dev/null').read().strip()
    except Exception as e:
        LOG.error(f'Could not get git information: {e}')
        branch = 'unknown branch'

    return branch


def git_commit() -> str:
    """
    Attempt to get the current commit, otherwise returning unknown commit.
    """

    try:
        commit = popen('git rev-parse HEAD 2>/dev/null').read().strip()
    except Exception as e:
        LOG.error(f'Could not get git information: {e}')
        commit = 'unknown commit'

    return commit