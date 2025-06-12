'use client';

import { updateBookmarkAction } from '@/app/(main)/(dashboard)/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Bookmark } from '@/types/bookmark';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { BookmarkForm } from './bookmark-form';

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string(),
  folder: z.string(),
  user_id: z.string(),
  created_at: z.string(),
});

type UpdateBookmarkModalProps = {
  bookmark: Bookmark;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UpdateBookmarkModal({ bookmark, isOpen, onOpenChange }: UpdateBookmarkModalProps) {
  const { execute, isPending } = useServerAction(updateBookmarkAction, {
    onSuccess: () => {
      toast.success('Bookmark updated successfully');
      onOpenChange(false);
    },
    onError: ({ err }) => {
      toast.error(err.message);
    },
  });

  const form = useForm<Bookmark>({
    defaultValues: bookmark,
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(bookmark);
      form.clearErrors();
    }
  }, [isOpen, form, bookmark]);

  const onSubmit = (data: Bookmark) => {
    execute(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Bookmark</DialogTitle>
          <DialogDescription>
            Update the details of the bookmark. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <BookmarkForm
          form={form}
          isPending={isPending}
          submitButtonText="Update Bookmark"
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
