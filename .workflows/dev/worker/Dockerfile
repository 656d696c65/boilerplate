# ==============================================================================
# Worker Development Dockerfile
# ==============================================================================
# Minimal Node.js container for running the worker in watch mode.
# The application source is bind-mounted from the host at runtime.
# ==============================================================================

ARG NODE_VERSION="22.16.0"
ARG PNPM_VERSION="10.12.1"

FROM node:${NODE_VERSION}-bullseye-slim

ARG PNPM_VERSION

# Install PNPM
RUN npm install -g "pnpm@${PNPM_VERSION}"

# Set working directory (application is bind-mounted here)
WORKDIR /workspace

# Start worker in development mode
CMD ["sh", "-c", "pnpm --filter='./packages/worker' dev"]
