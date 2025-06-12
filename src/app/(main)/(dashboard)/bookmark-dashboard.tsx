'use client';

import { BookmarkGrid, SearchBar } from '@/components/dashboard';
import { useBookmarks } from '@/providers/bookmark-provider';
import type { Bookmark } from '@/types/bookmark';
import { useEffect, useState } from 'react';

export function BookmarkDashboard() {
  const { bookmarks } = useBookmarks();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);

  useEffect(() => {
    let filtered = bookmarks;

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
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <BookmarkGrid bookmarks={filteredBookmarks} />
    </>
  );
}
