'use client';

import { useEffect } from 'react';

export function PWALifeCycle() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;
      wb.addEventListener('waiting', () => {
        if (confirm('A newer app version is available, reload to update?')) {
          wb.messageSkipWaiting();
          wb.addEventListener('controlling', () => {
            window.location.reload();
          });
        }
      });
      wb.register();
    }
  });
  return null;
}
