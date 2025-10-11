import { BaseFields, Option } from '@/lib/utils/types';

export type RoleData = {
  type: string;
  description: string;
  permissions: string[] | { can: string }[];
} & BaseFields;

export type RolePayload = RoleData;

export type RolesWithCount = {
  items: RoleData[];
  totalItems: number;
};

export type RoleState = {
  roles: RolesWithCount;
  uniqueRoles: Option[];
  loading: boolean;
  error: string | null;
};
