'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Bookmark } from '@/types/bookmark';
import { ExternalLink, Globe, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

type BookmarkCardProps = {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
  onEdit: (bookmark: Bookmark) => void;
};

export function BookmarkCard({ bookmark, onDelete, onEdit }: BookmarkCardProps) {
  const [imageError, setImageError] = useState(false);

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  const faviconUrl = getFaviconUrl(bookmark.url);

  return (
    <Card className="group border-0 p-4 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
      <CardContent className="p-0">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex min-w-0 flex-1 items-center space-x-3">
            {faviconUrl && !imageError ? (
              <img
                src={faviconUrl || '/placeholder.svg'}
                alt=""
                className="h-6 w-6 flex-shrink-0 rounded"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="bg-muted flex h-6 w-6 flex-shrink-0 items-center justify-center rounded">
                <Globe className="text-muted-foreground size-4" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 truncate text-base font-semibold">{bookmark.title}</h3>
              <p className="text-muted-foreground truncate text-sm">{bookmark.url}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(bookmark.url)}>
                <ExternalLink className="mr-2 size-4" />
                Copy Link
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onEdit(bookmark)}>
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onDelete(bookmark.id)} className="text-destructive">
                <Trash2 className="text-destructive mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {bookmark.description && (
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{bookmark.description}</p>
        )}
      </CardContent>

      <CardFooter className="mt-auto p-0">
        <div className="flex w-full items-center justify-between border-t pt-3">
          {bookmark.folder && (
            <span className="text-muted-foreground bg-muted rounded px-2 py-1 text-xs">
              {bookmark.folder}
            </span>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(bookmark.url, '_blank')}
            className="ml-auto"
          >
            <ExternalLink className="mr-1 size-4" />
            Visit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
