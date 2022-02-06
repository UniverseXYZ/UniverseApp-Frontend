import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

interface INFTAssetFullscreenProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export const NFTAssetFullscreen = ({ children, isOpen }: INFTAssetFullscreenProps) => {
  return (
    <Modal size={'full'} isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent bg={'black'} color={'white'} borderRadius={0}>
        <ModalBody p={0} height={'100vh'} m={'auto'}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
