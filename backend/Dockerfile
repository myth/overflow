FROM alpine:latest

WORKDIR /app

ADD requirements.txt requirements-dev.txt ./
RUN apk add --update --no-cache \
    python3 \
    uwsgi \
    uwsgi-python3 \
    postgresql-libs && \
    apk add --virtual .build-deps python3-dev gcc musl-dev postgresql-dev && \
    pip3 install --no-cache-dir --upgrade pip && \
    pip3 install --no-cache-dir -r requirements.txt && \
    apk --purge del .build-deps && \
    find / -type d -name __pycache__ -exec rm -r {} + && \
    rm -rf /usr/lib/python*/ensurepip && \
    rm -rf /usr/lib/python*/turtledemo && \
    rm -rf /usr/lib/python*/idlelib && \
    rm -f /usr/lib/python*/turtle.py && \
    rm -f /usr/lib/python*/webbrowser.py && \
    rm -f /usr/lib/python*/doctest.py && \
    rm -f /usr/lib/python*/pydoc.py && \
    rm -rf /root/.cache /var/cache

COPY docker-entrypoint.sh /usr/local/bin/
COPY src/ ./

# Collect static files for the frontend container to serve
RUN python3 manage.py collectstatic --no-input

# Set correct ownership
RUN chown -R uwsgi:uwsgi .

EXPOSE 13571
ENTRYPOINT [ "docker-entrypoint.sh" ]
