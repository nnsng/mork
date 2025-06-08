import { Loader2 } from 'lucide-react';

export default function MainLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="size-8 animate-spin" />
    </div>
  );
}
