import React from 'react';

import AppIcon from '@/components/shared/Icon';
import TableContainer from '@/components/shared/TableContainer/TableContainer';

import { createSEO } from '@/lib/utils/seo';

import PageHeader from '../_components/PageHeader';

const PAGE_TITLE = 'Roles';
const PAGE_DESCRIPTION =
  'Create and manage admin roles to control access levels and responsibilities across the platform.';

export const metadata = createSEO({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

const Roles = () => {
  return (
    <>
      <PageHeader
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        icon={<AppIcon name="ShieldUser" />}
        align="center"
      />
      <TableContainer entity="roles" />
    </>
  );
};

export default Roles;
