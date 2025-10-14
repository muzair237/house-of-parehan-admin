'use client';

import React from 'react';

import { useAppSelector } from '@/slices/hooks';

import Grid from '@/components/shared/Grid';
import Heading from '@/components/shared/Heading';

import { Permissions } from '@/lib/utils/permissions';

import DashboardCards from '../DashboardCards';
import RemindersDueToday from '../RemindersDueToday';
import RevenuePieChart from '../RevenueSummary';
import TopProductsChart from '../TopProductsByUnitsSold';

const SectionWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="space-y-4 py-4">
    <Heading as="h1" size="base">
      {title}
    </Heading>
    <div>{children}</div>
  </div>
);

const DashboardComponents = () => {
  const { permissions } = useAppSelector((state) => state.Auth);

  return (
    <div className="space-y-2">
      {permissions.includes(Permissions.VIEW_CARD_ANALYTICS) && (
        <SectionWrapper title="Platform Analytics Overview">
          <DashboardCards />
        </SectionWrapper>
      )}

      {permissions.includes(Permissions.VIEW_REVENUE_SUMMARY) && (
        <SectionWrapper title="Revenue Summary">
          <RevenuePieChart />
        </SectionWrapper>
      )}

      <Grid cols={2}>
        {permissions.includes(Permissions.VIEW_TOP_PRODUCTS_BY_UNIT_SOLD) && (
          <SectionWrapper title="Top Products By Units Sold">
            <TopProductsChart />
          </SectionWrapper>
        )}

        {permissions.includes(Permissions.VIEW_REMINDERS_DUE_TODAY) && (
          <SectionWrapper title="Reminders Due Today">
            <RemindersDueToday />
          </SectionWrapper>
        )}
      </Grid>
    </div>
  );
};

export default DashboardComponents;
