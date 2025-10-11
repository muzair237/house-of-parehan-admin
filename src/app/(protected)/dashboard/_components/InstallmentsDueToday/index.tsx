import React from 'react';

import TableContainer from '@/components/shared/TableContainer/TableContainer';

const InstallmentsDueToday = () => {
  return <TableContainer entity="installmentsDueToday" onlyTable />;
};

export default InstallmentsDueToday;
