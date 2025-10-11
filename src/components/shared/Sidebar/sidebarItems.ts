import { SidebarItem } from './types';

export const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    href: '/dashboard',
  },
  {
    label: 'Access Control',
    icon: 'ShieldCheck',
    children: [
      { label: 'Permissions', icon: 'KeyRound', href: '/permissions' },
      { label: 'Roles', icon: 'Network', href: '/roles' },
      { label: 'Users', icon: 'ShieldUser', href: '/users' },
    ],
  },
  {
    label: 'Transactions',
    icon: 'CircleDollarSign',
    href: '/transactions',
  },
  {
    label: 'Reminders',
    icon: 'BellRing',
    href: '/reminders',
  },
  {
    label: 'Enquiries',
    icon: 'MessageCircle',
    href: '/enquiries',
  },
  {
    label: 'Profile',
    icon: 'User',
    href: '/profile',
  },
  {
    label: 'Theme',
    icon: 'Palette',
    special: 'theme',
  },
  {
    label: 'Logout',
    icon: 'LogOut',
    special: 'logout',
  },
];
