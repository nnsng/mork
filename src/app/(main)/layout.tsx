import {
  AppSidebarContent,
  AppSidebarFooter,
  AppSidebarHeader,
  AppSidebarInset,
} from '@/components/sidebar';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { getUser } from '@/data-access/auth';
import { redirect } from 'next/navigation';
import { type PropsWithChildren } from 'react';

type MainLayoutProps = PropsWithChildren;

export default async function MainLayout({ children }: MainLayoutProps) {
  const user = await getUser();

  if (!user) {
    return redirect('/sign-in');
  }

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
