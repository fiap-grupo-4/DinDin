FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune transactions --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=builder /app/out/full/ .
RUN pnpm turbo build --filter=transactions

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

COPY --from=installer /app/apps/transactions/.next/standalone ./
COPY --from=installer /app/apps/transactions/.next/static ./apps/transactions/.next/static

EXPOSE 3001
CMD ["node", "apps/transactions/server.js"]