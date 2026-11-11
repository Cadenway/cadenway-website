# syntax=docker/dockerfile:1

# Node 24 on Alpine, pinned by tag and digest; Renovate updates both together.
FROM node:24.22.3-alpine3.24@sha256:98e4e60b35fd50143e1838da2957488c25aa3a3efbd48bb679923f77d6d3d873 AS build
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV NG_CLI_ANALYTICS=false
WORKDIR /app
# Corepack installs the pnpm version named by `packageManager` in package.json.
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts --store-dir /pnpm/store
COPY angular.json tsconfig.json tsconfig.app.json .postcssrc.json ./
COPY public ./public
COPY scripts ./scripts
COPY src ./src
# Public address of the site, written into sitemap.xml and robots.txt.
ARG SITE_URL
RUN SITE_URL="${SITE_URL}" pnpm build

# Static files behind an unprivileged nginx (uid 101, port 8080).
FROM nginxinc/nginx-unprivileged:1.30.6-alpine3.24@sha256:f5116ed4606f3eb015dd4a8e28cb9b351476dc0ad4bc6e9f93b19cec130cdf03 AS runtime
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/waypoint-website/browser /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/health/ready || exit 1
