import { BaseFields } from '@/lib/utils/types';

export type UserData = {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  permissions: string[];
} & BaseFields;

export type AuthState = {
  user: UserData | null;
  permissions: string[];
  isLoggedIn: boolean;
  allowedPages: string[];
  isSessionExpired: boolean;
  isLoading: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};
