"""Base settings module"""

from datetime import datetime
from pathlib import Path
from typing import cast

from decouple import config  # type: ignore

from lib.utils.git import git_branch, git_commit, git_describe
from overflow.settings.security import DB_PASS, DEBUG, PRODUCTION

# Build paths inside the project like this: BASE_DIR / "sub_dir"
BASE_DIR = Path(__file__).parent.parent.parent

# Application definition
INSTALLED_APPS = [
    "about",
    "blog",
    "corsheaders",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "overflow.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "overflow" / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "overflow.context_processors.build_metadata",
            ],
            "debug": DEBUG,
        },
    },
]

# Synchronous WSGI application (used only for runserver)
WSGI_APPLICATION = "overflow.wsgi.application"
# Asynchronous ASGI application with WSGI backwards compatibility
ASGI_APPLICATION = "overflow.asgi.application"


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

if PRODUCTION:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql_psycopg2",
            "NAME": "overflow",
            "USER": "overflow",
            "PASSWORD": DB_PASS,
            "HOST": "db",
        },
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        },
    }


# Cache
# https://docs.djangoproject.com/en/2.1/ref/settings/#caches

if PRODUCTION:
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": "redis://redis:6379/0",
            "OPTIONS": {
                "CLIENT_CLASS": "django_redis.client.DefaultClient",
            },
        },
    }
else:
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "unique-snowflake",
        },
    }


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Europe/Oslo"
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Time and date
DATE_FORMAT: str = "Y-m-d"
DATETIME_FORMAT: str = "Y-m-d H:i"

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = config("OF_STATIC_ROOT", default=None)
STATICFILES_DIRS = [BASE_DIR / "overflow" / "static"]

# Uploaded media
MEDIA_URL = "/media/"
MEDIA_ROOT = config("OF_MEDIA_ROOT", default=BASE_DIR.parent / "media")

# Source information

BUILD_DATE: str = cast(str, config("OF_BUILD_DATE", default=datetime.now().isoformat()))
GIT_COMMIT: str = cast(str, config("OF_GIT_COMMIT", default=git_commit()))
GIT_BRANCH: str = cast(str, config("OF_GIT_BRANCH", default=git_branch()))
GIT_RELEASE: str = cast(str, config("OF_GIT_RELEASE", default=git_describe()))


# Custom configurables
BLOG_OUTDATED_POST_THRESHOLD: int = int(365 * 1.5)
BLOG_FEED_MAX_ITEMS: int = 20
BLOG_FEED_BASE_URL: str = "https://overflow.no" if PRODUCTION else "http://127.0.0.1:8000"
