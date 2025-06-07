'use client';

import { BookmarkGrid } from '@/components/dashboard/bookmark-grid';
import { BookmarkModal, type BookmarkFormValues } from '@/components/dashboard/bookmark-modal';
import { SearchBar } from '@/components/dashboard/search-bar';
import { Button } from '@/components/ui/button';
import { mockBookmarks } from '@/lib/mock-data';
import type { Bookmark } from '@/types/bookmark';
import { Plus, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImportExportModal } from './import-export-modal';

export function BookmarkDashboard() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [initialBookmark, setInitialBookmark] = useState<Bookmark | undefined>(undefined);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Load bookmarks from localStorage or use mock data
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (!savedBookmarks) {
      localStorage.setItem('bookmarks', JSON.stringify(mockBookmarks));
    }
    const initialBookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : mockBookmarks;
    setBookmarks(initialBookmarks);
    setFilteredBookmarks(initialBookmarks);
  }, [router]);

  useEffect(() => {
    let filtered = bookmarks;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (bookmark) =>
          bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bookmark.url.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredBookmarks(filtered);
  }, [bookmarks, searchQuery]);

  const handleOpenBookmarkModal = (initialBookmark?: Bookmark) => {
    setInitialBookmark(initialBookmark);
    setIsAddModalOpen(true);
  };

  const handleSubmitBookmark = (newBookmark: Bookmark | BookmarkFormValues) => {
    if (newBookmark?.id) {
      const updatedBookmarks = bookmarks.map((b) =>
        b.id === newBookmark.id ? (newBookmark as Bookmark) : b,
      );
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } else {
      const bookmark: Bookmark = {
        ...newBookmark,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      const updatedBookmarks = [...bookmarks, bookmark];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }
  };

  const handleEditBookmark = (bookmark: Bookmark) => {
    handleOpenBookmarkModal(bookmark);
  };

  const handleDeleteBookmark = (id: string) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">All Bookmarks</h2>
            <p className="text-muted-foreground">
              {filteredBookmarks.length} bookmark{filteredBookmarks.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsImportExportOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Import/Export
            </Button>

            <Button onClick={() => handleOpenBookmarkModal()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Bookmark
            </Button>
          </div>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <BookmarkGrid
          bookmarks={filteredBookmarks}
          onDelete={handleDeleteBookmark}
          onEdit={handleEditBookmark}
        />
      </div>

      <BookmarkModal
        key={JSON.stringify(initialBookmark)}
        initialBookmark={initialBookmark}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSubmitBookmark}
      />

      <ImportExportModal isOpen={isImportExportOpen} onClose={() => setIsImportExportOpen(false)} />
    </>
  );
}
