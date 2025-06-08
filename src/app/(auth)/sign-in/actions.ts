'use server';

import { signIn } from '@/data-access/auth';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const signInAction = createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
  )
  .handler(async ({ input }) => {
    const data = await signIn(input);
    return data;
  });
