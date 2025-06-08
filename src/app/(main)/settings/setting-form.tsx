import { Appearance } from './appearance';
import { ProfileForm } from './profile-form';

export function SettingsForm() {
  return (
    <div className="space-y-6">
      <ProfileForm />
      <Appearance />
      {/* <DataManagement /> */}
    </div>
  );
}
