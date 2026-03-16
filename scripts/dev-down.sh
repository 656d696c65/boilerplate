#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE=".development/compose.yml"
PROJECT="boilerplate-application"

docker ps -a --filter="name=boilerplate-" -q | xargs -r docker rm -f
docker compose \
    --project-directory=".development" \
    --file="$COMPOSE_FILE" \
    --project-name="$PROJECT" \
    down
