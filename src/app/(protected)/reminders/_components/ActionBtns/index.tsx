'use client';

import React, { useState } from 'react';

// import ReminderForm from '@/app/(protected)/installments/_components/ReminderForm';
import { ReminderData, ReminderPayload, ReminderStatus } from '@/domains/reminder/types';
import { useAppDispatch } from '@/slices/hooks';
import reminderThunk from '@/slices/reminder/thunk';

import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import AppIcon from '@/components/shared/Icon';
import ModalContainer from '@/components/shared/ModalContainer';
import RecordInfo from '@/components/shared/Modals/RecordInfoModal';
import Tooltip from '@/components/shared/Tooltip';

import {
  excludeFields,
  handleApiCall,
  hasPermission,
  normalCase,
  parseDate,
} from '@/lib/utils/helper';
import { Permissions } from '@/lib/utils/permissions';
import { Option } from '@/lib/utils/types';

interface ReminderActionBtnsProps {
  row: ReminderData;
  refetch: () => Promise<void>;
}

const ReminderActionBtns: React.FC<ReminderActionBtnsProps> = ({ row, refetch }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const preparedData: Option[] = [
    { label: 'Due Date', value: parseDate(row.dueDate) },
    { label: 'Description', value: row.description },
    {
      label: 'Status',
      value: (
        <Badge
          type={
            row.status === ReminderStatus.SET
              ? 'active'
              : row.status === ReminderStatus.COMPLETED
                ? 'info'
                : 'error'
          }
          rounded="full"
          size="sm"
        >
          {normalCase(ReminderStatus[row.status])}
        </Badge>
      ),
    },
    { label: 'Created At', value: parseDate(row.createdAt) },
  ];

  const handleUpdate = async (values: Partial<ReminderPayload>, close: () => void) => {
    setIsLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, reminderThunk.updateReminder, {
        id: row._id,
        payload: values,
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
      const { success } = await handleApiCall(dispatch, reminderThunk.deleteReminder, row._id);
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
        title="Reminder Record Information"
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

      {/* {hasPermission(Permissions.UPDATE_REMINDER) && (
        <ModalContainer
          title="Update Reminder"
          closeButton={false}
          closeOnOutsideClick={false}
          content={(close) => (
            <ReminderForm
              row={excludeFields(row, ['createdAt', '_id'])}
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
      )} */}

      {hasPermission(Permissions.DELETE_REMINDER) && (
        <ModalContainer
          title="Delete Reminder"
          description="Are you absolutely sure you want to delete this reminder? This action cannot be undone."
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

export default ReminderActionBtns;
