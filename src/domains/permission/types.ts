import { BaseFields, Option } from '@/lib/utils/types';

export type PermissionData = {
  can: string;
  route: string;
  description: string;
  parents: string[];
} & BaseFields;

export type PermissionPayload = PermissionData;

export type PermissionsWithCount = {
  items: PermissionData[];
  totalItems: number;
};

export type PermissionState = {
  permissions: PermissionsWithCount;
  permissionsForRoles: PermissionData[];
  parents: Option[];
  loading: boolean;
  error: string | null;
};
