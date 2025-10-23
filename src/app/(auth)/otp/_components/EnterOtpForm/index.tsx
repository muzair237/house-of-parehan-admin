'use client';

import React, { useState } from 'react';

import authThunk from '@/slices/auth/thunk';
import { useAppDispatch } from '@/slices/hooks';
import { useSearchParams } from 'next/navigation';

import Button from '@/components/shared/Button';
import Link from '@/components/shared/Link';
import OTPInputField from '@/components/shared/OtpInputField';
import Toast from '@/components/shared/Toast';

import { useNavigate } from '@/hooks/useNavigate';

import { handleApiCall } from '@/lib/utils/helper';

export default function EnterOTPForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, authThunk.verifyOtp, { otp, email });
      if (success) {
        navigate(`/reset-password?email=${email}`);
      }
    } catch (error) {
      console.error('Error sending OTP: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    setIsLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, authThunk.forgotPassword, email);

      if (success) {
        Toast({
          type: 'success',
          message: 'OTP sent successfully!',
        });
      }
    } catch (error) {
      console.error('Error sending OTP: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 mt-4">
      <OTPInputField length={6} value={otp} onChange={setOtp} error={otp.length < 6} />
      <div>
        <Link onClick={resendOtp}>Didn’t receive the code? Resend</Link>
      </div>
      <Button
        onClick={handleSubmit}
        type="button"
        disabled={otp.length < 6}
        loading={isLoading}
        fullWidth
      >
        Verify Code
      </Button>
    </div>
  );
}
