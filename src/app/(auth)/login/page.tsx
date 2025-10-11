import { createSEO } from '@/lib/utils/seo';

import AuthHeader from '../_components/AuthHeader';
import LoginForm from './_components/LoginForm';

const PAGE_TITLE = 'Login';
const PAGE_DESCRIPTION =
  'Sign in to your account to access your dashboard, manage your profile, and explore features.';

export const metadata = createSEO({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function LoginPage() {
  return (
    <div>
      <AuthHeader title="Welcome Back!" subtitle="Please sign in to your account" />
      <LoginForm />
    </div>
  );
}
