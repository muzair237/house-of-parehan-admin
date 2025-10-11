'use client';

import React, { useState } from 'react';

import PasswordForm from '@/app/(protected)/users/_components/PasswordForm';
import { PasswordFormValues } from '@/domains/user/types';
import { useAppDispatch, useAppSelector } from '@/slices/hooks';
import userThunk from '@/slices/user/thunk';

import Button from '@/components/shared/Button';
import Heading from '@/components/shared/Heading';
import ModalContainer from '@/components/shared/ModalContainer';

import { handleApiCall } from '@/lib/utils/helper';

const UpdatePassword = () => {
  const { user } = useAppSelector((state) => state.Auth);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handlePasswordChange = async (values: PasswordFormValues, close: () => void) => {
    try {
      setIsLoading(true);
      const { success } = await handleApiCall(dispatch, userThunk.updatePassword, {
        id: user?._id,
        payload: values,
      });

      if (success) {
        close();
      }
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-6 border-t border-[var(--border)]">
      <Heading size="lg">Update Password</Heading>
      <p className="text-sm text-[var(--muted-foreground)] mb-4">
        For security reasons, please use a strong password.
      </p>

      <ModalContainer
        title="Update Password"
        closeButton={false}
        closeOnOutsideClick={false}
        content={(close) => (
          <PasswordForm
            isLoading={isLoading}
            onSubmit={(values) => handlePasswordChange(values, close)}
          />
        )}
      >
        {(open) => (
          <Button onClick={open} minimal>
            <Button>Update Password</Button>
          </Button>
        )}
      </ModalContainer>
    </div>
  );
};

export default UpdatePassword;
