#!/bin/bash

export MIX_ENV=prod
export PORT=4798

echo "Stopping old copy of app, if any..."

_build/prod/rel/new_careers_api/bin/new_careers_api stop || true

echo "Starting app..."

# Start to run in background from shell.
#_build/prod/rel/memory/bin/memory start

# Foreground for testing and for systemd
_build/prod/rel/new_careers_api/bin/new_careers_api foreground


