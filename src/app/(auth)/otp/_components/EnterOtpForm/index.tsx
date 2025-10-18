'use client';

import React, { useState } from 'react';

import Button from '@/components/shared/Button';
import Link from '@/components/shared/Link';
import OTPInputField from '@/components/shared/OtpInputField';

export default function EnterOTPForm() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }
    setError('');
    console.log('Verifying OTP:', otp);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
      <OTPInputField length={6} value={otp} onChange={setOtp} error={error} />
      <div>
        <Link href="/forgot-password">Didn’t receive the code? Resend</Link>
      </div>
      <Button type="submit" fullWidth>
        Verify Code
      </Button>
    </form>
  );
}
