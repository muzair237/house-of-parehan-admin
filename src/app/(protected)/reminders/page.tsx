import React from 'react';

import AppIcon from '@/components/shared/Icon';
import TableContainer from '@/components/shared/TableContainer/TableContainer';

import { createSEO } from '@/lib/utils/seo';

import PageHeader from '../_components/PageHeader';

const PAGE_TITLE = 'Reminders';
const PAGE_DESCRIPTION =
  'Track, manage, and follow up on reminders to ensure timely actions and commitments.';

export const metadata = createSEO({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

const Reminders = () => {
  return (
    <>
      <PageHeader
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        icon={<AppIcon name="BellRing" />}
        align="center"
      />
      <TableContainer entity="reminders" />
    </>
  );
};

export default Reminders;
