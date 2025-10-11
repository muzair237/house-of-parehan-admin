import React from 'react';

import AppIcon from '@/components/shared/Icon';

import { createSEO } from '@/lib/utils/seo';

import PageHeader from '../_components/PageHeader';
import DashboardComponents from './_components/DashboardComponents';

const PAGE_TITLE = 'Dashboard';
const PAGE_DESCRIPTION = 'Overview of your platform metrics and activity';

export const metadata = createSEO({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

const Dashboard = () => (
  <>
    <PageHeader
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      icon={<AppIcon name="Gauge" />}
      align="center"
    />

    <DashboardComponents />
  </>
);

export default Dashboard;
