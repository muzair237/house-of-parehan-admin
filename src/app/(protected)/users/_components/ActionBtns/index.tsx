'use client';

import React, { useState } from 'react';

import { PasswordFormValues, UserData, UserPayload } from '@/domains/user/types';
import { useAppDispatch } from '@/slices/hooks';
import userThunk from '@/slices/user/thunk';

import Button from '@/components/shared/Button';
import AppIcon from '@/components/shared/Icon';
import ModalContainer from '@/components/shared/ModalContainer';
import RecordInfo from '@/components/shared/Modals/RecordInfoModal';
import Tooltip from '@/components/shared/Tooltip';

import { handleApiCall, hasPermission, parseDate } from '@/lib/utils/helper';
import { Permissions } from '@/lib/utils/permissions';
import { Option } from '@/lib/utils/types';

import PasswordForm from '../PasswordForm';
import UserForm from '../userForm';

interface UserActionBtnsProps {
  row: UserData;
  refetch: () => Promise<void>;
}

const UserActionBtns: React.FC<UserActionBtnsProps> = ({ row, refetch }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (
    values: Partial<UserPayload> | PasswordFormValues,
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
          mobile: values.mobile,
          roles: values.roles,
          accountExpiryDate: values.accountExpiryDate,
        };
      }

      const { success } = await handleApiCall(dispatch, userThunk.updateUser, {
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
      const { success } = await handleApiCall(dispatch, userThunk.deleteUser, row._id);
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
      const { success } = await handleApiCall(dispatch, userThunk.forceLogout, row._id);
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
    { label: 'Email', value: row.mobile },
    {
      label: 'Roles',
      value: row.roles.map((role) => (typeof role === 'string' ? role : role.type)),
    },

    {
      label: 'Account Expiry Date',
      value: row.accountExpiryDate ? parseDate(row.accountExpiryDate) : '-',
    },

    { label: 'Created At', value: parseDate(row.createdAt) },
  ];

  return (
    <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
      <ModalContainer
        title="User Record Information"
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

      {hasPermission(Permissions.UPDATE_USER_PASSWORD) && (
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

      {hasPermission(Permissions.FORCE_LOGOUT_USER) && (
        <ModalContainer
          title="Force Logout User"
          description="Are you absolutely sure you want to Force Logout this user? This action cannot be undone."
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

      {hasPermission(Permissions.UPDATE_USER) && (
        <ModalContainer
          title="Update User"
          closeButton={false}
          closeOnOutsideClick={false}
          content={(close) => (
            <UserForm
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

      {hasPermission(Permissions.DELETE_USER) && (
        <ModalContainer
          title="Delete User"
          description="Are you absolutely sure you want to delete this user? This action cannot be undone."
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

export default UserActionBtns;
