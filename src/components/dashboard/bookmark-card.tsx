'use client';

import { deleteBookmarkAction } from '@/app/(main)/(dashboard)/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Bookmark } from '@/types/bookmark';
import { cn } from '@/utils/tw';
import { ExternalLink, Globe, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { UpdateBookmarkModal } from './update-bookmark-modal';

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const toastLoadingId = useRef<string | number | undefined>(undefined);

  const { execute: deleteBookmark, isPending: isDeleting } = useServerAction(deleteBookmarkAction, {
    onStart: () => {
      toastLoadingId.current = toast.loading('Deleting bookmark...');
    },
    onFinish: () => {
      toast.dismiss(toastLoadingId.current);
    },
    onSuccess: () => {
      toast.success('Bookmark deleted successfully');
    },
    onError: ({ err }) => {
      toast.error(err.message);
    },
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookmark.url);
    toast.success('Link copied to clipboard');
  };

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
    <>
      <Card className="group border-0 p-4 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
        <CardContent className="p-0">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex min-w-0 flex-1 items-center space-x-3">
              {faviconUrl && !imageError ? (
                // eslint-disable-next-line @next/next/no-img-element
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
                  className={cn('h-8 w-8 p-0 opacity-0 transition-opacity', {
                    'group-hover:opacity-100': !isDeleting,
                  })}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopyLink}>
                  <ExternalLink className="mr-2 size-4" />
                  Copy Link
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setIsOpenUpdateModal(true)}>
                  <Pencil className="mr-2 size-4" />
                  Update
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => deleteBookmark(bookmark.id)}>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {bookmark.description && (
            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
              {bookmark.description}
            </p>
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

      <UpdateBookmarkModal
        bookmark={bookmark}
        isOpen={isOpenUpdateModal}
        onOpenChange={setIsOpenUpdateModal}
      />
    </>
  );
}
