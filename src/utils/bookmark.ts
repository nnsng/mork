import type { Bookmark } from '@/types/bookmark';

export const generateBookmarksHTML = (bookmarks: Bookmark[]): string => {
  const bookmarkItems = bookmarks
    .map(
      (bookmark) =>
        `<DT><A HREF="${bookmark.url}" ADD_DATE="${Math.floor(new Date(bookmark.createdAt).getTime() / 1000)}">${bookmark.title}</A>`,
    )
    .join('\n        ');

  return `<!DOCTYPE NETSCAPE-Bookmark-file-1>
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
</DL><p>`;
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

export const parseBookmarksHTML = (html: string): Bookmark[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const links = doc.querySelectorAll('a[href]');

  const bookmarks: Bookmark[] = [];

  links.forEach((link, index) => {
    const href = link.getAttribute('href');
    const title = link.textContent || '';

    if (href && href.startsWith('http')) {
      bookmarks.push({
        id: `imported-${Date.now()}-${index}`,
        title,
        url: href,
        description: '',
        folder: '',
        createdAt: new Date().toISOString(),
      });
    }
  });

  return bookmarks;
};

export const importBookmarks = (file: File): Promise<Bookmark[]> => {
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
