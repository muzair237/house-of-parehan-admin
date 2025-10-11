'use client';

import React from 'react';

import { Categories, ProductData } from '@/domains/product/types';

import Button from '@/components/shared/Button';
import { Field, Form } from '@/components/shared/Form';
import { useForm } from '@/components/shared/Form/core/useForm';
import Grid from '@/components/shared/Grid';

import { convertToFormData, enumToOptions } from '@/lib/utils/helper';

interface ProductFormProps {
  row?: Partial<ProductData>;
  isLoading: boolean;
  onSubmit: (values: FormData) => void | Promise<void>;
}

const ProductForm: React.FC<ProductFormProps> = ({ row, isLoading, onSubmit }) => {
  const form = useForm<ProductData>({
    ...(row && {
      defaultValues: {
        ...row,
      },
    }),
  });

  const handleSubmit = (values: ProductData) => {
    console.log('values: ', values);
    onSubmit(convertToFormData(values));
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <Grid cols={2}>
        <Field
          name="name"
          label="Product Name"
          type="text"
          placeholder="Enter product name"
          rules={[
            { required: true, message: 'Product name is required' },
            { minLength: 2, message: 'Name must be at least 2 characters' },
            { maxLength: 100, message: 'Name cannot exceed 100 characters' },
          ]}
        />
        <Field
          name="price"
          label="Price (Rs)"
          type="number"
          placeholder="1000"
          rules={[{ required: true, message: 'Price is required' }]}
        />
      </Grid>

      <Grid cols={2}>
        <Field
          name="stock"
          label="Stock Quantity"
          type="number"
          placeholder="50"
          rules={[{ required: true, message: 'Stock quantity is required' }]}
        />
        <Field
          name="category"
          label="Category"
          type="select"
          options={enumToOptions(Categories)}
          placeholder="Select category"
          rules={[{ required: true, message: 'Category is required' }]}
        />
      </Grid>

      <Grid cols={1}>
        <Field
          name="description"
          label="Description"
          type="textarea"
          placeholder="Enter product description"
          rules={[
            { minLength: 5, message: 'Description must be at least 5 characters' },
            { maxLength: 500, message: 'Description cannot exceed 500 characters' },
          ]}
        />
      </Grid>

      <Grid cols={1}>
        <Field
          name="images"
          label="Product Images"
          type="file"
          multiple
          maxFiles={4}
          rules={[{ required: true, message: 'At least one image is required' }]}
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

export default ProductForm;
