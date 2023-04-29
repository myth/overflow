#!/bin/bash

# Migrate database
python3 manage.py migrate --no-input

# Start the application socket
uvicorn -p 8080 overflow.asgi:application

# Start nginx
nginx
