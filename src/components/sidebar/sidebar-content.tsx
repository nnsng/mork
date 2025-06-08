'use client';

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Bookmark, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function AppSidebarContent() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    [
      {
        title: 'All Bookmarks',
        icon: Bookmark,
        path: '/',
      },
      {
        title: 'Settings',
        icon: Settings,
        path: '/settings',
      },
    ],
  ];

  return (
    <SidebarContent>
      {menuItems.map((group, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.path)}
                    isActive={item.path === pathname}
                  >
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
  );
}
