import { SignInForm } from '@/app/(auth)/sign-in/sign-in-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in | Mork',
  description: 'Sign in to your account to start managing your bookmarks',
};

export default function SignInPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Mork</h1>
          <p className="text-muted-foreground mt-2">
            Organize and manage your bookmarks efficiently
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
