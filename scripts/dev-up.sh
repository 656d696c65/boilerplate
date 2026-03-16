#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE=".development/compose.yml"
PROJECT="boilerplate-application"

docker compose \
    --project-directory=".development" \
    --file="$COMPOSE_FILE" \
    --project-name="$PROJECT" \
    up -d --build
