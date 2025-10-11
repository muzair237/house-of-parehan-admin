'use client';

import { useEffect } from 'react';

import authThunk from '@/slices/auth/thunk';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';
import { RootState } from '@/slices/store';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoggedIn, allowedPages } = useAppSelector((state: RootState) => state.Auth);

  useEffect(() => {
    dispatch(authThunk.me());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && allowedPages.length && !allowedPages.includes(pathname)) {
      router.replace(allowedPages[0]);
    }
  }, [isLoggedIn, allowedPages, pathname, router]);

  return <>{children}</>;
}
