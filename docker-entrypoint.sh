#!/bin/sh

# Give PostgreSQL a few extra seconds to get ready
sleep 6

# Migrate database
python3 manage.py migrate --no-input

# Start nginx
nginx

# Source the build environment file if we have it
. ./build_metadata || true

# Start the application socket
daphne -p 8080 overflow.asgi:application
