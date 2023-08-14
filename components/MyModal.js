// Modal.js

import { useState } from "react";
import { Modal, Text, Button, Center } from "@mantine/core";

export default function MyModal({ open, onClose, msg }) {
  return (
    <Modal.Root opened={open} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header bg="indigo.4" c="white">
          <Modal.Title>
            <Text fw={700} fz="md">
              Success
            </Text> 
          </Modal.Title>  
          <Modal.CloseButton bg="indigo.2" />    
        </Modal.Header>   
        <Modal.Body>
          <Text mt="md">{msg}</Text>
          <Center>
            <Button mt="md" onClick={onClose}>
              Ok      
            </Button>      
          </Center>
        </Modal.Body>
      </Modal.Content>      
    </Modal.Root>
  );
}