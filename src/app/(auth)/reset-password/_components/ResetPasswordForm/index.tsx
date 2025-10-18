'use client';

import React, { useState } from 'react';

import { PasswordFormValues } from '@/domains/admin/types';
import authThunk from '@/slices/auth/thunk';
import { useAppDispatch } from '@/slices/hooks';
import { useRouter, useSearchParams } from 'next/navigation';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';

import { handleApiCall } from '@/lib/utils/helper';

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PasswordFormValues>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const onSubmit = async (values: PasswordFormValues) => {
    setIsLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, authThunk.resetPassword, {
        email,
        newPassword: values.password,
        navigate: router.push,
      });

      if (success) {
        form.reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Field
        name="password"
        label="Password"
        type="password"
        placeholder="Enter password"
        rules={[{ required: true, message: 'Password is required' }, { password: true }]}
      />

      <Field
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        rules={[
          { required: true, message: 'Confirm password is required' },
          {
            validate: (value) => value === form.getValues('password'),
            message: 'Passwords must match!',
          },
        ]}
      />

      <div className="pt-2">
        <Button loading={isLoading} type="submit" fullWidth>
          Reset Password
        </Button>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;
