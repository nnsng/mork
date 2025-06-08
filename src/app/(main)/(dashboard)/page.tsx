import { fetchBookmark } from '@/data-access/bookmark';
import type { Metadata } from 'next';
import { BookmarkDashboard } from './bookmark-dashboard';

export const metadata: Metadata = {
  title: 'All Bookmarks | Mork',
  description: 'View all your bookmarks in one place',
};

export default async function DashboardPage() {
  const bookmarks = await fetchBookmark();
  return <BookmarkDashboard bookmarks={bookmarks} />;
}
