import React from 'react';

import AppIcon from '@/components/shared/Icon';
import Link from '@/components/shared/Link';
import Paragraph from '@/components/shared/Paragraph';

import { AMMAR_NAEEMI_PHONE } from '@/lib/utils/constants';

const ResetPasswordInformation = () => {
  return (
    <div className="space-y-4">
      <Paragraph className="text-base text-muted-foreground">
        We’re here to help you get back into your account. For a quick reset, please reach out to
        our support team using the number below.
      </Paragraph>

      <div className="flex items-center justify-center gap-2 text-lg font-semibold text-foreground">
        <AppIcon name="Phone" />
        <Link href={`tel:${AMMAR_NAEEMI_PHONE}`} size="md">
          {AMMAR_NAEEMI_PHONE}
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordInformation;
