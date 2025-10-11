import type { Metadata } from 'next';

import { APP_NAME } from './constants';

export function createSEO({
  title,
  description,
}: {
  title: string;
  description?: string;
}): Metadata {
  return {
    title: `${title} | ${APP_NAME}`,
    description,
  };
}
