'use client';

import React, { useState } from 'react';

import { Categories } from '@/domains/product/types';
import { TransactionData, TransactionStatus } from '@/domains/transaction/types';
import { useAppDispatch } from '@/slices/hooks';
import transactionThunk from '@/slices/transaction/thunk';

import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import AppIcon from '@/components/shared/Icon';
import ModalContainer from '@/components/shared/ModalContainer';
import RecordInfo from '@/components/shared/Modals/RecordInfoModal';
import Tooltip from '@/components/shared/Tooltip';

import {
  formatCurrency,
  handleApiCall,
  hasPermission,
  normalCase,
  parseDate,
} from '@/lib/utils/helper';
import { Permissions } from '@/lib/utils/permissions';
import { Option } from '@/lib/utils/types';

interface TransactionActionBtnsProps {
  row: TransactionData;
  refetch?: () => void;
}

const TransactionActionBtns: React.FC<TransactionActionBtnsProps> = ({ row, refetch }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkAsPaid = async (close?: () => void) => {
    if (row.status === TransactionStatus.PAID) return;

    setIsLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, transactionThunk.markAsPaid, {
        _id: row._id,
      });

      if (success) {
        close?.();
        refetch?.();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const preparedData: Option[] = [
    { label: 'Total Amount', value: formatCurrency(row.totalAmount) },
    { label: 'Paid At', value: row.paidAt ? parseDate(row.paidAt) : '-' },
    { label: 'Note', value: row.note ?? '-' },
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

  if (row.products?.length) {
    const totalBill = row.products.reduce((sum, p) => sum + p.priceAtSale * p.quantity, 0);

    preparedData.push({
      label: 'Products',
      value: (
        <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-3 text-sm">
          <div className="space-y-2">
            {row.products.map((p) => {
              const product =
                typeof p.product === 'object' && p.product !== null ? p.product : null;

              return (
                <div
                  key={p._id}
                  className="flex flex-col sm:flex-row sm:justify-between border-b border-dashed border-[var(--border)] last:border-none pb-2 last:pb-0"
                >
                  <div>
                    <span className="font-medium">
                      {product ? product.name : 'Unknown Product'}
                    </span>

                    {product && (
                      <div className="text-[var(--muted-foreground)] text-xs">
                        Category: {normalCase(Categories[product.category] ?? product.category)}
                      </div>
                    )}
                  </div>

                  <div className="text-right mt-1 sm:mt-0">
                    <div>
                      {p.quantity} × {formatCurrency(p.priceAtSale)}
                    </div>
                    <div className="font-semibold">
                      = {formatCurrency(p.quantity * p.priceAtSale)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[var(--border)] mt-3 pt-2 flex justify-between font-semibold">
            <span>Total Bill</span>
            <span>{formatCurrency(totalBill)}</span>
          </div>
        </div>
      ),
    });
  }

  return (
    <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
      <ModalContainer
        title="Transaction Record Information"
        size="2xl"
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

      {hasPermission(Permissions.MARK_TRANSACTION_AS_PAID) &&
        row.status !== TransactionStatus.PAID && (
          <ModalContainer
            title="Mark Transaction as Paid"
            description="Are you sure you want to mark this transaction as paid?"
            submitButton={{
              label: 'Mark as Paid',
              variant: 'success',
              loading: isLoading,
              onClick: (close) => handleMarkAsPaid(close),
            }}
          >
            {(open) => (
              <Tooltip label="Mark as Paid">
                <Button onClick={open} minimal>
                  <AppIcon name="Check" className="mr-1" />
                </Button>
              </Tooltip>
            )}
          </ModalContainer>
        )}
    </div>
  );
};

export default TransactionActionBtns;
