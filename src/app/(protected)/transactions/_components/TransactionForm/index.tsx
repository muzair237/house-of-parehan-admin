'use client';

import React, { useState } from 'react';

import {
  TransactionData,
  TransactionPayload,
  TransactionStatus,
} from '@/domains/transaction/types';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';
import Grid from '@/components/shared/Grid';

import { enumToOptions } from '@/lib/utils/helper';

interface TransactionFormProps {
  row?: Partial<TransactionData>;
  isLoading: boolean;
  onSubmit: (values: TransactionPayload) => void | Promise<void>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ row, isLoading, onSubmit }) => {
  const form = useForm<TransactionPayload>();

  const handleSubmit = (values: TransactionPayload) => {
    const data = {
      ...values,
      amount: Number(values.amount),
      status: Number(values.status),
      paidAt: values.paidAt ? new Date(values.paidAt).toISOString() : undefined,
    };

    onSubmit(data);
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <Grid cols={2}>
        <Field
          name="amount"
          label="Amount"
          type="number"
          placeholder="500"
          rules={[
            { required: true, message: 'Amount is required' },
            { minLength: 1, message: 'Amount must be greater than 0' },
          ]}
        />

        <Field
          name="status"
          label="Status"
          type="select"
          options={enumToOptions(TransactionStatus)}
          placeholder="Select status"
          rules={[{ required: true, message: 'Status is required' }]}
        />

        <Field name="paidAt" label="Paid At" type="date" />
      </Grid>

      <Grid cols={1}>
        <Field
          name="note"
          label="Note"
          type="textarea"
          placeholder="Optional note about this transaction"
          rules={[{ maxLength: 500, message: 'Note cannot exceed 500 characters' }]}
        />
      </Grid>

      <div className="mt-4 flex justify-end">
        <Button type="submit" loading={isLoading}>
          {row ? 'Update' : 'Create'}
        </Button>
      </div>
    </Form>
  );
};

export default TransactionForm;
