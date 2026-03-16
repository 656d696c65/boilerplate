# ==============================================================================
# API Service Dockerfile
# ==============================================================================
# Minimal Node.js container for running the API service.
# The application source is bind-mounted from the host at runtime.
# Dependencies are installed inside the container on startup (entrypoint.sh).
# ==============================================================================

ARG NODE_VERSION="22.16.0"
ARG PNPM_VERSION="10.12.1"

FROM node:${NODE_VERSION}-bullseye-slim

ARG PNPM_VERSION

# Install PNPM (needed for workspace scripts like migrate/seed)
RUN npm install -g "pnpm@${PNPM_VERSION}"

# Set working directory (application is bind-mounted here)
WORKDIR /workspace

# Start via entrypoint script (bind-mounted at runtime via /dev-scripts)
ENTRYPOINT ["/bin/bash", "/dev-scripts/packages/api/entrypoint.sh"]
