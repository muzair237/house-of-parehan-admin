'use client';

import React from 'react';

import Grid from '@/components/shared/Grid';
import { ImagePreview } from '@/components/shared/ImagePreview';
import ModalContainer from '@/components/shared/ModalContainer';
import Paragraph from '@/components/shared/Paragraph';

import { Option } from '@/lib/utils/types';

import Button from '../../Button';

interface RecordInfoProps {
  data: Option[];
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
}

const isImageUrl = (val: string) => /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(val);

export default function RecordInfo({ data, cols = 2 }: RecordInfoProps) {
  return (
    <Grid cols={cols}>
      {data.map((item, index) => {
        const value = item.value;

        if (
          (typeof value === 'string' && isImageUrl(value)) ||
          (Array.isArray(value) && value.every((v) => typeof v === 'string' && isImageUrl(v)))
        ) {
          return (
            <div key={index} className="flex flex-col gap-1">
              <Paragraph size="sm" variant="muted" className="font-medium">
                {item.label}
              </Paragraph>

              <ModalContainer
                title={item.label}
                content={() => <ImagePreview images={value} alt={item.label} />}
              >
                {(open) => (
                  <Button variant="secondary" size="sm" onClick={open}>
                    View {item.label}
                  </Button>
                )}
              </ModalContainer>
            </div>
          );
        }

        if (Array.isArray(value)) {
          return (
            <div key={index} className="flex flex-col gap-1">
              <Paragraph size="sm" variant="muted" className="font-medium">
                {item.label}
              </Paragraph>
              <ul className="list-disc pl-5 space-y-1">
                {value.map((val, i) => (
                  <li key={i} className="text-sm text-foreground">
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <div key={index} className="flex flex-col gap-1">
            <Paragraph size="sm" variant="muted" className="font-medium">
              {item.label}
            </Paragraph>
            <Paragraph size="sm">{value}</Paragraph>
          </div>
        );
      })}
    </Grid>
  );
}
