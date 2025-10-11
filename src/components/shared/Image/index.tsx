'use client';

import React from 'react';

import NextImage from 'next/image';

import { cn } from '@/lib/utils';

type ImageComponentProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
} & React.ComponentProps<typeof NextImage>;

export default function Image({
  src,
  alt,
  width,
  height,
  fill = false,
  fit = 'cover',
  radius = 'md',
  className,
  ...props
}: ImageComponentProps) {
  return (
    <div
      className={cn(
        'overflow-hidden bg-muted',
        radius === 'none' && 'rounded-none',
        radius === 'sm' && 'rounded-sm',
        radius === 'md' && 'rounded-md',
        radius === 'lg' && 'rounded-lg',
        radius === 'xl' && 'rounded-xl',
        radius === 'full' && 'rounded-full',
        className
      )}
      style={{
        position: fill ? 'relative' : 'initial',
        width: fill ? '100%' : width,
        height: fill ? '100%' : height, // ✅ make sure height exists
      }}
    >
      <NextImage
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        style={{ objectFit: fit }}
        className="text-foreground"
        {...props}
      />
    </div>
  );
}
