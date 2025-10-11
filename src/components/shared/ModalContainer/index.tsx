'use client';

import React, { useEffect, useState } from 'react';

import Button, { ButtonVariant } from '@/components/shared/Button';
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

import Heading from '../Heading';
import Paragraph from '../Paragraph';

interface ModalContainerProps {
  /** Render prop to get open function */
  children: (open: () => void) => React.ReactNode;

  /** Modal title and description */
  title?: string;
  description?: string;

  /** Content renderer, receives close function */
  content?: (close: () => void) => React.ReactNode;

  /** Optional submit button configuration */
  submitButton?: {
    variant?: ButtonVariant;
    label: string;
    type?: 'button' | 'submit' | 'reset';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: (close: () => void) => void | Promise<any>;
    loading?: boolean;
    disabled?: boolean;
  };

  closeButton?: boolean;
  showCloseIcon?: boolean;

  className?: string;
  closeOnOutsideClick?: boolean;
  onClose?: () => void;

  /** Modal size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | '2xl' | '4xl';

  /**
   * Automatically open modal when true or when function returns true
   */
  defaultOpen?: boolean | (() => boolean);
}

const sizeClasses: Record<NonNullable<ModalContainerProps['size']>, string> = {
  'xs': 'max-w-[400px]',
  'sm': 'max-w-[600px]',
  'md': 'max-w-[800px]',
  'lg': 'max-w-[1000px]',
  '2xl': 'max-w-[1200px]',
  '4xl': 'max-w-[1400px]',
};

export default function ModalContainer({
  children,
  title,
  description,
  content,
  submitButton,
  closeButton = true,
  showCloseIcon = false,
  className,
  closeOnOutsideClick = true,
  onClose,
  size = 'sm',
  defaultOpen,
}: ModalContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    onClose?.();
  };

  useEffect(() => {
    if (typeof defaultOpen === 'function' ? defaultOpen() : defaultOpen) {
      open();
    }
  }, [defaultOpen]);

  return (
    <>
      {children(open)}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent
            showCloseButton={showCloseIcon || !closeButton}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={closeOnOutsideClick ? undefined : (e) => e.preventDefault()}
            className={cn(
              'w-full max-h-[90vh] overflow-y-auto rounded-lg px-5 py-6 sm:px-6 sm:py-7',
              sizeClasses[size],
              className
            )}
          >
            <div className="space-y-5">
              {(title || description) && (
                <div className="space-y-1.5">
                  {title && <Heading size="lg">{title}</Heading>}
                  {description && (
                    <div className="mt-3">
                      <Paragraph>{description}</Paragraph>
                    </div>
                  )}
                </div>
              )}

              {content && <div>{content(close)}</div>}

              {(closeButton || submitButton) && (
                <div className="flex justify-end items-center gap-3 pt-2">
                  {closeButton && (
                    <Button type="button" variant="muted" onClick={close}>
                      Close
                    </Button>
                  )}
                  {submitButton && (
                    <Button
                      type={submitButton.type ?? 'button'}
                      variant={submitButton.variant}
                      onClick={() => submitButton.onClick?.(close)}
                      loading={submitButton.loading}
                      disabled={submitButton.disabled}
                    >
                      {submitButton.label}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}
