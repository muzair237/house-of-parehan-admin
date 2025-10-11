'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { RolePayload } from '@/domains/role/types';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';
import permissionThunk from '@/slices/permission/thunk';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';
import Grid from '@/components/shared/Grid';
import ModalContainer from '@/components/shared/ModalContainer';

import CustomizePermissions from '../CustomizePermissions';

interface RoleFormProps {
  row?: RolePayload & { _id?: string };
  isLoading: boolean;
  onSubmit: (values: RolePayload) => void | Promise<void>;
}

const RoleForm: React.FC<RoleFormProps> = ({ row, isLoading, onSubmit }) => {
  const dispatch = useAppDispatch();
  const { permissionsForRoles } = useAppSelector((state) => state.Permission);

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const form = useForm<RolePayload>({
    defaultValues: row,
  });

  useEffect(() => {
    dispatch(permissionThunk.fetchPermissions());
  }, [dispatch]);

  useEffect(() => {
    if (row?.permissions) {
      setSelectedPermissions(row.permissions.map((p) => (typeof p === 'string' ? p : p.can)));
    }
  }, [row]);

  const tabs = useMemo(
    () =>
      permissionsForRoles
        ?.filter((ele) => ele?.parents?.includes('$'))
        ?.map(({ route }) => {
          let label = route?.split('.')[0]?.replace(/^\//, '');
          label = label?.charAt(0)?.toUpperCase() + label?.slice(1)?.toLowerCase();

          return {
            label,
            value: label?.toLowerCase(),
          };
        }),
    [permissionsForRoles]
  );

  return (
    <Form
      form={form}
      onSubmit={(values) => {
        onSubmit({
          ...values,
          permissions: selectedPermissions
            ?.map((select) => permissionsForRoles?.find((item) => item.can === select)?._id)
            .filter((id): id is string => Boolean(id)),
        });
      }}
    >
      <Grid cols={2}>
        <Field
          name="type"
          label="Role Type"
          type="text"
          placeholder="MANAGER"
          rules={[
            { required: true, message: 'Type is required' },
            {
              pattern: /^[A-Z]+(?:_[A-Z]+)*$/,
              message:
                'Type must be in uppercase letters and words must be separated by underscores (e.g., SUPER_ADMIN)',
            },
          ]}
        />

        <Field
          name="description"
          label="Description"
          type="text"
          placeholder="Description for MANAGER"
          rules={[
            { required: true, message: 'Description is required' },
            { minLength: 5, message: 'Description must be at least 5 characters' },
            { maxLength: 200, message: 'Description must be at most 200 characters' },
          ]}
        />
      </Grid>

      <ModalContainer
        title="Customize Permissions"
        size="4xl"
        closeButton={false}
        closeOnOutsideClick={false}
        content={(close) => (
          <CustomizePermissions
            permissions={permissionsForRoles}
            tabs={tabs}
            selected={selectedPermissions}
            setPermissions={setSelectedPermissions}
            closeMe={close}
          />
        )}
      >
        {(open) => (
          <div className="flex justify-end">
            <Button onClick={open} type="button">
              Customize Permissions
            </Button>
          </div>
        )}
      </ModalContainer>

      <div className="mt-4 flex justify-end">
        <Button type="submit" loading={isLoading} disabled={!selectedPermissions.length}>
          {row?._id ? 'Update' : 'Create'}
        </Button>
      </div>
    </Form>
  );
};

export default RoleForm;
