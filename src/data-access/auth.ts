import type { User } from '@/types/user';
import { createClient } from '@/utils/supabase/server';

type AuthPayload = {
  email: string;
  password: string;
};

type UserPayload = {
  name?: string;
};

export async function signIn(payload: AuthPayload) {
  const { email, password } = payload;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function signUp(payload: AuthPayload & { name: string }, redirectTo: string) {
  const { email, password, name } = payload;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
      data: {
        display_name: name,
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return true;
}

export async function getUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user as unknown as User | null;
}

export async function updateUser(payload: UserPayload) {
  const { name } = payload;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({ data: { display_name: name } });
  if (error) throw new Error(error.message);
  return data;
}
