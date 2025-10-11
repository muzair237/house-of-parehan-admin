'use client';

import React, { useState } from 'react';

import { EnquiryData } from '@/domains/enquiry/types';
import enquiryThunk from '@/slices/enquiry/thunk';
import { useAppDispatch } from '@/slices/hooks';

import Button from '@/components/shared/Button';
import AppIcon from '@/components/shared/Icon';
import ModalContainer from '@/components/shared/ModalContainer';
import RecordInfo from '@/components/shared/Modals/RecordInfoModal';
import Tooltip from '@/components/shared/Tooltip';

import { handleApiCall, parseDate } from '@/lib/utils/helper';
import { Option } from '@/lib/utils/types';

interface EnquiryActionBtnsProps {
  row: EnquiryData;
  refetch: () => Promise<void>;
}
const EnquiryActionBtns: React.FC<EnquiryActionBtnsProps> = ({ row, refetch }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setisLoading] = useState(false);

  const handleDelete = async (close: () => void) => {
    setisLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, enquiryThunk.deleteEnquiry, row._id);
      if (success) {
        close();
        refetch();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setisLoading(false);
    }
  };

  const preparedData: Option[] = [
    { label: 'Name', value: row.name },
    { label: 'Email', value: row.email },
    { label: 'Message', value: row.message },
    { label: 'Created At', value: parseDate(row.createdAt) },
  ];

  return (
    <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
      <ModalContainer
        title="Enquiry Record Information"
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

      <ModalContainer
        title="Delete Enquiry"
        description="Are you absolutely sure you want to delete this enquiry? This action cannot be undone."
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
    </div>
  );
};

export default EnquiryActionBtns;
