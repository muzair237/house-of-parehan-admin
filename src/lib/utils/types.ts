export type SortOrder = 'asc' | 'desc';
export type QueryParams = {
  page: number;
  limit: number;
  sort?: Record<string, SortOrder>;
};

export type BaseFields = {
  _id: string;
  createdAt: string;
};

export type DeletePayload = string;

export type Option = {
  label: string;
  value: string | number | React.ReactNode;
};
