'use server';

import { signUp } from '@/data-access/auth';
import { headers } from 'next/headers';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const signUpAction = createServerAction()
  .input(
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(6),
    }),
  )
  .handler(async ({ input }) => {
    const origin = (await headers()).get('origin')!;
    const data = await signUp(input, `${origin}/auth/callback`);
    return data;
  });
