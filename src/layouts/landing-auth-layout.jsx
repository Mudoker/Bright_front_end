import { Toaster } from '@/components/ui/toaster';
import React from 'react';
import { Outlet } from 'react-router-dom';

import DeveloperDock from '../features/dev-dock';

export const LandingAuthLayout = () => {
  return (
    <div className="relative min-h-screen">
      <Outlet />
      <Toaster />
      <div className="fixed bottom-0 left-0 z-50 w-full">
        <DeveloperDock />
      </div>
    </div>
  );
};
