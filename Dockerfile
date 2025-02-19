ARG NODE_VERSION=23

FROM node:${NODE_VERSION}-slim AS node-dev

# INSTALL dependencies
RUN apt-get update -qq && \
    apt-get install -qq -y \
        openssh-client && \
    apt-get clean && \
    apt-get autoclean

# Add pnpm

# Docs development
FROM node-dev AS node-docs

WORKDIR /app

CMD  pnpm run docs:dev --port 5000

