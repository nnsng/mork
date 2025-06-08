'use client';

import {
  AddBookmarkModal,
  BookmarkGrid,
  ImportExportModal,
  SearchBar,
} from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import type { Bookmark } from '@/types/bookmark';
import { Plus, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';

type BookmarkDashboardProps = {
  bookmarks: Bookmark[];
};

export function BookmarkDashboard({ bookmarks }: BookmarkDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);
  const [isModalOpen, setIsModalOpen] = useState({ add: false, importExport: false });

  const handleOpenModal = (modal: 'add' | 'importExport', value: boolean) => {
    setIsModalOpen((prev) => ({ ...prev, [modal]: value }));
  };

  useEffect(() => {
    let filtered = bookmarks;

    // Filter by search query
    if (searchQuery) {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((bookmark) => {
        const keys: Array<keyof Bookmark> = ['title', 'url', 'description', 'folder'];
        return keys.some((key) => {
          return bookmark[key].toString().toLowerCase().includes(lowerCaseSearchQuery);
        });
      });
    }

    setFilteredBookmarks(filtered);
  }, [bookmarks, searchQuery]);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">All Bookmarks</h2>
            <p className="text-muted-foreground">
              {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleOpenModal('importExport', true)}>
              <Upload className="mr-2 h-4 w-4" />
              Import/Export
            </Button>

            <Button onClick={() => handleOpenModal('add', true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Bookmark
            </Button>
          </div>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <BookmarkGrid bookmarks={filteredBookmarks} />
      </div>

      <AddBookmarkModal isOpen={isModalOpen.add} onClose={() => handleOpenModal('add', false)} />

      <ImportExportModal
        bookmarks={bookmarks}
        isOpen={isModalOpen.importExport}
        onClose={() => handleOpenModal('importExport', false)}
      />
    </>
  );
}
