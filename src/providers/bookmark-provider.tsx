'use client';

import type { Bookmark } from '@/types/bookmark';
import { createContext, use, type PropsWithChildren } from 'react';

type BookmarkProviderProps = PropsWithChildren<{
  bookmarks: Bookmark[];
}>;

type BookmarkContextType = {
  bookmarks: Bookmark[];
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children, bookmarks }: BookmarkProviderProps) {
  return <BookmarkContext.Provider value={{ bookmarks }}>{children}</BookmarkContext.Provider>;
}

export function useBookmarks() {
  const context = use(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
