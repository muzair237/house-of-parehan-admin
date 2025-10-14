'use client';

import React, { useState } from 'react';

import { AdminData, AdminPayload, PasswordFormValues } from '@/domains/admin/types';
import adminThunk from '@/slices/admin/thunk';
import { useAppDispatch } from '@/slices/hooks';

import Button from '@/components/shared/Button';
import AppIcon from '@/components/shared/Icon';
import ModalContainer from '@/components/shared/ModalContainer';
import RecordInfo from '@/components/shared/Modals/RecordInfoModal';
import Tooltip from '@/components/shared/Tooltip';

import { handleApiCall, hasPermission, parseDate } from '@/lib/utils/helper';
import { Permissions } from '@/lib/utils/permissions';
import { Option } from '@/lib/utils/types';

import PasswordForm from '../PasswordForm';
import AdminForm from '../adminForm';

interface AdminActionBtnsProps {
  row: AdminData;
  refetch: () => Promise<void>;
}

const AdminActionBtns: React.FC<AdminActionBtnsProps> = ({ row, refetch }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (
    values: Partial<AdminPayload> | PasswordFormValues,
    close: () => void
  ) => {
    setIsLoading(true);
    try {
      let payload;

      const isPasswordUpdate = 'password' in values && 'confirmPassword' in values;

      if (isPasswordUpdate) {
        payload = {
          password: values.password,
        };
      } else {
        payload = {
          fullName: values.fullName,
          email: values.email,
          roles: values.roles,
        };
      }

      const { success } = await handleApiCall(dispatch, adminThunk.updateAdmin, {
        id: row._id,
        payload,
      });

      if (success) {
        close();
        refetch();
      }
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (close: () => void) => {
    setIsLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, adminThunk.deleteAdmin, row._id);
      if (success) {
        close();
        refetch();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForceLogout = async (close: () => void) => {
    setIsLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, adminThunk.forceLogout, row._id);
      if (success) {
        close();
        refetch();
      }
    } catch (error) {
      console.error('Force logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const preparedData: Option[] = [
    { label: 'Full Name', value: row.fullName },
    { label: 'Email', value: row.email },
    {
      label: 'Roles',
      value: row.roles.map((role) => (typeof role === 'string' ? role : role.type)),
    },
    { label: 'Created At', value: parseDate(row.createdAt) },
  ];

  return (
    <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
      <ModalContainer
        title="Admin Record Information"
        content={() => <RecordInfo data={preparedData} />}
      >
        {(open) => (
          <Tooltip label="Information">
            <Button onClick={open} minimal>
              <AppIcon name="Info" />
            </Button>
          </Tooltip>
        )}
      </ModalContainer>

      {hasPermission(Permissions.UPDATE_ADMIN_PASSWORD) && (
        <ModalContainer
          title="Update Password"
          closeButton={false}
          closeOnOutsideClick={false}
          content={() => (
            <PasswordForm
              isLoading={isLoading}
              onSubmit={(values) => handleUpdate(values, close)}
            />
          )}
        >
          {(open) => (
            <Tooltip label="Update Password">
              <Button onClick={open} minimal>
                <AppIcon name="RotateCcwKey" />
              </Button>
            </Tooltip>
          )}
        </ModalContainer>
      )}

      {hasPermission(Permissions.FORCE_LOGOUT_ADMIN) && (
        <ModalContainer
          title="Force Logout Admin"
          description="Are you absolutely sure you want to Force Logout this admin? This action cannot be undone."
          submitButton={{
            label: 'Force Logout',
            variant: 'destructive',
            loading: isLoading,
            onClick: async (close) => {
              try {
                await handleForceLogout(close);
              } catch (e) {
                console.error(e);
              }
            },
          }}
        >
          {(open) => (
            <Tooltip label="Force Logout">
              <Button onClick={open} minimal>
                <AppIcon name="LogOut" />
              </Button>
            </Tooltip>
          )}
        </ModalContainer>
      )}

      {hasPermission(Permissions.UPDATE_ADMIN) && (
        <ModalContainer
          title="Update Admin"
          closeButton={false}
          closeOnOutsideClick={false}
          content={(close) => (
            <AdminForm
              row={row}
              isLoading={isLoading}
              onSubmit={(values) => handleUpdate(values, close)}
            />
          )}
        >
          {(open) => (
            <Tooltip label="Update">
              <Button onClick={open} minimal>
                <AppIcon name="Pencil" />
              </Button>
            </Tooltip>
          )}
        </ModalContainer>
      )}

      {hasPermission(Permissions.DELETE_ADMIN) && (
        <ModalContainer
          title="Delete Admin"
          description="Are you absolutely sure you want to delete this admin? This action cannot be undone."
          submitButton={{
            label: 'Delete',
            variant: 'destructive',
            loading: isLoading,
            onClick: async (close) => {
              try {
                await handleDelete(close);
              } catch (e) {
                console.error(e);
              }
            },
          }}
        >
          {(open) => (
            <Tooltip label="Delete">
              <Button onClick={open} minimal>
                <AppIcon name="Trash" />
              </Button>
            </Tooltip>
          )}
        </ModalContainer>
      )}
    </div>
  );
};

export default AdminActionBtns;
