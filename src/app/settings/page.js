'use client';

import Settings from '@/components/Settings';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';

export default function SettingsPage() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return <Loader message="Loading..." />;
  }

  return <Settings />;
}


