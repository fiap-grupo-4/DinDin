import type { NextConfig } from 'next';

const transactionsAppUrl = process.env.TRANSACTIONS_APP_URL;

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/transactions',
        destination: `${transactionsAppUrl}/transactions`,
      },
      {
        source: '/transactions/:path*',
        destination: `${transactionsAppUrl}/transactions/:path*`,
      },
      {
        source: '/transactions-static/:path*',
        destination: `${transactionsAppUrl}/transactions-static/:path*`,
      },
    ];
  },
};

export default nextConfig;
