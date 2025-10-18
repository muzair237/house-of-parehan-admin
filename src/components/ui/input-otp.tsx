'use client';

import * as React from 'react';

import { OTPInput, OTPInputContext } from 'input-otp';
import { MinusIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function InputOTPBase({
  className,
  containerClassName,
  autoFocus = true,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
  autoFocus?: boolean;
}) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Auto-focus first OTP box on mount
  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <OTPInput
      ref={inputRef}
      data-slot="input-otp"
      containerClassName={cn(
        'flex items-center gap-3 has-disabled:opacity-50 justify-center',
        containerClassName
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn('flex items-center gap-3', className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        'relative flex h-12 w-12 items-center justify-center rounded-md text-lg font-medium transition-all',
        'border-2 border-[var(--input)] bg-[var(--background)] text-[var(--foreground)] shadow-sm',
        'data-[active=true]:border-[var(--ring)] data-[active=true]:ring-2 data-[active=true]:ring-[var(--ring)]',
        'aria-invalid:border-[var(--destructive)] aria-invalid:ring-[var(--destructive)]',
        'hover:border-[var(--ring)] hover:ring-[var(--ring)] hover:ring-1',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
        'transition-colors duration-300 ease-in-out',
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-[var(--foreground)] h-5 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator(props: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="flex items-center justify-center text-[var(--muted-foreground)]"
      {...props}
    >
      <MinusIcon size={18} />
    </div>
  );
}

export { InputOTPBase, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
