import type { Theme } from '@/types/appearance';
import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const themes: Theme[] = ['light', 'dark', 'system'];

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider themes={themes} defaultTheme="system" {...props}>
      {children}
    </NextThemesProvider>
  );
}
