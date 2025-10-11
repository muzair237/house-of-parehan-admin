import { BaseFields } from '@/lib/utils/types';

export type UserData = {
  fullName: string;
  mobile: string;
  roles: { type: string }[] | string[];
  accountExpiryDate?: Date;
} & BaseFields;

export type UserPayload = UserData;

export type UsersWithCount = {
  items: UserData[];
  totalItems: number;
};

export type UserState = {
  users: UsersWithCount;
  userData: (UserData & { permissions: string[] }) | null;
  loading: boolean;
  error: string | null;
};

export type PasswordFormValues = {
  password: string;
  confirmPassword: string;
};
