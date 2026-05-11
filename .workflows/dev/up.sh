#!/usr/bin/env bash
# ==============================================================================
# dev-up helper — called by `just dev up`
# Starts all Docker Compose services with random host ports bound to 127.0.0.1.
# Ports persist across runs in .ports; conflicted ports are replaced on next run.
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="$SCRIPT_DIR/compose.yml"
PORTS_FILE="$SCRIPT_DIR/.ports"

DC=(docker compose --project-directory="$SCRIPT_DIR" --file="$COMPOSE_FILE" --project-name=boilerplate-application)

_random_port() {
    python3 -c "import random; print(random.randint(10000, 65535))"
}

_is_port_in_use() {
    local port=$1
    ss -tln "sport = :$port" 2>/dev/null | grep -q LISTEN
}

_is_valid_five_digit_port() {
    local port=$1
    [[ "$port" =~ ^[1-9][0-9]{4}$ ]] && (( port <= 65535 ))
}

"${DC[@]}" down --remove-orphans 2>/dev/null || true

# Clean up stale dev containers that may have been created under another
# compose project name while still using the same explicit container_name.
for container_name in boilerplate-postgres boilerplate-api boilerplate-website boilerplate-worker; do
    docker rm -f "$container_name" >/dev/null 2>&1 || true
done

# Load persisted ports if available.
declare -A saved=()
if [[ -f "$PORTS_FILE" ]]; then
    while IFS='=' read -r key val; do
        [[ -n "$key" ]] && saved["$key"]="$val"
    done < "$PORTS_FILE"
fi

declare -A used=()

_allocate_port_for_key() {
    local key=$1
    local candidate="${saved[$key]:-}"

    if [[ -n "$candidate" ]] && _is_valid_five_digit_port "$candidate" && ! _is_port_in_use "$candidate" && [[ -z "${used[$candidate]:-}" ]]; then
        used["$candidate"]=1
        echo "$candidate"
        return
    fi

    while true; do
        candidate="$(_random_port)"
        if _is_valid_five_digit_port "$candidate" && ! _is_port_in_use "$candidate" && [[ -z "${used[$candidate]:-}" ]]; then
            used["$candidate"]=1
            echo "$candidate"
            return
        fi
    done
}

postgres_host_port=$(_allocate_port_for_key POSTGRES_HOST_PORT)
api_host_port=$(_allocate_port_for_key API_HOST_PORT)
website_host_port=$(_allocate_port_for_key WEBSITE_HOST_PORT)

cat > "$PORTS_FILE" <<EOF
POSTGRES_HOST_PORT=$postgres_host_port
API_HOST_PORT=$api_host_port
WEBSITE_HOST_PORT=$website_host_port
EOF

POSTGRES_HOST_PORT="$postgres_host_port" \
API_HOST_PORT="$api_host_port" \
WEBSITE_HOST_PORT="$website_host_port" \
    "${DC[@]}" up --detach --build --force-recreate

echo ""
echo "=============================================="
echo "  Boilerplate Development Environment"
echo "=============================================="
echo ""
echo "  Services:"
echo "    Website:    http://localhost:$website_host_port"
echo "    API:        http://localhost:$api_host_port"
echo ""
echo "  Infrastructure:"
echo "    PostgreSQL: postgres://postgres:admin@localhost:$postgres_host_port/default"
echo ""
