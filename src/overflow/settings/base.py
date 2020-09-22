"""
Base settings module
"""

from datetime import datetime
import os

from decouple import config

from lib.utils.git import git_branch, git_commit, git_describe
from overflow.settings.security import DB_PASS, DEBUG, PRODUCTION

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Application definition
INSTALLED_APPS = [
    'blog',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'overflow.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'overflow/templates')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'overflow.context_processors.build_metadata'
            ],
            'debug': DEBUG
        },
    },
]

# Synchronous WSGI application (used only for runserver)
WSGI_APPLICATION = 'overflow.wsgi.application'
# Asynchronous ASGI application with WSGI backwards compatibility
ASGI_APPLICATION = 'overflow.asgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

if PRODUCTION:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'overflow',
            'USER': 'overflow',
            'PASSWORD': DB_PASS,
            'HOST': 'db',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
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
            }
        }
    }


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'CET'
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = config('OF_STATIC_ROOT', default=os.path.join(BASE_DIR, '..', 'static'))
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'overflow', 'static'),
]

# Uploaded media

MEDIA_URL = '/media/'
MEDIA_ROOT = config('OF_MEDIA_ROOT', default=os.path.join(BASE_DIR, '..', 'media'))

# Source information

BUILD_DATE: str = config('OF_BUILD_DATE', default=datetime.now().isoformat())
GIT_COMMIT: str = config('OF_GIT_COMMIT', default=git_commit())
GIT_BRANCH: str = config('OF_GIT_BRANCH', default=git_branch())
GIT_RELEASE: str = config('OF_GIT_RELEASE', default=git_describe())
