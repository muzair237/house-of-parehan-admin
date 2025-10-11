'use client';

import React from 'react';

import { PasswordFormValues } from '@/domains/user/types';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';

interface PasswordFormProps {
  isLoading: boolean;
  onSubmit: (values: PasswordFormValues) => void | Promise<void>;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ isLoading, onSubmit }) => {
  const form = useForm<PasswordFormValues>();

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

      <div className="mt-4 flex justify-end">
        <Button type="submit" loading={isLoading}>
          Update
        </Button>
      </div>
    </Form>
  );
};

export default PasswordForm;
