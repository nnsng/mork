'use server';

import {
  addBookmark,
  deleteBookmark,
  importBookmarks,
  updateBookmark,
} from '@/data-access/bookmark';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const addBookmarkAction = createServerAction()
  .input(
    z.object({
      title: z.string().min(1),
      url: z.string().url(),
      description: z.string(),
      folder: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const data = await addBookmark(input);
    revalidatePath('/');
    return data;
  });

export const updateBookmarkAction = createServerAction()
  .input(
    z.object({
      id: z.number(),
      title: z.string().min(1),
      url: z.string().url(),
      description: z.string(),
      folder: z.string(),
      user_id: z.string(),
      created_at: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const data = await updateBookmark(input);
    revalidatePath('/');
    return data;
  });

export const deleteBookmarkAction = createServerAction()
  .input(z.number())
  .handler(async ({ input }) => {
    const data = await deleteBookmark(input);
    revalidatePath('/');
    return data;
  });

export const importBookmarksAction = createServerAction()
  .input(
    z.array(
      z.object({
        title: z.string().min(1),
        url: z.string().url(),
        description: z.string(),
        folder: z.string(),
      }),
    ),
  )
  .handler(async ({ input }) => {
    const data = await importBookmarks(input);
    revalidatePath('/');
    return data;
  });
