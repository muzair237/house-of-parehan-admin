import { Suspense } from 'react';

import { createSEO } from '@/lib/utils/seo';

import AuthHeader from '../_components/AuthHeader';
import ResetPasswordForm from './_components/ResetPasswordForm';

const PAGE_TITLE = 'Reset Password';
const PAGE_DESCRIPTION =
  'Enter your new password to complete the reset process and regain access to your account.';

export const metadata = createSEO({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function ResetPasswordPage() {
  return (
    <div>
      <AuthHeader
        title="Reset Your Password"
        subtitle="Enter your new password below to reset your account access."
      />

      <div className="mt-3">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
