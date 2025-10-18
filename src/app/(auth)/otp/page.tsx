import { Suspense } from 'react';

import { createSEO } from '@/lib/utils/seo';

import AuthHeader from '../_components/AuthHeader';
import EnterOTPForm from './_components/EnterOtpForm';

const PAGE_TITLE = 'Enter OTP';
const PAGE_DESCRIPTION =
  'Enter the one-time password (OTP) sent to your email to verify your identity and continue.';

export const metadata = createSEO({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function EnterOTPPage() {
  return (
    <div>
      <AuthHeader
        title="Enter Verification Code"
        subtitle="We’ve sent a one-time password to your registered email. It is valid for 5 minutes."
      />

      <div className="mt-3">
        <Suspense fallback={<div>Loading...</div>}>
          <EnterOTPForm />
        </Suspense>
      </div>
    </div>
  );
}
