'use client';

import React, { useState } from 'react';

import { LoginPayload } from '@/domains/auth/types';
import authThunk from '@/slices/auth/thunk';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';
import Link from '@/components/shared/Link';
import ModalContainer from '@/components/shared/ModalContainer';

import { useNavigate } from '@/hooks/useNavigate';

import ResetPasswordInformation from '../ResetPasswordInformation';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.Auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginPayload>();

  const onSubmit = async (values: LoginPayload) => {
    try {
      setIsLoading(true);
      await dispatch(authThunk.login({ payload: values, navigate }));
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

      <div className="space-y-3">
        <Field
          name="password"
          label="Password"
          placeholder="••••••••"
          type="password"
          rules={[{ required: true, message: 'Password is required' }]}
        />
      </div>

      <div className="flex justify-between text-sm mt-1 text-muted-foreground">
        <ModalContainer title="Reset Your Password" content={() => <ResetPasswordInformation />}>
          {(open) => <Link onClick={open}>Forgot password?</Link>}
        </ModalContainer>
      </div>

      <div className="pt-2">
        <Button type="submit" loading={isLoading} disabled={isLoggedIn} fullWidth>
          Login
        </Button>
      </div>
    </Form>
  );
}
