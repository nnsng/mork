'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Bookmark } from '@/types/bookmark';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string(),
  folder: z.string(),
  createdAt: z.string().optional(),
});

export type BookmarkFormValues = z.infer<typeof formSchema>;

type BookmarkModalProps = {
  isOpen: boolean;
  initialBookmark: Bookmark | undefined;
  onClose: () => void;
  onSubmit: (bookmark: Bookmark | BookmarkFormValues) => void;
};

export function BookmarkModal(props: BookmarkModalProps) {
  const { isOpen, initialBookmark, onClose, onSubmit } = props;

  const form = useForm<BookmarkFormValues>({
    defaultValues: {
      id: initialBookmark?.id || '',
      title: initialBookmark?.title || '',
      url: initialBookmark?.url || '',
      description: initialBookmark?.description || '',
      folder: initialBookmark?.folder || '',
      createdAt: initialBookmark?.createdAt || new Date().toISOString(),
    },
    resolver: zodResolver(formSchema),
  });

  const handleClose = () => {
    form.reset();
    form.clearErrors();
    onClose();
  };

  const handleAddUpdate = (data: BookmarkFormValues) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialBookmark ? 'Update Bookmark' : 'Add New Bookmark'}</DialogTitle>
          <DialogDescription>
            {initialBookmark
              ? 'Update the details of your bookmark.'
              : 'Add a new bookmark to your collection. Fill in the details below.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddUpdate)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bookmark title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL *</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Optional description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="folder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional folder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{initialBookmark ? 'Update Bookmark' : 'Add Bookmark'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
