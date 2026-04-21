# ==============================================================================
# Worker Production Dockerfile
# ==============================================================================
# Multi-stage build: install deps, compile worker, run built JS output.
# ==============================================================================

FROM node:22-alpine AS base
RUN npm i -g pnpm@latest

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build stage
FROM base AS build
WORKDIR /root
COPY . .
RUN CI=true pnpm install --no-frozen-lockfile
RUN pnpm --filter @boilerplate/worker build

# Deploy stage
FROM base AS deploy

ARG VERSION=0.0.0-unknown
ENV VERSION=$VERSION

WORKDIR /root

COPY --from=build /root/node_modules ./node_modules
COPY --from=build /root/package.json ./package.json
COPY --from=build /root/pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY --from=build /root/packages/worker/package.json ./packages/worker/package.json
COPY --from=build /root/packages/worker/build ./packages/worker/build

WORKDIR /root/packages/worker
CMD ["pnpm", "start"]
