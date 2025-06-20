# Runtime container
FROM python:3.12-slim

WORKDIR /app
ADD uv.lock pyproject.toml ./
RUN apt-get update && \
    apt-get dist-upgrade -y && \
    apt-get install -y nginx && \
    pip3 install --no-cache-dir uv && \
    uv sync --no-dev --locked && \
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
COPY build_metadata /app/build_metadata
COPY src/ .

# Ensure flushing of stdout
ENV PYTHONUNBUFFERED=1
# Collect static files for nginx to serve
ENV OF_STATIC_ROOT="/static"
RUN uv run --no-sync python3 manage.py collectstatic --no-input && mv /static /var/www/html/ && \
    # Set correct ownership
    chown -R nginx:nginx /var/www/html && chown -R nginx:nginx /run/nginx

EXPOSE 80
ENTRYPOINT [ "docker-entrypoint.sh" ]
