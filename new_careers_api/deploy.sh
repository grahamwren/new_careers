#!/bin/bash

export MIX_ENV=prod
export PORT=4798
export NODEBIN=`pwd`/assets/node_modules/.bin
export PATH="$PATH:$NODEBIN"

echo "Building..."

mkdir -p ~/.config
mkdir -p priv/static

mix deps.get
mix compile
mix phx.digest

echo "Generating release..."
mix release

echo "Migrating database..."
mix ecto.migrate

#echo "Stopping old copy of app, if any..."
#_build/prod/rel/draw/bin/practice stop || true

echo "Starting app..."

_build/prod/rel/new_careers_api/bin/new_careers_api foreground

