'use client';

import { FormInput } from '@/components/form-fields';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/providers/auth-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { useServerAction } from 'zsa-react';
import { signInAction } from './actions';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function SignInForm() {
  const router = useRouter();

  const { onUpdateUser } = useAuth();

  const { execute, isPending } = useServerAction(signInAction, {
    onSuccess: ({ data }) => {
      onUpdateUser(data.user);
      toast.success('Signed in successfully');
      router.push('/');
    },
    onError: ({ err }) => {
      toast.error(err.message);
    },
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (formValues: z.infer<typeof schema>) => {
    execute(formValues);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your email and password to access your bookmarks</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
            />

            <FormInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </CardContent>

          <CardFooter className="mt-4 flex flex-col space-y-4">
            <p className="text-muted-foreground text-center text-sm">
              {"Don't have an account? "}
              <Link href="/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
