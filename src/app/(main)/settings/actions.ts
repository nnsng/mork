'use server';

import { updateUser } from '@/data-access/auth';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const updateUserAction = createServerAction()
  .input(
    z.object({
      name: z.string().min(1),
    }),
  )
  .handler(async ({ input }) => {
    const data = await updateUser(input);
    return data;
  });
