'use client';

import { store } from '@/slices/store';
import { ThemeProvider } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';
import { Provider } from 'react-redux';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <NextTopLoader
          color="var(--toploader-color)"
          height={3}
          showSpinner={false}
          shadow="0 0 10px var(--toploader-color)"
          easing="ease-in-out"
          speed={400}
        />

        {children}
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}
