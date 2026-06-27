'use client';

import { Toaster } from 'react-hot-toast';

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          fontFamily: 'var(--font-lato)',
        },
        success: {
          style: {
            background: 'var(--success-100)',
            color: 'var(--success-600)',
          },
        },
        error: {
          style: {
            background: 'var(--danger-100)',
            color: 'var(--danger-600)',
          },
        },
      }}
    />
  );
}
