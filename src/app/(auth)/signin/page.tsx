import { SignInForm } from '@/components/auth/signin-form';

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
