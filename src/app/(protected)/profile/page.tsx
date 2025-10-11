import React from 'react';

import AppIcon from '@/components/shared/Icon';

import { createSEO } from '@/lib/utils/seo';

import PageHeader from '../_components/PageHeader';
import ProfileCard from './_components/ProfileCard';
import UpdatePassword from './_components/UpdatePasswordSection';

const PAGE_TITLE = 'Profile';
const PAGE_DESCRIPTION = 'View and update your profile details or change your password.';

export const metadata = createSEO({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        icon={<AppIcon name="User" />}
        align="center"
      />
      <div className="space-y-6 max-w-3xl mx-auto p-6">
        <ProfileCard />
      </div>

      <div className="space-y-6 max-w-3xl mx-auto p-6">
        <UpdatePassword />
      </div>
    </>
  );
}
