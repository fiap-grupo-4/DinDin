This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Running Storybook

This project uses storybook for component's documentation, to run it local use this command:

```bash
npm run storybook
```

## Config json-server

To simulate api requests this project uses json-server. You must run it for local development by using this command:

```bash
npm run server
```

## Architectural Patterns

```bash
src/
├── app/                        # routes and layouts (Next.js)
│   ├── (auth)/
│   ├── (dashboard)/
│   │   └── transactions/
│   └── layout.tsx
├── components/
│   ├── ui/                     # primitives components (button, input, badge)
│   └── features/               # domain components (TransactionCard, etc)
├── lib/
│   ├── constants/              # enum, global constants
│   └── utils/
├── services/                   # calls to API
├── types/                      # global types
└── hooks/                      # custom hooks client-side
```
