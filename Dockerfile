# Runtime container
FROM python:3.8.5-slim

WORKDIR /app

ADD requirements.txt requirements-dev.txt pyproject.toml ./
RUN apt-get update && \
    apt-get install -y build-essential nginx && \
    pip3 install --no-cache-dir --upgrade pip wheel && \
    pip3 install --no-cache-dir -r requirements-dev.txt && \
    apt-get purge -y build-essential && \
    apt-get autoremove -y && \
    find / -type d -name __pycache__ -exec rm -r {} + && \
    rm -rf /usr/lib/python*/ensurepip && \
    rm -rf /usr/lib/python*/turtledemo && \
    rm -rf /usr/lib/python*/idlelib && \
    rm -f /usr/lib/python*/turtle.py && \
    rm -f /usr/lib/python*/webbrowser.py && \
    rm -f /usr/lib/python*/doctest.py && \
    rm -f /usr/lib/python*/pydoc.py && \
    rm -rf /root/.cache /var/cache

RUN groupadd -r nginx && \
    useradd -r -g nginx nginx && \
    mkdir -p /var/www/html /run/nginx
COPY nginx.conf /etc/nginx/sites-enabled/default
COPY docker-entrypoint.sh /usr/local/bin/
COPY build_metadata .
COPY src/ .

# Collect static files for the frontend container to serve
RUN python3 manage.py collectstatic --no-input && mv /static /var/www/html/

# Set correct ownership
RUN chown -R nginx:nginx /var/www/html && chown -R nginx:nginx /run/nginx

EXPOSE 80
ENTRYPOINT [ "docker-entrypoint.sh" ]
