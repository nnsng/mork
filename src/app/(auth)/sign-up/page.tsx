import { SignupForm } from '@/app/(auth)/sign-up/sign-up-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up | Mork',
  description: 'Create an account to start managing your bookmarks',
};

export default function SignupPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">Sign up to start managing your bookmarks</p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
