'use server';

import { updateUser } from '@/data-access/auth';
import { createServerAction } from 'zsa';
import { profileSchema } from './validation';

export const updateUserAction = createServerAction()
  .input(profileSchema)
  .handler(async ({ input }) => {
    const data = await updateUser(input);
    return data;
  });
