import React from 'react';

import AppIcon from '@/components/shared/Icon';
import TableContainer from '@/components/shared/TableContainer/TableContainer';

import { createSEO } from '@/lib/utils/seo';

import PageHeader from '../_components/PageHeader';

const PAGE_TITLE = 'Transactions';
const PAGE_DESCRIPTION =
  'View and manage all customer payments and transaction records.';

export const metadata = createSEO({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

const Transactions = () => {
  return (
    <>
      <PageHeader
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        icon={<AppIcon name="CircleDollarSign" />}
        align="center"
      />
      <TableContainer entity="transactions" />
    </>
  );
};

export default Transactions;
