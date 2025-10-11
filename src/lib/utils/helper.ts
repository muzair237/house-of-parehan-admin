import { store } from '@/slices/store';
import { isAxiosError } from 'axios';
import { format } from 'date-fns';

import Toast from '@/components/shared/Toast';

import { numberGrouping } from './regex';

export const hasPermission = (permission: string): boolean => {
  const {
    Auth: { permissions },
  } = store.getState();
  return permissions.includes(permission);
};

export const setCookie = (name: string, value: string, domain?: string, days?: number): boolean => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  const domainString = domain ? `; domain=${domain}` : '';

  if (typeof document !== 'undefined') {
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/${domainString}`;
  }

  return true;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;

  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i += 1) {
    let c = cookies[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }

  return null;
};

export const clearCookie = (name: string): boolean => {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
  return true;
};

export const clearMyBrowserData = (): void => {
  clearCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE!);
  clearCookie(process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE!);
};

export const handleThunkError = (error: unknown): void => {
  let message = 'Something went wrong.';

  if (isAxiosError(error)) {
    const serverMessage = error.response?.data?.message;
    if (typeof serverMessage === 'string') {
      message = serverMessage;
    }
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  ) {
    message = (error as Record<string, unknown>).message as string;
  }

  const ignoredMessages = [
    '401 Unauthorized',
    'jwt expired',
    'Session Expired. Kindly Login Again!',
  ];
  if (!ignoredMessages.includes(message)) {
    Toast({
      type: 'error',
      message,
    });
  }
};

export function enumToOptions<T extends Record<string, string | number>>(enumObj: T) {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: normalCase(key),
      value: enumObj[key as keyof T],
    }));
}

export const removeDashes = (value: string): string => value.replace(/-/g, '');

export const toPascalCase = (str: string): string =>
  str
    .split(/[\s-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

export const parseDate = (input: string | Date) => format(new Date(input), 'yyyy-MM-dd');

export const handleApiCall = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ success: boolean; response: any | null }> => {
  try {
    const response = await dispatch(action(params));
    return {
      success: response?.meta?.requestStatus === 'fulfilled',
      response,
    };
  } catch (error) {
    console.error('API call failed:', error);
    return {
      success: false,
      response: null,
    };
  }
};

export const formatLabel = (label: string) =>
  label.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

export const formatCurrency = (v: string | number): string =>
  isNaN((v = Number(v))) ? '' : v.toFixed(2).replace(numberGrouping, ',');

export const isDate = (value: string | number | Date) => {
  if (!value) return false;
  const date = new Date(value);
  return !isNaN(date.getTime()) && typeof value === 'string' && value.length >= 8;
};

export const excludeFields = <T extends object>(obj: T, keys: (keyof T)[]): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as keyof T))
  ) as Partial<T>;
};

export const includeFields = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key as K))) as Pick<
    T,
    K
  >;
};

export const normalCase = (str: string) => {
  return str
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export const toUTCDate = (date: Date): Date => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

export const formatBytes = (bytes: number, decimals: number = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertToFormData = <T extends Record<string, any>>(data: T): FormData => {
  const formData = new FormData();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appendData = (obj: Record<string, any>, parentKey = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item instanceof File) {
            formData.append(fullKey, item); // files keep the plain name
          } else if (typeof item === 'object' && item !== null) {
            appendData(item, `${fullKey}`); // nested objects
          } else {
            formData.append(`${fullKey}[]`, String(item)); // string/number arrays
          }
        });
      } else if (value instanceof File) {
        formData.append(fullKey, value);
      } else if (typeof value === 'object' && value !== null) {
        appendData(value, fullKey);
      } else if (value !== undefined && value !== null) {
        formData.append(fullKey, String(value));
      }
    });
  };

  appendData(data);

  return formData;
};

export const calculateDuration = (startDate?: string | Date, endDate?: string | Date): string => {
  if (!startDate || !endDate) return '-';

  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return '-';

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years > 1 ? 'years' : 'year'}`);
  if (months > 0) parts.push(`${months} ${months > 1 ? 'months' : 'month'}`);
  if (days > 0) parts.push(`${days} ${days > 1 ? 'days' : 'day'}`);

  return parts.length ? parts.join(', ') : '0 days';
};
