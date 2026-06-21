FROM node:lts-alpine AS base
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

FROM node:lts-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/transactions/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/transactions/.next/static ./apps/transactions/.next/static

USER nextjs
EXPOSE 3001
CMD ["node", "apps/transactions/server.js"]