'use client';

import React from 'react';

import { ReminderData, ReminderPayload } from '@/domains/reminder/types';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';
import Grid from '@/components/shared/Grid';

interface ReminderFormProps {
  row?: Partial<ReminderData>;
  isLoading: boolean;
  onSubmit: (values: ReminderPayload) => void | Promise<void>;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ row, isLoading, onSubmit }) => {
  const form = useForm<ReminderPayload>({
    defaultValues: {
      ...(row && {
        dueDate: row.dueDate ? new Date(row.dueDate) : undefined,
        description: row.description,
        status: row.status,
      }),
    },
  });

  const handleSubmit = (values: Partial<ReminderPayload>) => {
    const payload: ReminderPayload = {
      dueDate: values.dueDate!,
      description: values.description!,
    };
    onSubmit(payload);
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <Grid cols={2}>
        <Field
          name="dueDate"
          label="Due Date"
          type="date"
          disablePastDates
          rules={[{ required: true, message: 'Due date is required' }]}
        />

        <Field
          name="description"
          label="Description"
          type="textarea"
          placeholder="Enter reminder description"
          rules={[
            { required: true, message: 'Description is required' },
            { minLength: 5, message: 'Description must be at least 5 characters' },
            { maxLength: 500, message: 'Description cannot exceed 500 characters' },
          ]}
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

export default ReminderForm;
