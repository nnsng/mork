import { AddBookmarkButton, ImportExportButton } from '@/components/dashboard';
import { PageHeader } from '@/components/layout/page-header';
import { fetchBookmark } from '@/data-access/bookmark';
import type { Metadata } from 'next';
import { BookmarkDashboard } from './bookmark-dashboard';

export const metadata: Metadata = {
  title: 'All Bookmarks',
  description: 'View all your bookmarks in one place',
};

export default async function DashboardPage() {
  const bookmarks = await fetchBookmark();

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <PageHeader
          title="All Bookmarks"
          description={`${bookmarks.length} bookmark${bookmarks.length !== 1 ? 's' : ''}`}
        />

        <div className="flex flex-1 gap-2 md:flex-0 md:*:flex-1">
          <ImportExportButton bookmarks={bookmarks} />
          <AddBookmarkButton />
        </div>
      </div>

      <BookmarkDashboard bookmarks={bookmarks} />
    </div>
  );
}
