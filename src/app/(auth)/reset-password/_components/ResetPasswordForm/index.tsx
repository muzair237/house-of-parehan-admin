'use client';

import React from 'react';

import { PasswordFormValues } from '@/domains/admin/types';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';

const ResetPasswordForm = () => {
  const form = useForm<PasswordFormValues>();

  const onSubmit = () => {};

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
            message: 'Password must match!',
          },
        ]}
      />

      <div className="pt-2">
        <Button type="submit" fullWidth>
          Send OTP
        </Button>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;
