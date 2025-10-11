'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../ui/carousel';
import Image from '../Image';

type ImagePreviewProps = {
  images: string | string[];
  alt?: string;
  className?: string;
};

export function ImagePreview({ images, alt = 'Image', className }: ImagePreviewProps) {
  const urls = Array.isArray(images) ? images : [images];
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (urls.length === 0) return null;

  return (
    <div className={cn('relative w-full flex flex-col items-center', className)}>
      <Carousel setApi={setApi} className="w-full max-w-3xl">
        <CarouselContent>
          {urls.map((url, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <div className="relative w-full h-[400px] bg-card rounded-[var(--radius)] overflow-hidden border border-border">
                <Image
                  src={url}
                  alt={`${alt} ${index + 1}`}
                  fill
                  className="object-contain bg-secondary"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {urls.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground hover:bg-primary/90" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground hover:bg-primary/90" />
          </>
        )}
      </Carousel>

      {/* Footer showing current slide info */}
      {urls.length > 1 && (
        <div className="text-muted-foreground py-2 text-center text-sm">
          Slide {current} of {count}
        </div>
      )}
    </div>
  );
}
