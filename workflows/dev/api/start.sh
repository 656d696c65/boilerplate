#!/bin/bash
# ==============================================================================
# Start API Server
# ==============================================================================
# Starts the API development server with hot reload
# ==============================================================================
set -e

echo "Starting API dev server..."
cd /workspace/packages/api
exec npx tsx watch ./src/index.ts
