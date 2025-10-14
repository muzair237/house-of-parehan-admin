'use client';

import React, { useEffect } from 'react';

import { AdminPayload } from '@/domains/admin/types';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';
import roleThunk from '@/slices/role/thunk';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';
import Grid from '@/components/shared/Grid';

interface AdminFormProps {
  row?: Partial<AdminPayload> & { _id?: string };
  isLoading: boolean;
  onSubmit: (values: AdminPayload) => void | Promise<void>;
}

const AdminForm: React.FC<AdminFormProps> = ({ row, isLoading, onSubmit }) => {
  const dispatch = useAppDispatch();
  const { uniqueRoles } = useAppSelector((state) => state.Role);

  const form = useForm<AdminPayload>({
    defaultValues: row
      ? {
          ...row,
          roles: (row.roles as unknown[])?.map((r) => (r as { _id?: string })._id ?? ''),
        }
      : undefined,
  });

  useEffect(() => {
    dispatch(roleThunk.fetchUniqueRoles());
  }, [dispatch]);

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Grid cols={2}>
        <Field
          name="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter full name"
          rules={[
            { required: true, message: 'Full name is required' },
            { minLength: 2, message: 'Full name must be at least 2 characters' },
            { maxLength: 50, message: 'Full name must be at most 50 characters' },
          ]}
        />

        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="someone@example.com"
          rules={[{ email: true }, { required: true, message: 'Email is required' }]}
        />
      </Grid>

      <Grid cols={1}>
        <Field
          name="roles"
          label="Roles"
          type="select"
          isMulti
          placeholder="Select Roles"
          options={uniqueRoles}
          maxVisibleTags={3}
          rules={[
            {
              validate: (selected) => {
                const hasSelection = Array.isArray(selected) && selected.length > 0;
                return hasSelection || 'At least one Role is required';
              },
            },
          ]}
        />
      </Grid>

      <Grid cols={2}>
        {!row && (
          <Field
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            rules={[{ required: true, message: 'Password is required' }, { password: true }]}
          />
        )}
      </Grid>

      <div className="mt-4 flex justify-end">
        <Button type="submit" loading={isLoading}>
          {row?._id ? 'Update' : 'Create'}
        </Button>
      </div>
    </Form>
  );
};

export default AdminForm;
