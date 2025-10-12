import { BaseFields } from '@/lib/utils/types';

export type AdminData = {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  permissions: string[];
} & BaseFields;

export type AuthState = {
  admin: AdminData | null;
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
