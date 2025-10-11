'use client';

import React, { useState } from 'react';

import { useAppDispatch } from '@/slices/hooks';
import permissionThunk from '@/slices/permission/thunk';
import roleThunk from '@/slices/role/thunk';
import transactionThunk from '@/slices/transaction/thunk';
import userThunk from '@/slices/user/thunk';

import Button from '@/components/shared/Button';
import ModalContainer from '@/components/shared/ModalContainer';

import { handleApiCall, hasPermission } from '@/lib/utils/helper';
import { Permissions } from '@/lib/utils/permissions';

// import ReminderForm from '../../installments/_components/ReminderForm';
import PermissionForm from '../../permissions/_components/PermissionForm';
import RoleForm from '../../roles/_components/roleForm';
import TransactionForm from '../../transactions/_components/TransactionForm';
import UserForm from '../../users/_components/userForm';
import ProductForm from '../../products/_components/ProductForm';
import productThunk from '@/slices/product/thunk';

type Props = {
  entity: string;
  refetch: () => void;
};

// Define form props type
type EntityFormProps = {
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => void;
};

// Map of entity names to components and metadata
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
  user: {
    title: 'Create User',
    FormComponent: UserForm,
    thunk: userThunk.createUser,
    permission: Permissions.CREATE_USER,
  },
  product: {
    title: 'Create Product',
    FormComponent: ProductForm,
    thunk: productThunk.createProduct,
    permission: Permissions.CREATE_PRODUCT,
    modalSize: 'md'
  },
  transaction: {
    title: 'Create Transaction',
    FormComponent: TransactionForm,
    thunk: transactionThunk.createTransaction,
    permission: Permissions.CREATE_TRANSACTION,
  },
  // reminder: {
  //   title: 'Create Reminder',
  //   FormComponent: ReminderForm,
  //   thunk: reminderThunk.createReminder,
  //   permission: Permissions.CREATE_REMINDER,
  // },
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
