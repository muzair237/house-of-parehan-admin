'use client';

import EnquiryActionBtns from '@/app/(protected)/enquiries/_components/ActionBtns';
import PermissionActionBtns from '@/app/(protected)/permissions/_components/ActionBtns';
import ProductActionBtns from '@/app/(protected)/products/_components/ActionBtns';
import ReminderActionBtns from '@/app/(protected)/reminders/_components/ActionBtns';
import RoleActionBtns from '@/app/(protected)/roles/_components/ActionBtns';
import TransactionActionBtns from '@/app/(protected)/transactions/_components/ActionBtns';
import UserActionBtns from '@/app/(protected)/users/_components/ActionBtns';
import { Categories } from '@/domains/product/types';
import { ReminderStatus } from '@/domains/reminder/types';
import { TransactionStatus } from '@/domains/transaction/types';

import Badge from '@/components/shared/Badge';

import { GET_UNIQUE_ROLES } from '@/lib/utils/apiHelper';
import { enumToOptions, formatCurrency, normalCase } from '@/lib/utils/helper';

import { TableConfig } from './types';

export const tableConfigs: Record<string, TableConfig> = {
  enquiries: {
    name: 'enquiry',
    defaultSort: { key: 'createdAt', direction: 'desc' },
    pageSize: 10,
    columns: [
      { key: 'createdAt', label: 'Date', sortable: true },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'message', label: 'Message' },
      { key: 'actions', label: 'Actions' },
    ],
    filters: [
      {
        key: 'search',
        label: 'Search',
        type: 'input',
        placeholder: 'Search...',
      },
      {
        key: 'date',
        label: 'Date',
        type: 'date',
        placeholder: 'Pick a date range',
        mode: 'range',
      },
    ],
    createEntityButton: false,
    actionBtns: EnquiryActionBtns,
  },

  permissions: {
    name: 'permission',
    defaultSort: { key: 'createdAt', direction: 'desc' },
    pageSize: 10,
    columns: [
      { key: 'createdAt', label: 'Date', sortable: true },
      { key: 'can', label: 'Can', sortable: true },
      { key: 'route', label: 'Route' },
      { key: 'description', label: 'Description' },
      { key: 'actions', label: 'Actions' },
    ],
    filters: [
      {
        key: 'search',
        label: 'Search',
        type: 'input',
        placeholder: 'Search...',
      },
      {
        key: 'date',
        label: 'Date',
        type: 'date',
        placeholder: 'Pick a date range',
        mode: 'range',
      },
    ],

    createEntityButton: true,
    actionBtns: PermissionActionBtns,
  },

  roles: {
    name: 'role',
    defaultSort: { key: 'createdAt', direction: 'desc' },
    pageSize: 10,
    columns: [
      { key: 'createdAt', label: 'Date', sortable: true },
      { key: 'type', label: 'Type', sortable: true },
      { key: 'description', label: 'Description' },
      { key: 'actions', label: 'Actions' },
    ],
    filters: [
      {
        key: 'search',
        label: 'Search',
        type: 'input',
        placeholder: 'Search...',
      },
      {
        key: 'date',
        label: 'Date',
        type: 'date',
        placeholder: 'Pick a date range',
        mode: 'range',
      },
    ],

    createEntityButton: true,
    actionBtns: RoleActionBtns,
  },

  users: {
    name: 'user',
    defaultSort: { key: 'createdAt', direction: 'desc' },
    pageSize: 10,
    columns: [
      { key: 'createdAt', label: 'Date', sortable: true },
      { key: 'fullName', label: 'Name', sortable: true },
      { key: 'mobile', label: 'Mobile No.' },
      { key: 'accountExpiryDate', label: 'Account Expiry Date', sortable: true },
      {
        key: 'roles',
        label: 'Roles',
        render: (row) =>
          Array.isArray(row.roles)
            ? row.roles.map((r) => (typeof r === 'string' ? r : (r.type ?? ''))).join(', ')
            : '-',
      },
      { key: 'actions', label: 'Actions' },
    ],
    filters: [
      {
        key: 'search',
        label: 'Search',
        type: 'input',
        placeholder: 'Search...',
      },
      {
        key: 'date',
        label: 'Date',
        type: 'date',
        placeholder: 'Pick a date range',
        mode: 'range',
      },
      {
        key: 'roles',
        label: 'Role',
        type: 'select',
        placeholder: 'Search...',
        apiEndpoint: GET_UNIQUE_ROLES,
      },
    ],
    createEntityButton: true,
    actionBtns: UserActionBtns,
  },

  products: {
    name: 'product',
    defaultSort: { key: 'createdAt', direction: 'desc' },
    pageSize: 10,
    columns: [
      { key: 'createdAt', label: 'Date', sortable: true },
      { key: 'name', label: 'Name', sortable: true },
      {
        key: 'price',
        label: 'Price',
        render: ({ price }) => formatCurrency(price),
        sortable: true,
      },
      {
        key: 'stock',
        label: 'Stock',
        render: ({ stock }) => stock.toLocaleString(),
        sortable: true,
      },
      {
        key: 'category',
        label: 'Category',
        render: ({ category }) => {
          const badgeTypeMap = {
            [Categories.UNSTITCHED]: 'active',
            [Categories.STITCHED]: 'pending',
            [Categories.ACCESSORIES]: 'info',
          } as const;

          const s = category as Categories;

          return (
            <Badge type={badgeTypeMap[s] ?? 'inactive'} rounded="full" size="sm">
              {normalCase(Categories[s] ?? s)}
            </Badge>
          );
        },
      },
      {
        key: 'isFeatured',
        label: 'Is Featured?',
        render: ({ isFeatured }) => (
          <Badge type={isFeatured ? 'active' : 'info'} rounded="full" size="sm">
            {isFeatured ? 'Featured' : 'Not Featured'}
          </Badge>
        ),
      },
      { key: 'description', label: 'Description' },
      { key: 'actions', label: 'Actions' },
    ],
    filters: [
      {
        key: 'search',
        label: 'Search',
        type: 'input',
        placeholder: 'Search...',
      },
      {
        key: 'date',
        label: 'Date',
        type: 'date',
        placeholder: 'Pick a date range',
        mode: 'range',
      },
      {
        key: 'category',
        label: 'Category',
        type: 'select',
        options: enumToOptions(Categories),
      },
      {
        key: 'isFeatured',
        label: 'Featured',
        type: 'select',
        options: [{ label: 'Featured', value: true }],
      },
    ],
    createEntityButton: true,
    actionBtns: ProductActionBtns,
  },

  transactions: {
    name: 'transaction',
    defaultSort: { key: 'createdAt', direction: 'desc' },
    pageSize: 10,
    columns: [
      { key: 'createdAt', label: 'Date', sortable: true },
      {
        key: 'customerName',
        label: 'Customer Name',
        render: (row) =>
          `${row.installmentId.customer.firstName} ${row.installmentId.customer.lastName}`,
        sortable: true,
      },
      {
        key: 'shopkeeperName',
        label: 'Shopkeeper Name',
        render: (row) => row.installmentId.createdBy.fullName,
        sortable: true,
      },
      {
        key: 'amount',
        label: 'Amount (PKR)',
        render: (row) => formatCurrency(row.amount),
        sortable: true,
      },
      { key: 'paidAt', label: 'Paid At', sortable: true },
      {
        key: 'status',
        label: 'Status',
        render: (row) => (
          <Badge
            type={row.status === TransactionStatus.PAID ? 'info' : 'pending'}
            rounded="full"
            size="sm"
          >
            {normalCase(TransactionStatus[row.status])}
          </Badge>
        ),
      },

      { key: 'actions', label: 'Actions' },
    ],
    filters: [
      {
        key: 'search',
        label: 'Search',
        type: 'input',
        placeholder: 'Search...',
      },
      {
        key: 'date',
        label: 'Date',
        type: 'date',
        placeholder: 'Pick a date range',
        mode: 'range',
      },
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: enumToOptions(TransactionStatus),
      },
    ],

    createEntityButton: true,
    actionBtns: TransactionActionBtns,
  },

  reminders: {
    name: 'reminder',
    defaultSort: { key: 'createdAt', direction: 'desc' },
    pageSize: 10,
    columns: [
      { key: 'createdAt', label: 'Date', sortable: true },
      { key: 'description', label: 'Description' },

      { key: 'dueDate', label: 'Due Date', sortable: true },
      {
        key: 'status',
        label: 'Status',
        render: (row) => {
          const statusToBadgeType: Record<ReminderStatus, 'info' | 'active' | 'error'> = {
            [ReminderStatus.SET]: 'active',
            [ReminderStatus.COMPLETED]: 'info',
            [ReminderStatus.CANCELLED]: 'error',
          };

          const p = row.status as ReminderStatus;

          return (
            <Badge type={statusToBadgeType[p]} rounded="full" size="sm">
              {normalCase(ReminderStatus[p])}
            </Badge>
          );
        },
      },

      { key: 'actions', label: 'Actions' },
    ],
    filters: [
      {
        key: 'search',
        label: 'Search',
        type: 'input',
        placeholder: 'Search...',
      },
      {
        key: 'date',
        label: 'Date',
        type: 'date',
        placeholder: 'Pick a date range',
        mode: 'range',
      },
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: enumToOptions(ReminderStatus),
      },
    ],

    createEntityButton: true,
    actionBtns: ReminderActionBtns,
  },

  remindersDueToday: {
    name: 'reminderDueToday',
    defaultSort: { key: 'createdAt', direction: 'desc' },
    pageSize: 10,
    columns: [
      { key: 'createdAt', label: 'Date', sortable: true },
      { key: 'description', label: 'Description' },

      { key: 'dueDate', label: 'Due Date', sortable: true },
      {
        key: 'status',
        label: 'Status',
        render: (row) => {
          const statusToBadgeType: Record<ReminderStatus, 'info' | 'active' | 'error'> = {
            [ReminderStatus.SET]: 'active',
            [ReminderStatus.COMPLETED]: 'info',
            [ReminderStatus.CANCELLED]: 'error',
          };

          const p = row.status as ReminderStatus;

          return (
            <Badge type={statusToBadgeType[p]} rounded="full" size="sm">
              {normalCase(ReminderStatus[p])}
            </Badge>
          );
        },
      },

      { key: 'actions', label: 'Actions' },
    ],
    filters: [
      {
        key: 'search',
        label: 'Search',
        type: 'input',
        placeholder: 'Search...',
      },
      {
        key: 'date',
        label: 'Date',
        type: 'date',
        placeholder: 'Pick a date range',
        mode: 'range',
      },
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: enumToOptions(ReminderStatus),
      },
    ],

    createEntityButton: true,
    actionBtns: ReminderActionBtns,
  },
};
