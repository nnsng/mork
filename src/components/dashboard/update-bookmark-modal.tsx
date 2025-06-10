'use client';

import { updateBookmarkAction } from '@/app/(main)/(dashboard)/actions';
import { FormInput } from '@/components/form-fields';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import type { Bookmark } from '@/types/bookmark';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              control={form.control}
              name="title"
              label="Title *"
              placeholder="Name your bookmark"
            />

            <FormInput
              control={form.control}
              name="url"
              label="URL *"
              placeholder="Enter the website URL"
            />

            <FormInput
              control={form.control}
              name="description"
              label="Description"
              placeholder="Describe your bookmark"
            />

            <FormInput
              control={form.control}
              name="folder"
              label="Folder"
              placeholder="Choose a folder name"
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Bookmark
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
