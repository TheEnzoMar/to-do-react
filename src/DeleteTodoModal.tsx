import { Modal } from '@shopify/polaris';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  primaryAction: () => void;
  secondaryAction: () => void;
}

export const DeleteTodoModal = ({
  open,
  onClose,
  primaryAction,
  secondaryAction,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Are you sure you want to delete your todo item?`}
      primaryAction={{
        content: 'Confirm Delete',
        onAction: () => primaryAction(),
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => secondaryAction(),
        },
      ]}
    />
  );
};
