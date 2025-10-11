'use client';

import React from 'react';

import { useAppSelector } from '@/slices/hooks';

import { Skeleton } from '@/components/ui/skeleton';

import { parseDate } from '@/lib/utils/helper';

const ProfileCard = () => {
  const { user, isLoading } = useAppSelector((state) => state.Auth);

  if (isLoading) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-56" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--muted)]/20 p-6 text-center text-[var(--muted-foreground)]">
        No user data found.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm space-y-4">
      {/* Basic Info Heading */}
      <h2 className="text-base font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-2">
        User Information
      </h2>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          {user.fullName ?? 'Unnamed User'}
        </h3>

        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium text-[var(--muted-foreground)]">Email: </span>
            <span className="text-[var(--foreground)]">{user.email}</span>
          </p>

          <p className="text-sm">
            <span className="font-medium text-[var(--muted-foreground)]">Joined On: </span>
            <span className="text-[var(--foreground)]">{parseDate(user.createdAt)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
