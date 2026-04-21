#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="./.workflows/dev/compose.yml"
PROJECT="boilerplate-application"

is_port_busy() {
    local port="$1"
    ss -H -ltn "( sport = :${port} )" | grep -q ":${port}"
}

pick_random_port() {
    local min=20000
    local max=65000
    local port

    while true; do
        port=$((RANDOM % (max - min + 1) + min))
        if ! is_port_busy "$port"; then
            echo "$port"
            return 0
        fi
    done
}

pick_unique_random_port() {
    local used_ports="$1"
    local port

    while true; do
        port="$(pick_random_port)"
        if [[ " ${used_ports} " != *" ${port} "* ]]; then
            echo "$port"
            return 0
        fi
    done
}

used_ports=""
DEV_POSTGRES_PORT="$(pick_unique_random_port "$used_ports")"
used_ports+=" ${DEV_POSTGRES_PORT}"
DEV_API_PORT="$(pick_unique_random_port "$used_ports")"
used_ports+=" ${DEV_API_PORT}"
DEV_WEBSITE_PORT="$(pick_unique_random_port "$used_ports")"

export DEV_POSTGRES_PORT
export DEV_API_PORT
export DEV_WEBSITE_PORT
export DEV_API_URL="http://localhost:${DEV_API_PORT}"
export DEV_WEBSITE_URL="http://localhost:${DEV_WEBSITE_PORT}"
DEV_POSTGRES_URL="postgresql://postgres:admin@localhost:${DEV_POSTGRES_PORT}/default"

docker compose \
    --project-directory="./.workflows/dev" \
    --file="$COMPOSE_FILE" \
    --project-name="$PROJECT" \
    up -d --build --force-recreate

echo "Dev stack is ready."
echo "  PostgreSQL port: ${DEV_POSTGRES_PORT}"
echo "  API port:        ${DEV_API_PORT}"
echo "  Website port:    ${DEV_WEBSITE_PORT}"
echo "  PostgreSQL URL:  ${DEV_POSTGRES_URL}"
echo "  API URL:         ${DEV_API_URL}"
echo "  Website URL:     ${DEV_WEBSITE_URL}"
