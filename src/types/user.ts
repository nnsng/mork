export type User = {
  id: UserId;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
};

export type UserId = string;

export type AppMetadata = {
  provider: string;
  providers: string[];
};

export type Identity = {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: UserMetadata;
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
  email: string;
};

export type UserMetadata = {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
  display_name?: string;
};
