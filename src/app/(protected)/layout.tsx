import { ReactNode } from 'react';

import ProtectedProvider from './_components/ClientProvider';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  return <ProtectedProvider>{children}</ProtectedProvider>;
}
