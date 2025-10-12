'use client';

import React, { useEffect } from 'react';

import dashboardThunk from '@/slices/dashboard/thunk';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';

import AppIcon from '@/components/shared/Icon';
import Skeleton from '@/components/shared/Skeleton';

import { hasPermission } from '@/lib/utils/helper';
import { Permissions } from '@/lib/utils/permissions';

import AnalyticsCard from '../AnalyticsCard';

const DashboardCards = () => {
  const dispatch = useAppDispatch();
  const { analytics, cardLoading } = useAppSelector((state) => state.Dashboard);

  useEffect(() => {
    dispatch(dashboardThunk.fetchCardAnalytics());
  }, [dispatch]);

  if (cardLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-3 p-4 border rounded-lg shadow-sm">
            <Skeleton rows={1} columns={1} cellWidth="w-10" cellHeight="h-10" />
            <Skeleton rows={1} columns={1} cellWidth="w-1/2" cellHeight="h-4" />
            <Skeleton rows={3} columns={1} cellWidth="w-3/4" cellHeight="h-5" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {analytics &&
        [
          {
            key: 'admins',
            title: 'Admins',
            icon: <AppIcon name="ShieldUser" />,
            permission: Permissions.VIEW_CARD_ADMIN_ANALYTICS,
          },
          {
            key: 'customers',
            title: 'Customers',
            icon: <AppIcon name="Users" />,
            permission: Permissions.VIEW_CARD_CUSTOMER_ANALYTICS,
          },
          {
            key: 'installments',
            title: 'Installments',
            icon: <AppIcon name="CalendarClock" />,
            permission: Permissions.VIEW_CARD_INSTALLMENT_ANALYTICS,
          },
          {
            key: 'shopkeepers',
            title: 'Registered Shopkeepers',
            icon: <AppIcon name="Store" />,
            permission: Permissions.VIEW_CARD_SHOPKEEPER_ANALYTICS,
          },
        ]
          .filter(({ permission }) => hasPermission(permission))
          .map(({ key, title, icon }) => {
            const data = analytics[key as keyof typeof analytics];
            if (!data) return null;

            return (
              <AnalyticsCard
                key={key}
                title={title}
                total={data.total}
                active={data.active}
                inactive={data.inactive}
                defaulted={data.defaulted}
                completed={data.completed}
                icon={icon}
              />
            );
          })}
    </div>
  );
};

export default DashboardCards;
