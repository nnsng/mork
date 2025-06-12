'use client';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createContext, use, useEffect, useState, type PropsWithChildren } from 'react';
import { toast } from 'sonner';

type AuthContextType = {
  user: User | null;
  onUpdateUser: (user: User) => void;
  onSignOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
        toast.error('Failed to load user session');
      }
    };

    fetchUser();
  }, [supabase]);

  const onUpdateUser = (newUser: User) => {
    setUser(newUser);
  };

  const onSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/sign-in');
    } catch (error) {
      console.error('Failed to sign out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, onUpdateUser, onSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = use(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
