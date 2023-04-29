#!/bin/bash

# Migrate database
python3 manage.py migrate --no-input

# Start nginx
service nginx start

# Source build metadata if we have it
. ./build_metadata || true

# Start the application socket
exec uvicorn --port 8080 overflow.asgi:application
