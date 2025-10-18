'use client';

import React, { useState } from 'react';

import { ForgotPasswordPayload } from '@/domains/auth/types';
import authThunk from '@/slices/auth/thunk';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';
import Link from '@/components/shared/Link';

import { useNavigate } from '@/hooks/useNavigate';

export default function ForgotPasswordForm() {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.Auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordPayload>();

  const onSubmit = async (values: ForgotPasswordPayload) => {
    try {
      setIsLoading(true);
      await dispatch(authThunk.forgotPassword(values.email)).unwrap();
      navigate(`/otp?email=${encodeURIComponent(values.email)}`, { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="space-y-3">
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="someone@example.com"
          rules={[{ email: true }, { required: true, message: 'Email is required' }]}
        />
      </div>

      <div>
        <Link href="/login">Remembered your password?</Link>
      </div>

      <div className="pt-2">
        <Button type="submit" loading={isLoading} disabled={isLoggedIn} fullWidth>
          Send OTP
        </Button>
      </div>
    </Form>
  );
}
