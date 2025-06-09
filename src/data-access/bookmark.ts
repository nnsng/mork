import type { Bookmark, BookmarkPayload } from '@/types/bookmark';
import { createClient } from '@/utils/supabase/server';

export async function fetchBookmark() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('bookmark').select('*');
  if (error) throw new Error(error.message);
  return data as Bookmark[];
}

export async function addBookmark(bookmark: BookmarkPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('bookmark').insert(bookmark).select();
  if (error) throw new Error(error.message);
  return data as Bookmark[];
}

export async function updateBookmark(bookmark: Bookmark) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookmark')
    .update(bookmark)
    .eq('id', bookmark.id)
    .select();
  if (error) throw new Error(error.message);
  return data as Bookmark[];
}

export async function deleteBookmark(id: Bookmark['id']) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('bookmark').delete().eq('id', id).select();
  if (error) throw new Error(error.message);
  return data as Bookmark[];
}

export async function importBookmarks(bookmarks: BookmarkPayload[]) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('bookmark').insert(bookmarks).select();
  if (error) throw new Error(error.message);
  return data as Bookmark[];
}
