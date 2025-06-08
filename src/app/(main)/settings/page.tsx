import { SettingsForm } from '@/app/(main)/settings/setting-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | Mork',
  description: 'Manage your account settings and preferences',
};

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <SettingsForm />
    </div>
  );
}
