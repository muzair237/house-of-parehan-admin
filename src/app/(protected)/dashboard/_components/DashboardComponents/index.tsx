'use client';

import React from 'react';

import { useAppSelector } from '@/slices/hooks';

import Grid from '@/components/shared/Grid';
import Heading from '@/components/shared/Heading';

import { Permissions } from '@/lib/utils/permissions';

import DashboardCards from '../DashboardCards';
import InstallmentsDueToday from '../InstallmentsDueToday';
import RemindersDueToday from '../RemindersDueToday';
import RevenuePieChart from '../RevenueSummary';
import TopShopkeepersChart from '../TopShopkeepersByInstallments';
import TopRevenueChart from '../TopShopkeepersByRevenue';

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
        {permissions.includes(Permissions.VIEW_TOP_SHOPKEEPERS) && (
          <SectionWrapper title="Top Shopkeepers By Installments">
            <TopShopkeepersChart />
          </SectionWrapper>
        )}

        {permissions.includes(Permissions.VIEW_TOP_SHOPKEEPERS_BY_REVENUE) && (
          <SectionWrapper title="Top Shopkeepers By Revenue">
            <TopRevenueChart />
          </SectionWrapper>
        )}
      </Grid>

      {permissions.includes(Permissions.VIEW_REMINDERS_DUE_TODAY) && (
        <SectionWrapper title="Reminders Due Today">
          <RemindersDueToday />
        </SectionWrapper>
      )}

      {permissions.includes(Permissions.VIEW_INSTALLMENTS_DUE_TODAY) && (
        <SectionWrapper title="Installments Due Today">
          <InstallmentsDueToday />
        </SectionWrapper>
      )}
    </div>
  );
};

export default DashboardComponents;
