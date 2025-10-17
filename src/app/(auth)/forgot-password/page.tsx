import { createSEO } from '@/lib/utils/seo';

import AuthHeader from '../_components/AuthHeader';
import ForgotPasswordForm from './_components/ForgotPasswordForm';

const PAGE_TITLE = 'Forgot Password';
const PAGE_DESCRIPTION =
  'Enter your registered email address to receive a one-time password (OTP) for password recovery.';

export const metadata = createSEO({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function ForgotPasswordPage() {
  return (
    <div>
      <AuthHeader
        title="Forgot Your Password?"
        subtitle="Enter your email address to receive an OTP for password reset"
      />
      <div className="mt-3">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
