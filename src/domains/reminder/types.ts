import { BaseFields } from '@/lib/utils/types';

export enum ReminderStatus {
  SET = 0,
  CANCELLED = 1,
  COMPLETED = 2,
}

export type ReminderData = {
  description: string;
  dueDate: Date;
  status: ReminderStatus;
} & BaseFields;

export type ReminderPayload = {
  description: string;
  dueDate: Date;
};

export type RemindersWithCount = {
  items: ReminderData[];
  totalItems: number;
};

export type ReminderState = {
  reminders: RemindersWithCount;
  loading: boolean;
  error: string | null;
};
