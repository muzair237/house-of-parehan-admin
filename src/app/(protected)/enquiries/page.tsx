import React from 'react';

import AppIcon from '@/components/shared/Icon';
import TableContainer from '@/components/shared/TableContainer/TableContainer';

import { createSEO } from '@/lib/utils/seo';

import PageHeader from '../_components/PageHeader';

const PAGE_TITLE = 'Enquiries';
const PAGE_DESCRIPTION = 'Manage and review customer enquiries submitted through your platform.';

export const metadata = createSEO({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

const Enquiries = () => {
  return (
    <>
      <PageHeader
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        icon={<AppIcon name="MessageCircle" />}
        align="center"
      />
      <TableContainer entity="enquiries" />
    </>
  );
};

export default Enquiries;
