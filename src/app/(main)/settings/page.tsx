import { SettingsForm } from '@/app/(main)/settings/setting-form';
import { PageHeader } from '@/components/layout/page-header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings and preferences',
};

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <PageHeader title="Settings" description="Manage your account settings and preferences" />
      <SettingsForm />
    </div>
  );
}
