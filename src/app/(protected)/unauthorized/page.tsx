'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/shared/Button';
import Heading from '@/components/shared/Heading';
import Paragraph from '@/components/shared/Paragraph';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
      <div className="max-w-md text-center">
        <Heading size="4xl" className="text-primary mb-4">
          403
        </Heading>
        <Heading size="2xl" className="mb-2">
          Unauthorized Access
        </Heading>
        <Paragraph variant="muted" className="mb-6">
          You do not have permission to view this page. Please contact your administrator or return
          to a page you’re authorized to access.
        </Paragraph>
        <Button onClick={() => router.replace('/dashbaord')}>Go to Dashboard</Button>
      </div>
    </div>
  );
}
