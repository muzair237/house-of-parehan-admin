'use client';

import React, { useState } from 'react';

import adminThunk from '@/slices/admin/thunk';
import { useAppDispatch } from '@/slices/hooks';
import permissionThunk from '@/slices/permission/thunk';
import productThunk from '@/slices/product/thunk';
import reminderThunk from '@/slices/reminder/thunk';
import roleThunk from '@/slices/role/thunk';
import transactionThunk from '@/slices/transaction/thunk';

import Button from '@/components/shared/Button';
import ModalContainer from '@/components/shared/ModalContainer';

import { handleApiCall, hasPermission } from '@/lib/utils/helper';
import { Permissions } from '@/lib/utils/permissions';

import AdminForm from '../../admins/_components/adminForm';
import PermissionForm from '../../permissions/_components/PermissionForm';
import ProductForm from '../../products/_components/ProductForm';
import ReminderForm from '../../reminders/_components/ReminderForm';
import RoleForm from '../../roles/_components/roleForm';
import TransactionForm from '../../transactions/_components/TransactionForm';

type Props = {
  entity: string;
  refetch: () => void;
};

type EntityFormProps = {
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => void;
};

const entityMap: Record<
  string,
  {
    title: string;
    FormComponent: React.ComponentType<EntityFormProps>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thunk: (payload: any) => any;
    modalSize?: 'xs' | 'sm' | 'md' | 'lg' | '2xl' | '4xl';
    permission: string; // add required permission here
  }
> = {
  permission: {
    title: 'Create Permission',
    FormComponent: PermissionForm,
    thunk: permissionThunk.createPermission,
    permission: Permissions.CREATE_PERMISSION,
  },
  role: {
    title: 'Create Role',
    FormComponent: RoleForm,
    thunk: roleThunk.createRole,
    permission: Permissions.CREATE_ROLE,
  },
  admin: {
    title: 'Create Admin',
    FormComponent: AdminForm,
    thunk: adminThunk.createAdmin,
    permission: Permissions.CREATE_ADMIN,
  },
  product: {
    title: 'Create Product',
    FormComponent: ProductForm,
    thunk: productThunk.createProduct,
    permission: Permissions.CREATE_PRODUCT,
    modalSize: 'md',
  },
  transaction: {
    title: 'Create Transaction',
    FormComponent: TransactionForm,
    thunk: transactionThunk.createTransaction,
    permission: Permissions.CREATE_TRANSACTION,
    modalSize: 'md',
  },
  reminder: {
    title: 'Create Reminder',
    FormComponent: ReminderForm,
    thunk: reminderThunk.createReminder,
    permission: Permissions.CREATE_REMINDER,
  },
};

const CreateEntityButton = ({ entity, refetch }: Props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const config = entityMap[entity];

  if (!config) return null;

  const { FormComponent, title, thunk, permission } = config;

  if (!hasPermission(permission)) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (values: any, close: () => void) => {
    setIsLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, thunk, values);
      if (success) {
        close();
        refetch?.();
      }
    } catch (error) {
      console.error(`Failed to KW ${entity}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer
      title={title}
      size={config.modalSize}
      closeButton={false}
      closeOnOutsideClick={false}
      content={(close) => (
        <FormComponent isLoading={isLoading} onSubmit={(values) => handleCreate(values, close)} />
      )}
    >
      {(open) => <Button onClick={open}>{title}</Button>}
    </ModalContainer>
  );
};

export default CreateEntityButton;
