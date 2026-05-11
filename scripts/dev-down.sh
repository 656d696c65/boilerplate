#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="./.workflows/dev/compose.yml"
PROJECT="boilerplate-application"

docker ps -a --filter="name=boilerplate-" -q | xargs -r docker rm -f
docker compose \
    --project-directory=".workflows/dev" \
    --file="$COMPOSE_FILE" \
    --project-name="$PROJECT" \
    down
