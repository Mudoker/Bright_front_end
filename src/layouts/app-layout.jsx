import { AppSidebar } from '@/components/sidebar/component/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';


export const AppLayout = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex h-full">
      <SidebarProvider
        style={{
          '--sidebar-width': '14rem',
          '--sidebar-width-mobile': '20rem',
        }}
        open={open}
        onOpenChange={setOpen}
      >
        <AppSidebar open={open} setOpen={setOpen} />
        <Outlet />
      </SidebarProvider>
    </div>
  );
};
