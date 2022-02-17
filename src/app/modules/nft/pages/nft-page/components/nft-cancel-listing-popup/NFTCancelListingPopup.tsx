import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';

import * as styles from './styles';
import { IOrder } from '../../../../types';

interface INFTCancelListingPopupProps {
  order?: IOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const NFTCancelListingPopup = ({ order, isOpen, onClose, }: INFTCancelListingPopupProps) => {

  // TODO
  const handleCancelListing = useCallback(() => {
    console.log('handleCancelListing', order);
    onClose();
  }, [order, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          <Heading {...styles.TitleStyle} mb={'24px'}>Are you sure you want to cancel your listing?</Heading>

          <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>
            Canceling your listing will unpublish this sale from Universe and requires a transaction to make sure it will never be fulfilable.
          </Text>

          <Box {...styles.ButtonsContainerStyle}>
            <Button boxShadow={'lg'} onClick={handleCancelListing}>Cancel listing</Button>
            <Button variant={'outline'} onClick={onClose}>Go back</Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
