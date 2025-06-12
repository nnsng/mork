import { AppSidebar } from '@/app/(main)/_sidebar/sidebar';
import { getUser } from '@/data-access/auth';
import { redirect } from 'next/navigation';
import { type PropsWithChildren } from 'react';

type MainLayoutProps = PropsWithChildren;

export default async function MainLayout({ children }: MainLayoutProps) {
  const user = await getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return <AppSidebar>{children}</AppSidebar>;
}
