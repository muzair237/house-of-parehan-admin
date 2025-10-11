import { cn } from '@/lib/utils';
import { Icons } from '@/lib/utils/icons';

interface AppIconProps {
  name: keyof typeof Icons;
  size?: number;
  className?: string;
  color?: string;
}

const inferredColorMap: Record<string, string> = {
  Trash: 'text-[var(--destructive)]',
  Delete: 'text-[var(--destructive)]',
  LogOut: 'text-[var(--destructive)]',
  Pencil: 'text-[var(--success)]',
  Info: 'text-[var(--info)]',
  RotateCcwKey: 'text-[var(--info)]',
  Warning: 'text-[var(--warning)]',
  Check: 'text-[var(--success)]',
  Lock: 'text-[var(--muted-foreground)]',
  Shield: 'text-[var(--muted-foreground)]',
};

export default function AppIcon({ name, size = 20, className, color }: AppIconProps) {
  const LucideIcon = Icons[name];
  const inferredColor = inferredColorMap[name] ?? 'text-[var(--icon-color)]';
  const appliedColor = color ?? inferredColor;

  return <LucideIcon size={size} strokeWidth={1.8} className={cn(appliedColor, className)} />;
}
