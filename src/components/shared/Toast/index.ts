import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
  description?: string;
}

export default function Toast({ type, message, description }: ToastProps): void {
  toast[type](message, description ? { description } : undefined);
}
