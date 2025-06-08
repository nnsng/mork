'use client';

import { FormInput } from '@/components/form-fields';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { QUERY_KEYS } from '@/constants/query-keys';
import { useAuth } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { updateUserAction } from './actions';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export function ProfileForm() {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { execute, isPending } = useServerAction(updateUserAction, {
    onSuccess: () => {
      toast.success('Settings updated successfully');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    },
    onError: ({ err }) => {
      toast.error(err.message);
    },
  });

  const form = useForm({
    defaultValues: {
      name: user?.user_metadata.display_name || '',
      email: user?.email || '',
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    execute({ name: data.name });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormInput control={form.control} name="name" label="Name" placeholder="Your name" />

            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email"
              disabled
            />

            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
