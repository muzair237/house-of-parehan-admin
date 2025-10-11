'use client';

import React from 'react';

import { TransactionData, TransactionStatus } from '@/domains/transaction/types';

import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import AppIcon from '@/components/shared/Icon';
import ModalContainer from '@/components/shared/ModalContainer';
import RecordInfo from '@/components/shared/Modals/RecordInfoModal';
import Tooltip from '@/components/shared/Tooltip';

import {
  formatCurrency,
  normalCase,
  parseDate,
} from '@/lib/utils/helper';
import { Option } from '@/lib/utils/types';

interface TransactionActionBtnsProps {
  row: TransactionData;
}

const TransactionActionBtns: React.FC<TransactionActionBtnsProps> = ({ row }) => {
  const preparedData: Option[] = [
    { label: 'Amount', value: formatCurrency(row.amount) },
    { label: 'Paid At', value: parseDate(row.paidAt) },
    {
      label: 'Status',
      value: (
        <Badge
          type={row.status === TransactionStatus.PAID ? 'info' : 'pending'}
          rounded="full"
          size="sm"
        >
          {normalCase(TransactionStatus[row.status])}
        </Badge>
      ),
    },
    { label: 'Created At', value: parseDate(row.createdAt) },
  ];

  return (
    <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
      <ModalContainer
        title="Transaction Record Information"
        content={() => <RecordInfo cols={3} data={preparedData} />}
      >
        {(open) => (
          <Tooltip label="Information">
            <Button onClick={open} minimal>
              <AppIcon name="Info" />
            </Button>
          </Tooltip>
        )}
      </ModalContainer>
    </div>
  );
};

export default TransactionActionBtns;
