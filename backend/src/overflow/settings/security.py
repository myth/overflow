from decouple import config

# (security.W018) You should not have DEBUG set to True in deployment.
PRODUCTION = config('OF_PRODUCTION', default=False, cast=bool)
DEBUG = not PRODUCTION
SECURITY_HARDENING = config('OF_SECURE', default=False, cast=bool)

SECRET_KEY = config('OF_SECRET_KEY', default='replaceme')
DB_PASS = config('POSTGRES_PASSWORD', default='replaceme')

# (security.W020) ALLOWED_HOSTS must not be empty in deployment.
if PRODUCTION:
    ALLOWED_HOSTS = ['overflow.no']
else:
    ALLOWED_HOSTS = ['*']
    CORS_ORIGIN_ALLOW_ALL = True


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
]

# Security
# Options that should only be defined when secure mode is enabled

if SECURITY_HARDENING:
    # Only turn on HSTS if all services on same host will support TLS
    SECURE_ENABLE_HSTS = config('OF_SECURE_ENABLE_HSTS', default=False, cast=bool)
    if SECURE_ENABLE_HSTS:
        # (security.W004) If your entire site is served only over TLS,
        # you may want to consider setting a value and enabling HTTP Strict Transport Security.
        # Be sure to read the documentation first;
        # enabling HSTS carelessly can cause serious, irreversible problems.
        SECURE_HSTS_SECONDS = config('OF_SECURE_HSTS_SECONDS', default=3.154e+7, cast=int)

        # Without this, your site is potentially vulnerable to attack via an insecure connection to a subdomain.
        # Only set this to True if you are certain that all subdomains of your domain should be served
        # exclusively via TLS.
        SECURE_HSTS_INCLUDE_SUBDOMAINS = config('OF_SECURE_HSTS_INCLUDE_SUBDOMAINS', default=True, cast=bool)

        # Without this, your site cannot be submitted to the browser preload list.
        SECURE_HSTS_PRELOAD = config('OF_SECURE_HSTS_PRELOAD', default=True, cast=bool)

    # (security.W006) If not set to True, pages will not be served with an
    # 'x-content-type-options: nosniff' header.
    # Consider enabling this header to prevent the browser from identifying content types incorrectly.
    SECURE_CONTENT_TYPE_NOSNIFF = config('OF_SECURE_CONTENT_TYPE_NOSNIFF', default=True, cast=bool)

    # (security.W007) If not set to True, pages will not be served with an
    # 'x-xss-protection: 1; mode=block' header.
    # Consider enabling this header to activate the browser's XSS filtering and help prevent XSS attacks.
    SECURE_BROWSER_XSS_FILTER = config('OF_SECURE_BROWSER_XSS_FILTER', default=True, cast=bool)

    # (security.W008) Automatically return a 301 to the https:// version of the site
    SECURE_SSL_REDIRECT = config('OF_SECURE_SSL_REDIRECT', default=True, cast=bool)

    # (security.W012) Using a secure-only session cookie makes it more difficult for network traffic
    # sniffers to hijack user sessions.
    SESSION_COOKIE_SECURE = config('OF_SESSION_COOKIE_SECURE', default=True, cast=bool)

    # (security.W016) Using a secure-only CSRF cookie makes it more difficult for network traffic
    # sniffers to steal the CSRF token.
    CSRF_COOKIE_SECURE = config('OF_CSRF_COOKIE_SECURE', default=True, cast=bool)

    # (security.W019) The default for X_FRAME_OPTIONS is 'SAMEORIGIN',
    # but unless there is a good reason for the site
    # to serve other parts of itself in a frame, it should changed to 'DENY'.
    X_FRAME_OPTIONS = config('OF_X_FRAME_OPTIONS', default='DENY')
