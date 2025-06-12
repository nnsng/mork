'use client';

import { FormInput } from '@/components/form-fields';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/providers/auth-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { updateUserAction } from './actions';
import { profileSchema } from './validation';

export function ProfileForm() {
  const { user, onUpdateUser } = useAuth();

  const { execute, isPending } = useServerAction(updateUserAction, {
    onSuccess: ({ data }) => {
      toast.success('Settings updated successfully');
      onUpdateUser(data.user);
    },
    onError: ({ err }) => {
      toast.error(err.message);
    },
  });

  const form = useForm({
    defaultValues: {
      name: user?.user_metadata.display_name || '',
    },
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    form.reset({
      name: user?.user_metadata.display_name || '',
    });
  }, [user, form]);

  const handleSubmit = async (data: z.infer<typeof profileSchema>) => {
    execute(data);
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
