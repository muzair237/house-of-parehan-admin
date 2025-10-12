import { BaseFields } from '@/lib/utils/types';

export type AdminData = {
  fullName: string;
  mobile: string;
  roles: { type: string }[] | string[];
  accountExpiryDate?: Date;
} & BaseFields;

export type AdminPayload = AdminData;

export type AdminsWithCount = {
  items: AdminData[];
  totalItems: number;
};

export type AdminState = {
  admins: AdminsWithCount;
  adminData: (AdminData & { permissions: string[] }) | null;
  loading: boolean;
  error: string | null;
};

export type PasswordFormValues = {
  password: string;
  confirmPassword: string;
};
