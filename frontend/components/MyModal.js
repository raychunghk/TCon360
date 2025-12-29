
import { Button, Center, Modal, Text } from '@mantine/core';

export default function MyModal({ open, onClose, msg, isError = false }) {
  const title = isError ? 'Failed' : 'Success';
  const subjectColor = isError ? 'red.7' : 'indigo.4';
  const _handleModalClose = () => {
    isError = false;
    if (onClose) {
      onClose(); // Close the drawers
    }
  };
  return (
    <Modal.Root opened={open} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header bg={subjectColor} c="white">
          <Modal.Title>
            <Text fw={700} fz="md">
              {title}
            </Text>
          </Modal.Title>
          <Modal.CloseButton bg="indigo.2" />
        </Modal.Header>
        <Modal.Body>
          <Text mt="md">{msg}</Text>
          <Center>
            <Button mt="md" onClick={_handleModalClose}>
              Ok
            </Button>
          </Center>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
