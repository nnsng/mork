'use client';

import { addBookmarkAction } from '@/app/(main)/(dashboard)/actions';
import { FormInput } from '@/components/form-fields';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';

const formSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string(),
  folder: z.string(),
});

export type BookmarkFormValues = z.infer<typeof formSchema>;

export function AddBookmarkButton() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const { execute, isPending } = useServerAction(addBookmarkAction, {
    onSuccess: () => {
      toast.success('Bookmark added successfully');
      closeModal();
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

  useEffect(() => {
    if (isOpen) {
      form.reset();
      form.clearErrors();
    }
  }, [isOpen, form]);

  const onSubmit = (data: BookmarkFormValues) => {
    execute(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Bookmark
        </Button>
      </DialogTrigger>

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
              <Button type="button" variant="outline" onClick={closeModal}>
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
