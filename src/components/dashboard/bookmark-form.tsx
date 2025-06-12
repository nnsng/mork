import { Loader2 } from 'lucide-react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormInput } from '../form-fields/input';
import { Button } from '../ui/button';
import { DialogFooter } from '../ui/dialog';
import { Form } from '../ui/form';

type BookmarkFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  isPending: boolean;
  submitButtonText: string;
  onSubmit: (data: T) => void;
  onCancel: () => void;
};

export function BookmarkForm<T extends FieldValues>(props: BookmarkFormProps<T>) {
  const { form, isPending, submitButtonText, onSubmit, onCancel } = props;

  return (
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
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitButtonText}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
