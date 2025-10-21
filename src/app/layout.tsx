import { AppProviders } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="font-outfit antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
