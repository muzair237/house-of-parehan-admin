'use client';

import React, { useState } from 'react';

import { Categories, ProductData } from '@/domains/product/types';
import { useAppDispatch } from '@/slices/hooks';
import productThunk from '@/slices/product/thunk';

import AppBadge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import AppIcon from '@/components/shared/Icon';
import ModalContainer from '@/components/shared/ModalContainer';
import RecordInfo from '@/components/shared/Modals/RecordInfoModal';
import Tooltip from '@/components/shared/Tooltip';

import {
  convertToFormData,
  excludeFields,
  formatCurrency,
  handleApiCall,
  hasPermission,
  normalCase,
  parseDate,
} from '@/lib/utils/helper';
import { Permissions } from '@/lib/utils/permissions';

import ProductForm from '../ProductForm';

interface ProductActionBtnsProps {
  row: ProductData;
  refetch: () => Promise<void>;
}

const ProductActionBtns: React.FC<ProductActionBtnsProps> = ({ row, refetch }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (values: FormData, close: () => void) => {
    setIsLoading(true);
    try {
      const { success } = await handleApiCall(dispatch, productThunk.updateProduct, {
        id: row._id,
        payload: values,
      });
      if (success) {
        close();
        refetch();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const badgeTypeMap = {
    [Categories.UNSTITCHED]: 'active',
    [Categories.STITCHED]: 'pending',
    [Categories.ACCESSORIES]: 'info',
  } as const;

  const preparedData = [
    { label: 'Name', value: row.name },
    { label: 'Description', value: row.description },
    { label: 'Price', value: formatCurrency(row.price) },
    { label: 'Stock', value: row.stock.toLocaleString() },
    {
      label: 'Category',
      value: (
        <AppBadge
          type={badgeTypeMap[row.category as Categories] ?? 'inactive'}
          rounded="full"
          size="sm"
        >
          {normalCase(Categories[row.category as Categories] ?? row.category)}
        </AppBadge>
      ),
    },
    { label: 'Images', value: row.images },
    { label: 'Featured', value: row.isFeatured ? 'Yes' : 'No' },
    { label: 'Created At', value: parseDate(row.createdAt) },
  ];

  return (
    <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
      {/* Info */}
      <ModalContainer
        title="Product Information"
        content={() => <RecordInfo data={preparedData} cols={2} />}
      >
        {(open) => (
          <Tooltip label="Information">
            <Button onClick={open} minimal>
              <AppIcon name="Info" />
            </Button>
          </Tooltip>
        )}
      </ModalContainer>

      {/* Update */}
      {hasPermission(Permissions.UPDATE_PRODUCT) && (
        <ModalContainer
          title="Update Product"
          closeButton={false}
          closeOnOutsideClick={false}
          size="lg"
          content={(close) => (
            <ProductForm
              row={excludeFields(row, ['_id', 'createdAt', 'isFeatured'])}
              isLoading={isLoading}
              onSubmit={(v) => handleUpdate(v, close)}
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

      {/* Toggle Featured */}
      {hasPermission(Permissions.MARK_PRODUCT_AS_FEATURED) && (
        <ModalContainer
          title={row.isFeatured ? 'Unmark as Featured' : 'Mark as Featured'}
          description={
            row.isFeatured
              ? 'Are you sure you want to remove this product from featured?'
              : 'Are you sure you want to mark this product as featured?'
          }
          submitButton={{
            label: row.isFeatured ? 'Unmark' : 'Mark Featured',
            variant: row.isFeatured ? 'destructive' : 'success',
            loading: isLoading,
            onClick: async (close) => {
              try {
                await handleUpdate(convertToFormData({ isFeatured: !row.isFeatured }), close);
              } catch (err) {
                console.error(err);
              }
            },
          }}
        >
          {(open) => (
            <Tooltip label={row.isFeatured ? 'Unmark Featured' : 'Mark Featured'}>
              <Button onClick={open} minimal>
                <AppIcon
                  name={row.isFeatured ? 'Ban' : 'Star'}
                  color={row.isFeatured ? 'text-red-500' : 'text-yellow-500'}
                />
              </Button>
            </Tooltip>
          )}
        </ModalContainer>
      )}
    </div>
  );
};

export default ProductActionBtns;
