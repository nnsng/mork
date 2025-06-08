'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { Theme } from '@/types/appearance';
import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

type ThemeObj = {
  name: Capitalize<Theme>;
  value: Theme;
  icon: LucideIcon;
};

const themes: ThemeObj[] = [
  {
    name: 'Light',
    value: 'light',
    icon: Sun,
  },
  {
    name: 'Dark',
    value: 'dark',
    icon: Moon,
  },
  {
    name: 'System',
    value: 'system',
    icon: Monitor,
  },
];

export function Appearance() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>Customize how the application looks</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Theme</Label>

          <div className="flex space-x-2">
            {themes.map((themeItem) => (
              <Button
                key={themeItem.value}
                variant={theme === themeItem.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme(themeItem.value)}
              >
                <themeItem.icon className="mr-2 size-4" />
                {themeItem.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
