import type { Bookmark } from '@/types/bookmark';

export const mockBookmarks: Bookmark[] = [
  {
    id: '1',
    title: 'React Documentation',
    url: 'https://react.dev',
    description: 'The official React documentation',
    folder: 'Development',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Next.js',
    url: 'https://nextjs.org',
    description: 'The React Framework for Production',
    folder: '',
    createdAt: '2024-01-14T15:30:00Z',
  },
  {
    id: '3',
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    description: 'A utility-first CSS framework',
    folder: 'Development',
    createdAt: '2024-01-13T09:15:00Z',
  },
  {
    id: '4',
    title: 'GitHub',
    url: 'https://github.com',
    description: 'Where the world builds software',
    folder: 'Tools',
    createdAt: '2024-01-12T14:20:00Z',
  },
  {
    id: '5',
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Resources for developers, by developers',
    folder: 'Reference',
    createdAt: '2024-01-11T11:45:00Z',
  },
  {
    id: '6',
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description: 'Where developers learn, share, & build careers',
    folder: 'Community',
    createdAt: '2024-01-10T16:30:00Z',
  },
];
