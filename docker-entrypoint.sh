#!/bin/bash

# Migrate database
python3 manage.py migrate --no-input

# Start nginx
service nginx start

# Start the application socket
exec uvicorn --port 8080 overflow.asgi:application
