'use client';

import React from 'react';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';

import { positiveNumberRegex, positiveNumberRegexWithoutDecimal } from '@/lib/utils/regex';

interface StockFormValues {
  quantity: number;
}

interface StockFormProps {
  currentStock: number;
  isLoading: boolean;
  onSubmit: (values: StockFormValues) => void | Promise<void>;
}

const StockForm: React.FC<StockFormProps> = ({ currentStock, isLoading, onSubmit }) => {
  const form = useForm<StockFormValues>({
    defaultValues: {
      quantity: 1,
    },
  });

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="mb-4 text-sm text-[var(--muted-foreground)]">
        Current Stock: <span className="font-medium">{currentStock}</span>
      </div>

      <Field
        name="quantity"
        label="Quantity to Add"
        type="number"
        min={1}
        placeholder="Enter quantity"
        rules={[
          { required: true, message: 'Quantity is required' },
          {
            pattern: positiveNumberRegexWithoutDecimal,
            message: 'Please enter a valid positive number.',
          },
        ]}
      />

      <div className="mt-4 flex justify-end">
        <Button type="submit" loading={isLoading}>
          Update Stock
        </Button>
      </div>
    </Form>
  );
};

export default StockForm;
