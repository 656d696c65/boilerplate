#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="workflows/build/compose.yml"

docker compose --file="$COMPOSE_FILE" build "$@"
