import { QUERY_KEYS } from '@/constants/query-keys';
import { createClient } from '@/utils/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useAuth() {
  const supabase = createClient();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
  });

  const { mutateAsync: onSignOut } = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.USER] });
      router.push('/sign-in');
    },
    onError: (error) => {
      console.error('Failed to sign out:', error);
      toast.error('Failed to sign out');
    },
  });

  return { user, onSignOut };
}
