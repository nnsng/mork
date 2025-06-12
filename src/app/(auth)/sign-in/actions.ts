'use server';

import { signIn } from '@/data-access/auth';
import { createServerAction } from 'zsa';
import { schema } from './validation';

export const signInAction = createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    const data = await signIn(input);
    return data;
  });
