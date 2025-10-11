'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/shared/Button';
import Heading from '@/components/shared/Heading';
import Paragraph from '@/components/shared/Paragraph';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
      <div className="max-w-md text-center">
        <Heading size="4xl" className="text-primary mb-4">
          404
        </Heading>
        <Heading size="2xl" className="mb-2">
          Page Not Found
        </Heading>
        <Paragraph variant="muted" className="mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </Paragraph>
        <Button onClick={() => router.replace('/')}>Go to Home</Button>
      </div>
    </div>
  );
}
