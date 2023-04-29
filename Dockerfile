# Runtime container
FROM python:3.10-slim

WORKDIR /app
ADD poetry.lock pyproject.toml ./
RUN apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get install -y nginx && \
    pip3 install --no-cache-dir poetry && \
    poetry config virtualenvs.create false && \
    poetry install && \
    apt-get autoremove -y && \
    rm -rf /usr/lib/python*/ensurepip && \
    rm -rf /usr/lib/python*/turtledemo && \
    rm -rf /usr/lib/python*/idlelib && \
    rm -f /usr/lib/python*/turtle.py && \
    rm -f /usr/lib/python*/webbrowser.py && \
    rm -f /usr/lib/python*/doctest.py && \
    rm -f /usr/lib/python*/pydoc.py && \
    rm -rf /root/.cache /var/cache && \
    groupadd -r nginx && \
    useradd -r -g nginx nginx && \
    mkdir -p /var/www/html /run/nginx

COPY nginx.conf /etc/nginx/sites-enabled/default
COPY docker-entrypoint.sh /usr/local/bin/
COPY src/ .

# Ensure flushing of stdout
ENV PYTHONUNBUFFERED=1
# Collect static files for nginx to serve
ENV OF_STATIC_ROOT /static
RUN python3 manage.py collectstatic --no-input && mv /static /var/www/html/ && \
    # Set correct ownership
    chown -R nginx:nginx /var/www/html && chown -R nginx:nginx /run/nginx

# Build metadata
ARG build_date=unknown
ARG git_branch=master
ARG git_tag=unknown
ARG git_sha=unknown
ENV OF_BUILD_DATE=${build_date}
ENV OF_GIT_COMMIT=${git_sha}
ENV OF_GIT_BRANCH=${git_branch}
ENV OF_GIT_RELEASE=${git_tag}

EXPOSE 80
ENTRYPOINT [ "docker-entrypoint.sh" ]
