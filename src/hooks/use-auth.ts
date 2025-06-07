'use client';

import type { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const user = localStorage.getItem('bookmarkUser');
    if (!user) return null;
    return JSON.parse(user);
  });

  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/signin');
  }, [user, router]);

  const onSignIn = (email: string) => {
    const user = { name: email.split('@')[0], email };
    setUser(user);
    localStorage.setItem('bookmarkUser', JSON.stringify(user));
    router.push('/');
  };

  const onSignUp = (user: User) => {
    setUser(user);
    localStorage.setItem('bookmarkUser', JSON.stringify(user));
    router.push('/');
  };

  const onSignOut = () => {
    setUser(null);
    localStorage.removeItem('bookmarkUser');
    localStorage.removeItem('bookmarks');
    router.push('/signin');
  };

  const updateUser = (user: User) => {
    setUser(user);
    localStorage.setItem('bookmarkUser', JSON.stringify(user));
  };

  return { user, isAuthenticated: !!user, onSignIn, onSignUp, onSignOut, updateUser };
}
