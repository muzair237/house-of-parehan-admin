import { InputOTPBase, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import { cn } from '@/lib/utils';

export interface OTPInputFieldProps {
  error?: string;
  length?: number;
  value?: string;
  onChange?: (val: string) => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

const OTPInputField: React.FC<OTPInputFieldProps> = ({
  error,
  length = 6,
  value = '',
  onChange,
  fullWidth = true,
  disabled = false,
}) => {
  return (
    <div className={cn('flex flex-col gap-2.5', fullWidth && 'w-full')}>
      <InputOTPBase
        maxLength={length}
        value={value}
        onChange={(val) => onChange?.(val)}
        disabled={disabled}
        containerClassName="justify-center"
        aria-invalid={!!error}
      >
        <InputOTPGroup>
          {Array.from({ length }).map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTPBase>
    </div>
  );
};

export default OTPInputField;
