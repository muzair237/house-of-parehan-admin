import { BadgeProps, Badge as ShadCNBadge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

interface AppBadgeProps extends Omit<BadgeProps, 'rounded'> {
  rounded?: 'sm' | 'md' | 'lg' | 'full' | null;
  type?:
    | 'active'
    | 'inactive'
    | 'pending'
    | 'error'
    | 'info'
    | 'system'
    | 'reminder'
    | 'warning'
    | 'alert_info';
  size?: 'sm' | 'md' | 'lg';
}

const roundedMap = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const;

const typeMap: Record<string, string> = {
  active: 'bg-[var(--success)] text-[var(--success-foreground)]',
  inactive: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
  pending: 'bg-[var(--warning)] text-[var(--warning-foreground)]',
  error: 'bg-[var(--destructive)] text-[var(--destructive-foreground)]',
  info: 'bg-[var(--info)] text-[var(--info-foreground)]',

  // AlertType mappings
  system: 'bg-[var(--primary)] text-[var(--primary-foreground)]',
  reminder: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
  warning: 'bg-[var(--warning)] text-[var(--warning-foreground)]',
  alert_info: 'bg-[var(--info)] text-[var(--info-foreground)]',
};

const sizeMap = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
} as const;

export default function AppBadge({
  className,
  rounded = 'md',
  type,
  size = 'sm',
  children,
  ...props
}: AppBadgeProps) {
  return (
    <ShadCNBadge
      className={cn(
        sizeMap[size],
        type ? typeMap[type] : 'bg-[var(--primary)] text-[var(--primary-foreground)]',
        rounded ? roundedMap[rounded] : '',
        className
      )}
      {...props}
    >
      {children}
    </ShadCNBadge>
  );
}
