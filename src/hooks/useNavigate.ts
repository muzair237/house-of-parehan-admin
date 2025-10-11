'use client';

import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';

export function useNavigate() {
  const router = useRouter();

  const navigate = (path: string, options?: { replace?: boolean }) => {
    NProgress.start();

    if (options?.replace) {
      router.replace(path);
    } else {
      router.push(path);
    }
  };

  return navigate;
}
