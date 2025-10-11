import { BaseFields } from '@/lib/utils/types';

export type EnquiryData = {
  name: string;
  email: string;
  message: string;
} & BaseFields;

export type EnquiriesWithCount = {
  items: EnquiryData[];
  totalItems: number;
};

export type EnquiryState = {
  enquiries: EnquiriesWithCount;
  loading: boolean;
  error: string | null;
};
