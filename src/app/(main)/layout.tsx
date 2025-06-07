'use client';

import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { Bookmark, LogOut, Settings, UserRound } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';

type DashboardLayoutProps = PropsWithChildren;

export default function MainLayout({ children }: DashboardLayoutProps) {
  const { user, isAuthenticated, onSignOut } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    [
      {
        title: 'All Bookmarks',
        icon: Bookmark,
        onClick: () => router.push('/'),
        isActive: pathname === '/',
      },
      {
        title: 'Settings',
        icon: Settings,
        onClick: () => router.push('/settings'),
        isActive: pathname === '/settings',
      },
    ],
  ];

  if (!isAuthenticated) return null;

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <UserRound className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{user?.name}</span>
                  <span className="text-xs">{user?.email}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {menuItems.map((group, index) => (
            <SidebarGroup key={index}>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton onClick={item.onClick} isActive={item.isActive}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onSignOut}>
                <LogOut className="size-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Mork</h1>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
