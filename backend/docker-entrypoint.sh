#!/bin/sh

# Give PostgreSQL a few extra seconds to get ready
sleep 6
# Migrate database
python3 manage.py migrate --no-input

# Start the application socket
uwsgi \
    --uwsgi-socket 0.0.0.0:13571 \
    --plugins python3 \
    --uid uwsgi \
    --module overflow.wsgi \
    --master \
    --workers 5
