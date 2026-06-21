FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune dashboard --docker

FROM base AS installer
WORKDIR /app
ARG TRANSACTIONS_APP_URL
ENV TRANSACTIONS_APP_URL=$TRANSACTIONS_APP_URL
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=builder /app/out/full/ .
RUN pnpm turbo build --filter=dashboard

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=installer /app/apps/dashboard/.next/standalone ./
COPY --from=installer /app/apps/dashboard/.next/static ./apps/dashboard/.next/static

EXPOSE 3000
CMD ["node", "apps/dashboard/server.js"]
