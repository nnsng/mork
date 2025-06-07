import { BookmarkDashboard } from '@/components/dashboard/bookmark-dashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Bookmarks | Mork',
  description: 'View all your bookmarks in one place',
};

export default function DashboardPage() {
  return <BookmarkDashboard />;
}
