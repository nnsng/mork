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
import { exportBookmarks, importBookmarks } from '@/utils/bookmark';
import { Download } from 'lucide-react';
import type React from 'react';
import { toast } from 'sonner';

type ImportExportModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ImportExportModal({ isOpen, onClose }: ImportExportModalProps) {
  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const bookmarks = await importBookmarks(file);
      const existingBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const allBookmarks = [...existingBookmarks, ...bookmarks];

      localStorage.setItem('bookmarks', JSON.stringify(allBookmarks));

      toast.success(`Successfully imported ${bookmarks.length} bookmarks`, {
        richColors: true,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch {
      toast.error("Failed to import bookmarks. Please ensure it's a valid HTML export.", {
        richColors: true,
      });
    }
  };

  const handleExport = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    exportBookmarks(bookmarks);
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
