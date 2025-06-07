'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const themes = [
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
] as const;

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export function SettingsForm() {
  const { user, updateUser } = useAuth();

  const { theme, setTheme } = useTheme();

  const form = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    resolver: zodResolver(schema),
  });

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateUser({ name: data.name, email: data.email });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

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

      {/* <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your bookmark data</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-save bookmarks</Label>
              <p className="text-muted-foreground text-sm">
                Automatically save bookmarks to local storage
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show favicons</Label>
              <p className="text-muted-foreground text-sm">Display website icons for bookmarks</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
