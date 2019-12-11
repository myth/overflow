# Frontend build container
FROM node:lts-alpine as frontend-builder

WORKDIR /app

RUN apk add --no-cache --virtual .gyp python git make gcc g++

COPY package.json tsconfig.json webpack.config.js yarn.lock ./
RUN yarn install --ignore-optional

COPY src/ src/
RUN yarn build && apk del .gyp


# Runtime container
FROM alpine:latest as runner

WORKDIR /app

ADD requirements.txt requirements-dev.txt ./
RUN apk add --update --no-cache \
    python3 \
    uwsgi \
    uwsgi-python3 \
    postgresql-libs && \
    apk add --virtual .build-deps python3-dev gcc build-base \
                                  linux-headers zlib-dev musl-dev libffi-dev \
                                  jpeg-dev postgresql-dev && \
    apk add --no-cache libjpeg nginx && \
    pip3 install --no-cache-dir --upgrade pip && \
    pip3 install --no-cache-dir -r requirements-dev.txt && \
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


RUN mkdir -p /var/www/html/media /run/nginx
COPY --from=frontend-builder /app/src/overflow/static/ /app/src/overflow/static
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /usr/local/bin/
COPY src/ ./

# Collect static files for the frontend container to serve
RUN python3 manage.py collectstatic --no-input && mv /static /var/www/html/

# Set correct ownership
RUN chown -R nginx:nginx /var/www/html && chown -R nginx:nginx /run/nginx

EXPOSE 80
ENTRYPOINT [ "docker-entrypoint.sh" ]
