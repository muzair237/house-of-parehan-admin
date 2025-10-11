'use client';

import React, { useEffect } from 'react';

import { PermissionData, PermissionPayload } from '@/domains/permission/types';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';
import permissionThunk from '@/slices/permission/thunk';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';
import Grid from '@/components/shared/Grid';

import { dotNotation, leadingSlash } from '@/lib/utils/regex';

interface PermissionFormProps {
  row?: PermissionData;

  isLoading: boolean;
  onSubmit: (values: PermissionPayload) => void | Promise<void>;
}

const PermissionForm: React.FC<PermissionFormProps> = ({ row, isLoading, onSubmit }) => {
  const dispatch = useAppDispatch();
  const { parents } = useAppSelector((state) => state.Permission);
  const form = useForm<PermissionPayload>({ defaultValues: row });

  useEffect(() => {
    dispatch(permissionThunk.fetchParentsOptions());
  }, [dispatch]);

  return (
    <>
      <Form form={form} onSubmit={onSubmit}>
        <Grid cols={2}>
          <Field
            name="can"
            label="Can"
            type="text"
            placeholder="example.nav"
            rules={[
              { required: true, message: 'Can is required' },
              {
                pattern: dotNotation,
                message: 'Can must follow the format resource.action (e.g., admins.create)',
              },
            ]}
          />
          <Field
            name="route"
            label="Route"
            type="text"
            placeholder="/example"
            rules={[
              { required: true, message: 'Route is required' },
              {
                pattern: leadingSlash,
                message: 'Route must start with a slash (/)',
              },
            ]}
          />
        </Grid>
        <Grid cols={1}>
          <Field
            name="description"
            label="Description"
            type="text"
            placeholder="example.nav"
            rules={[
              { required: true, message: 'Description is required' },
              { minLength: 5, message: 'Description must be at least 5 characters' },
              { maxLength: 200, message: 'Description must be at most 200 characters' },
            ]}
          />
          <Field
            name="parents"
            label="Parents"
            type="select"
            isMulti
            placeholder="Select Parents"
            options={parents}
            maxVisibleTags={3}
            rules={[
              { required: true, message: 'At least one Parent is required' },
              {
                validate: (value) => {
                  return value.includes('$') && value.some((v: string) => v !== '$') ? false : true;
                },
                message: 'Invalid parents: "$" cannot be combined with other values',
              },
            ]}
          />
        </Grid>

        <div className="mt-4 flex justify-end">
          <Button type="submit" loading={isLoading}>
            {row?._id ? 'Update' : 'Create'}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PermissionForm;
