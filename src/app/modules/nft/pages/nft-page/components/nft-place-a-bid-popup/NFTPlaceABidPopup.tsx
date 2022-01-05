import {
  Box,
  Button,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay, Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import * as styles from './styles';
import { Checkbox } from '../../../../../../components';

interface INFTPlaceABidPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NFTPlaceABidPopup = ({ isOpen, onClose, }: INFTPlaceABidPopupProps) => {
  const [agree, setAgree] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          <Heading {...styles.TitleStyle}>Place a bid</Heading>

          <Box mb={'41px'}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, veritatis.
          </Box>

          <Checkbox size={'lg'} isChecked={agree} onChange={(e) => setAgree(e.target.checked)}>
            <Text fontSize={'12px'} fontWeight={400}>
              By checking this box, I agree to Universe’s <Link textDecor={'underline'} target={'_blank'} href={'https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper'}>Terms of Service</Link>
            </Text>
          </Checkbox>

          <Box {...styles.ButtonsContainerStyle}>
            <Button boxShadow={'lg'} disabled={!agree}>Place Bid</Button>
            <Button variant={'outline'}>Convert ETH</Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
