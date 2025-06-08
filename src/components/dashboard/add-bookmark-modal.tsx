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
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { addBookmarkAction } from '../../app/(main)/(dashboard)/actions';
import { FormInput } from '../form-fields';

const formSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string(),
  folder: z.string(),
});

export type BookmarkFormValues = z.infer<typeof formSchema>;

type AddBookmarkModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddBookmarkModal(props: AddBookmarkModalProps) {
  const { isOpen, onClose } = props;

  const { execute, isPending } = useServerAction(addBookmarkAction, {
    onSuccess: () => {
      toast.success('Bookmark added successfully');
      onClose();
    },
    onError: ({ err }) => {
      toast.error(err.message);
    },
  });

  const form = useForm<BookmarkFormValues>({
    defaultValues: {
      title: '',
      url: '',
      description: '',
      folder: '',
    },
    resolver: zodResolver(formSchema),
  });

  const handleClose = () => {
    form.reset();
    form.clearErrors();
    onClose();
  };

  const onSubmit = (data: BookmarkFormValues) => {
    execute(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Bookmark</DialogTitle>
          <DialogDescription>
            Add a new bookmark to your collection. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              control={form.control}
              name="title"
              label="Title *"
              placeholder="Enter bookmark title"
            />

            <FormInput
              control={form.control}
              name="url"
              label="URL *"
              placeholder="https://example.com"
            />

            <FormInput
              control={form.control}
              name="description"
              label="Description"
              placeholder="Optional description"
            />

            <FormInput
              control={form.control}
              name="folder"
              label="Folder"
              placeholder="Optional folder name"
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Bookmark
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
