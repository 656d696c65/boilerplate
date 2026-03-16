#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="./workflows/dev/compose.yml"
PROJECT="boilerplate-application"

docker compose \
    --project-directory="./workflows/dev" \
    --file="$COMPOSE_FILE" \
    --project-name="$PROJECT" \
    up -d --build --force-recreate
