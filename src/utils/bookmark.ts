import type { Bookmark, BookmarkPayload } from '@/types/bookmark';

export const generateBookmarksHTML = (bookmarks: Bookmark[]): string => {
  const bookmarkItems = bookmarks
    .map(
      (bookmark) =>
        `<DT>
          <A
            HREF="${bookmark.url}"
            ADD_DATE="${Math.floor(new Date(bookmark.created_at).getTime() / 1000)}"
            DATA-DESCRIPTION="${bookmark.description}"
            DATA-FOLDER="${bookmark.folder}"
          >
            ${bookmark.title}
          </A>`,
    )
    .join('\n        ');

  return `
    <!DOCTYPE NETSCAPE-Bookmark-file-1>
      <!-- This is an automatically generated file.
        It will be read and overwritten.
        DO NOT EDIT! -->
      <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
      <TITLE>Mork</TITLE>
      <H1>Mork</H1>
      <DL><p>
        <DT><H3 ADD_DATE="${Math.floor(Date.now() / 1000)}" LAST_MODIFIED="${Math.floor(Date.now() / 1000)}">Mork</H3>
        <DL><p>
          ${bookmarkItems}
        </DL><p>
      </DL><p>
  `;
};

export const exportBookmarks = (bookmarks: Bookmark[]) => {
  const html = generateBookmarksHTML(bookmarks);

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bookmarks-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const parseBookmarksHTML = (html: string): BookmarkPayload[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const links = doc.querySelectorAll('a[href]');

  const bookmarks: BookmarkPayload[] = [];

  links.forEach((link) => {
    const href = link.getAttribute('href');
    const title = link.textContent || '';
    const description = link.getAttribute('data-description') || '';
    const folder = link.getAttribute('data-folder') || '';

    if (href && href.startsWith('http')) {
      bookmarks.push({
        title,
        url: href,
        description,
        folder,
      });
    }
  });

  return bookmarks;
};

export const importBookmarks = async (file: File): Promise<BookmarkPayload[]> => {
  if (!file) return Promise.resolve([]);

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const bookmarks = parseBookmarksHTML(content);
        resolve(bookmarks);
      } catch {
        reject(new Error());
      }
    };
    reader.readAsText(file);
  });
};
