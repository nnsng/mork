import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import type { PropsWithChildren } from 'react';
import { AppSidebarContent } from './sidebar-content';
import { AppSidebarFooter } from './sidebar-footer';
import { AppSidebarHeader } from './sidebar-header';
import { AppSidebarInset } from './sidebar-inset';

type AppSidebarProps = PropsWithChildren;

export function AppSidebar({ children }: AppSidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <AppSidebarHeader />
        <AppSidebarContent />
        <AppSidebarFooter />
      </Sidebar>
      <AppSidebarInset>{children}</AppSidebarInset>
    </SidebarProvider>
  );
}
