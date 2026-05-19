"""Git utilities"""

import subprocess
from logging import getLogger

LOG = getLogger(__name__)


def _run_git(*args: str) -> str:
    result = subprocess.run(
        ["git", *args],
        capture_output=True,
        text=True,
        check=True,
    )
    return result.stdout.strip()


def git_describe() -> str:
    """Attempt to get the current output of 'git describe', otherwise returning unknown revision."""
    try:
        version = _run_git("describe", "--long", "--always")
    except Exception as e:
        LOG.error(f"Could not get git information: {e}")
        version = "unknown git revision"

    return version


def git_branch() -> str:
    """Attempt to get the current branch, otherwise returning unknown branch."""
    try:
        branch = _run_git("rev-parse", "--abbrev-ref", "HEAD")
    except Exception as e:
        LOG.error(f"Could not get git information: {e}")
        branch = "unknown branch"

    return branch


def git_commit() -> str:
    """Attempt to get the current commit, otherwise returning unknown commit."""
    try:
        commit = _run_git("rev-parse", "HEAD")
    except Exception as e:
        LOG.error(f"Could not get git information: {e}")
        commit = "unknown commit"

    return commit
