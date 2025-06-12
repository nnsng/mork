'use server';

import { signUp } from '@/data-access/auth';
import { headers } from 'next/headers';
import { createServerAction } from 'zsa';
import { schema } from './validation';

export const signUpAction = createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    const origin = (await headers()).get('origin')!;
    const data = await signUp(input, `${origin}/auth/callback`);
    return data;
  });
