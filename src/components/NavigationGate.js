'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/Navigation';

const HIDE_ON = new Set([
  '/request-question',
]);

export function NavigationGate() {
  const pathname = usePathname();

  if (HIDE_ON.has(pathname)) {
    return null;
  }

  return <Navigation />;
}
