# See https://turbo.build/repo/docs/handbook/deploying-with-docker
# and https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/web/Dockerfile

FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies for node-gyp
# See https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#node-gyp-alpine
FROM base AS builder
RUN apk add --no-cache libc6-compat python3 make g++
RUN apk update

# Set the working directory inside the container
WORKDIR /app
RUN pnpm install turbo@1.13.2 --global
COPY . .
RUN turbo prune indexer --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat python3 make g++
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/config-packages ./config-packages
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm indexer:build

FROM base AS runner
WORKDIR /app

COPY --from=installer /app/services/indexer/package.json .
COPY --from=installer /app .

WORKDIR /app/services/indexer
CMD pnpm squid-typeorm-migration apply && node lib/processors/development/main.js & pnpm squid-graphql-server

