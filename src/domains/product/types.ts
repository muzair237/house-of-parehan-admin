import { BaseFields } from '@/lib/utils/types';

export enum Categories {
  UNSTITCHED = 0,
  STITCHED = 1,
  ACCESSORIES = 2,
}

export type ProductData = {
  name: string;
  description?: string;
  price: number;
  category: Categories;
  stock: number;
  images: string[];
  isFeatured: boolean;
} & BaseFields;

export type ProductPayload = ProductData;

export type ProductsWithCount = {
  items: ProductData[];
  totalItems: number;
};

export type ProductState = {
  products: ProductsWithCount;
  loading: boolean;
  error: string | null;
};
