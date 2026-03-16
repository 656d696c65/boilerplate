#!/bin/bash
# ==============================================================================
# API Service Entrypoint
# ==============================================================================
# Runs on container startup to initialize and start the API service.
# ==============================================================================
set -e

SCRIPT_DIR="/dev-scripts/application/packages/api"

# Install dependencies (bind-mounted from host, so node_modules persists)
cd /workspace && pnpm install --frozen-lockfile

# Run setup tasks
$SCRIPT_DIR/migrate.sh
$SCRIPT_DIR/seed.sh

# Start the API server (exec replaces shell process)
exec $SCRIPT_DIR/start.sh
