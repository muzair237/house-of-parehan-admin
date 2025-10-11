import { Icons } from '@/lib/utils/icons';

export type SidebarItem = {
  label: string;
  icon: keyof typeof Icons;
  href?: string;
  children?: SidebarItem[];
  special?: string;
};
