# ==============================================================================
# API Production Dockerfile
# ==============================================================================
# Multi-stage build: install deps, then run with tsx (no TypeScript compilation)
# ==============================================================================

FROM node:22-alpine AS base
RUN npm i -g pnpm@latest

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install stage - install dependencies
FROM base AS install
WORKDIR /root
COPY . .

RUN CI=true pnpm install --no-frozen-lockfile

# Deploy stage
FROM base AS deploy

ARG VERSION=0.0.0-unknown
ENV VERSION=$VERSION

WORKDIR /root

# Copy workspace structure with node_modules (includes workspace symlinks)
COPY --from=install /root/node_modules ./node_modules
COPY --from=install /root/package.json ./package.json
COPY --from=install /root/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Copy API package with its source and resolved dependencies
COPY --from=install /root/packages/api/node_modules ./packages/api/node_modules
COPY --from=install /root/packages/api/package.json ./packages/api/package.json
COPY packages/api/src ./packages/api/src

# Copy metadata package source (exported as .ts, resolved at runtime by tsx)
COPY --from=install /root/packages/metadata/node_modules ./packages/metadata/node_modules
COPY --from=install /root/packages/metadata/package.json ./packages/metadata/package.json
COPY packages/metadata/src ./packages/metadata/src

WORKDIR /root/packages/api
CMD ["pnpm", "start"]
