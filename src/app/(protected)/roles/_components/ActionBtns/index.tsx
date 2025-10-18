'use client';

import React, { useState } from 'react';

import { RoleData, RolePayload } from '@/domains/role/types';
import { useAppDispatch } from '@/slices/hooks';
import roleThunk from '@/slices/role/thunk';

import Button from '@/components/shared/Button';
import AppIcon from '@/components/shared/Icon';
import ModalContainer from '@/components/shared/ModalContainer';
import RecordInfo from '@/components/shared/Modals/RecordInfoModal';
import Tooltip from '@/components/shared/Tooltip';

import { handleApiCall, hasPermission, parseDate } from '@/lib/utils/helper';
import { Permissions } from '@/lib/utils/permissions';
import { Option } from '@/lib/utils/types';

import RoleForm from '../roleForm';

interface RoleActionBtnsProps {
  row: RoleData;
  refetch: () => Promise<void>;
}

const RoleActionBtns: React.FC<RoleActionBtnsProps> = ({ row, refetch }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (values: RolePayload, close: () => void) => {
    setIsLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, roleThunk.updateRole, {
        id: row._id,
        payload: {
          type: values.type,
          description: values.description,
          permissions: values.permissions,
        },
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
      const { success } = await handleApiCall(dispatch, roleThunk.deleteRole, row._id);
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

  const preparedData: Option[] = [
    { label: 'Type', value: row.type },
    { label: 'Description', value: row.description },
    {
      label: 'Permissions',
      value: row.permissions.map((permission) =>
        typeof permission === 'string' ? permission : permission.can
      ),
    },

    { label: 'Created At', value: parseDate(row.createdAt) },
  ];

  const isDefaultRole = row.type === 'SUPER_ADMIN';

  return (
    <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
      <ModalContainer
        title="Role Record Information"
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

      {hasPermission(Permissions.UPDATE_ROLE) && (
        <ModalContainer
          title="Update Role"
          closeButton={false}
          closeOnOutsideClick={false}
          content={(close) => (
            <RoleForm
              row={row}
              isLoading={isLoading}
              onSubmit={(values) => handleUpdate(values, close)}
            />
          )}
        >
          {(open) => (
            <Tooltip label="Update">
              <Button onClick={open} disabled={isDefaultRole} minimal>
                <AppIcon name="Pencil" />
              </Button>
            </Tooltip>
          )}
        </ModalContainer>
      )}

      {hasPermission(Permissions.DELETE_ROLE) && (
        <ModalContainer
          title="Delete Role"
          description="Are you absolutely sure you want to delete this role? This action cannot be undone."
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
              <Button onClick={open} disabled={isDefaultRole} minimal>
                <AppIcon name="Trash" />
              </Button>
            </Tooltip>
          )}
        </ModalContainer>
      )}
    </div>
  );
};

export default RoleActionBtns;
