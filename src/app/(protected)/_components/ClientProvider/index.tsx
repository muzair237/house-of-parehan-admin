'use client';

import { useEffect } from 'react';

import authThunk from '@/slices/auth/thunk';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';

import ModalContainer from '@/components/shared/ModalContainer';
import Sidebar from '@/components/shared/Sidebar';
import { sidebarItems } from '@/components/shared/Sidebar/sidebarItems';

import { useNavigate } from '@/hooks/useNavigate';

export default function ProtectedProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isLoading, isSessionExpired } = useAppSelector((state) => state.Auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunk.me());
  }, [dispatch]);

  return (
    <>
      <ModalContainer
        title="Session Expired"
        description=" Your session has expired due to timeout or has been terminated by a Super Admin.  
        Please log in again to continue your session."
        closeOnOutsideClick={false}
        showCloseIcon={false}
        closeButton={false}
        defaultOpen={isSessionExpired}
        submitButton={{
          loading: isLoading,
          variant: 'destructive',
          label: 'Logout',
          onClick: () => dispatch(authThunk.logout({ navigate })),
        }}
      >
        {(_) => null}
      </ModalContainer>

      <div className="flex h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        <Sidebar items={sidebarItems} />

        <main className="flex-1 h-full overflow-y-auto p-6">{children}</main>
      </div>
    </>
  );
}
