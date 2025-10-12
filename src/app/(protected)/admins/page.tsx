import React from 'react';

import AppIcon from '@/components/shared/Icon';
import TableContainer from '@/components/shared/TableContainer/TableContainer';

import { createSEO } from '@/lib/utils/seo';

import PageHeader from '../_components/PageHeader';

const PAGE_TITLE = 'Admins';
const PAGE_DESCRIPTION =
  'Add, manage, and organize admin accounts to ensure secure and efficient access to the platform.';

export const metadata = createSEO({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

const Admins = () => {
  return (
    <>
      <PageHeader
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        icon={<AppIcon name="ShieldUser" />}
        align="center"
      />
      <TableContainer entity="admins" />
    </>
  );
};

export default Admins;
