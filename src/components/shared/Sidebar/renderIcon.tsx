import { Icons } from '@/lib/utils/icons';

import AppIcon from '../Icon';

export const renderIcon = (iconName?: keyof typeof Icons) => {
  if (!iconName) return null;
  return <AppIcon name={iconName} className="w-5 h-5 shrink-0" />;
};
