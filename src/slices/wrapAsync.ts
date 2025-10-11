import { handleThunkError } from '@/lib/utils/helper';

export const wrapAsync = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Optional: central error logging
    handleThunkError(error);

    throw {
      message: error?.response?.data?.message || error?.message || 'Unknown Error',
      isRejectedWithValue: true,
    };
  }
};
