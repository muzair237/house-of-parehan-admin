'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { TransactionPayload, TransactionStatus } from '@/domains/transaction/types';

import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';
import Grid from '@/components/shared/Grid';
import AppIcon from '@/components/shared/Icon';
import Input, { NativeChangeHandler } from '@/components/shared/Input';
import ModalContainer from '@/components/shared/ModalContainer';
import TableContainer from '@/components/shared/TableContainer/TableContainer';

import { enumToOptions, formatCurrency } from '@/lib/utils/helper';

interface TransactionFormProps {
  row?: Partial<TransactionPayload>;
  isLoading: boolean;
  onSubmit: (values: TransactionPayload) => void | Promise<void>;
}

/** Shape for a product selection row */
interface SelectedProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ row, isLoading, onSubmit }) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const form = useForm<TransactionPayload>({
    defaultValues: {
      status: row?.status ?? TransactionStatus.PAID,
      note: row?.note ?? '',
      totalAmount: row?.totalAmount ?? 0,
    },
  });

  /** Auto-calc total based on product quantity * price */
  const totalAmount = useMemo(() => {
    return selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }, [selectedProducts]);

  useEffect(() => {
    form.setValue('totalAmount', totalAmount);
  }, [totalAmount, form]);

  const handleSubmit = (values: TransactionPayload) => {
    const payload: TransactionPayload = {
      totalAmount: totalAmount,
      status: values.status,
      products: selectedProducts.map((p) => ({
        product: p._id,
        quantity: p.quantity,
        priceAtSale: p.price,
      })),
      ...(values.note ? { note: values.note } : {}),
    };

    onSubmit(payload);
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <Grid cols={2}>
        <Field
          name="status"
          label="Status"
          type="select"
          options={enumToOptions(TransactionStatus)}
          placeholder="Select status"
        />

        <Field
          name="note"
          label="Note"
          type="textarea"
          placeholder="Enter any additional notes..."
        />
      </Grid>

      {/* Product selection */}
      <div className="mt-6">
        <ModalContainer
          title="Select Products"
          size="4xl"
          submitButton={{
            loading: isLoading,
            disabled: !selectedProducts.length,
            label: 'Confirm',
            onClick: (close) => close(),
          }}
          content={() => (
            <TableContainer
              entity="products"
              selectableRows
              maxSelectable={10}
              initialSelectedRows={selectedProducts.map((p) => p._id)}
              onSelectedRowsChange={(rows) => {
                const newProducts = rows.map((r) => {
                  const existing = selectedProducts.find((sp) => sp._id === r._id);
                  return {
                    _id: r._id,
                    name: r.name,
                    price: r.price,
                    stock: r.stock,
                    quantity: existing?.quantity ?? 1,
                  };
                });
                setSelectedProducts(newProducts);
              }}
              disableRowCheckbox={(row) => row.stock <= 0}
            />
          )}
        >
          {(open) => (
            <Button onClick={open}>
              Add Products <AppIcon name={selectedProducts.length ? 'Check' : 'X'} />
            </Button>
          )}
        </ModalContainer>
      </div>

      {/* Selected Products Display */}
      {selectedProducts.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">Selected Products</h3>
          <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
            {selectedProducts.map((p) => (
              <div
                key={p._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b last:border-b-0 py-3 gap-3 sm:gap-6"
              >
                {/* Product Info */}
                <div className="flex-1">
                  <span className="font-medium text-[var(--foreground)]">{p.name}</span>
                  <div className="text-sm text-[var(--muted-foreground)]">
                    {formatCurrency(p.price)} × {p.quantity} ={' '}
                    <strong>{formatCurrency(p.price * p.quantity)}</strong>
                  </div>
                </div>

                <div className="flex items-end sm:items-center gap-3 sm:gap-4">
                  <div className="w-32">
                    <Input
                      name="quantity"
                      type="number"
                      label="Quantity"
                      value={p.quantity}
                      onChange={
                        ((val: unknown) => {
                          const value = (val as React.ChangeEvent<HTMLInputElement>).target.value;

                          if (value === '') {
                            setSelectedProducts((prev) =>
                              prev.map((prod) =>
                                prod._id === p._id
                                  ? { ...prod, quantity: '' as unknown as number }
                                  : prod
                              )
                            );
                            return;
                          }

                          let q = Math.floor(Number(value));

                          if (isNaN(q)) return;

                          if (q <= 0) q = 1;

                          if (!Number.isInteger(Number(value))) {
                            q = Math.floor(Number(value));
                          }

                          const stock = p.stock ?? 0;
                          const finalQty = q > stock ? stock : q;

                          setSelectedProducts((prev) =>
                            prev.map((prod) =>
                              prod._id === p._id ? { ...prod, quantity: finalQty } : prod
                            )
                          );
                        }) as NativeChangeHandler
                      }
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-8"
                    onClick={() =>
                      setSelectedProducts((prev) => prev.filter((prod) => prod._id !== p._id))
                    }
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center gap-4">
            <Badge type="info" size="lg" rounded="lg">
              Total: {formatCurrency(totalAmount)}
            </Badge>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          loading={isLoading}
          disabled={
            !selectedProducts.length ||
            selectedProducts.some((p) => !p.quantity || Number(p.quantity) <= 0)
          }
        >
          {row ? 'Update' : 'Create'}
        </Button>
      </div>
    </Form>
  );
};

export default TransactionForm;
