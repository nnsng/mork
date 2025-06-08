export type Bookmark = {
  id: number;
  title: string;
  url: string;
  description: string;
  folder: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type BookmarkPayload = Pick<Bookmark, 'title' | 'url' | 'description' | 'folder'>;
