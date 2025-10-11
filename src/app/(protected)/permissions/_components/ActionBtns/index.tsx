'use client';

import React, { useState } from 'react';

import { PermissionData, PermissionPayload } from '@/domains/permission/types';
import { useAppDispatch } from '@/slices/hooks';
import permissionThunk from '@/slices/permission/thunk';

import Button from '@/components/shared/Button';
import AppIcon from '@/components/shared/Icon';
import ModalContainer from '@/components/shared/ModalContainer';
import RecordInfo from '@/components/shared/Modals/RecordInfoModal';
import Tooltip from '@/components/shared/Tooltip';

import { handleApiCall, hasPermission, parseDate } from '@/lib/utils/helper';
import { Permissions } from '@/lib/utils/permissions';
import { Option } from '@/lib/utils/types';

import PermissionForm from '../PermissionForm';

interface PermissionActionBtnsProps {
  row: PermissionData;
  refetch: () => Promise<void>;
}
const PermissionActionBtns: React.FC<PermissionActionBtnsProps> = ({ row, refetch }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const preparedData: Option[] = [
    { label: 'Route', value: row.route },
    { label: 'Can', value: row.can },
    { label: 'Description', value: row.description },
    { label: 'Parents', value: row.parents },

    { label: 'Created At', value: parseDate(row.createdAt) },
  ];

  const handleUpdate = async (values: PermissionPayload, close: () => void) => {
    setIsLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, permissionThunk.updatePermission, {
        id: row._id,
        payload: {
          can: values.can,
          route: values.route,
          description: values.description,
          parents: values.parents,
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
      const { success } = await handleApiCall(dispatch, permissionThunk.deletePermission, row._id);
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

  return (
    <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
      <ModalContainer
        title="Permission Record Information"
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

      {hasPermission(Permissions.UPDATE_PERMISSION) && (
        <ModalContainer
          title="Update Permission"
          closeButton={false}
          closeOnOutsideClick={false}
          content={(close) => (
            <PermissionForm
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

      {hasPermission(Permissions.DELETE_PERMISSION) && (
        <ModalContainer
          title="Delete Permission"
          description="Are you absolutely sure you want to delete this permission? This action cannot be undone."
          submitButton={{
            label: 'Delete',
            variant: 'destructive',
            loading: isLoading,
            onClick: async (close) => {
              try {
                handleDelete(close);
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

export default PermissionActionBtns;
