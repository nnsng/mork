'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Bookmark } from '@/types/bookmark';
import { exportBookmarks, importBookmarks } from '@/utils/bookmark';
import { Download } from 'lucide-react';
import type React from 'react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { importBookmarksAction } from '../../app/(main)/(dashboard)/actions';

type ImportExportModalProps = {
  bookmarks: Bookmark[];
  isOpen: boolean;
  onClose: () => void;
};

export function ImportExportModal({ bookmarks, isOpen, onClose }: ImportExportModalProps) {
  const { execute, isPending } = useServerAction(importBookmarksAction, {
    onSuccess: ({ data }) => {
      toast.success(
        `Successfully imported ${data.length} ${data.length === 1 ? 'bookmark' : 'bookmarks'}`,
      );
      onClose();
    },
    onError: ({ err }) => {
      toast.error(err.message);
    },
  });

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const bookmarks = await importBookmarks(file);
      execute(bookmarks);
    } catch {
      toast.error("Failed to import bookmarks. Please ensure it's a valid HTML export.");
    }
  };

  const handleExport = () => {
    exportBookmarks(bookmarks);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import/Export Bookmarks</DialogTitle>
          <DialogDescription>
            Import bookmarks from browser exports or export your current collection
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="import" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import">Import</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="bookmark-file">Select HTML file</Label>
              <Input
                id="bookmark-file"
                type="file"
                accept=".html,.htm"
                onChange={handleFileImport}
                disabled={isPending}
              />
              <p className="text-muted-foreground text-sm">
                Choose a bookmark HTML file exported from Chrome, Edge, or other browsers
              </p>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4 pt-2">
            <div className="space-y-4 text-center">
              <div className="space-y-2">
                <h4 className="font-medium">Export your bookmarks</h4>
                <p className="text-muted-foreground text-sm">
                  Download your bookmarks as an HTML file compatible with most browsers
                </p>
              </div>

              <Button onClick={handleExport} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Bookmarks
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
