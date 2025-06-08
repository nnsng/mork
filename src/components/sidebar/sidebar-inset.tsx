'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Bookmark } from 'lucide-react';
import type { PropsWithChildren } from 'react';

type AppSidebarInsetProps = PropsWithChildren;

export function AppSidebarInset({ children }: AppSidebarInsetProps) {
  return (
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
  );
}
