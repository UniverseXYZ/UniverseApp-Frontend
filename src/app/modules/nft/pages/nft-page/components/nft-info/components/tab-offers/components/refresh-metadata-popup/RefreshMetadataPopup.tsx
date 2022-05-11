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
import { Loading } from '../../../../../../../../../../components';

import { Status } from './enums';
import * as styles from './styles';

interface IRefreshMetadataPopupProps {
  status: Status;
  onClose: () => void;
}

export const RefreshMetadataPopup = ({ status, onClose }: IRefreshMetadataPopupProps) => {

  return (
    <Modal isCentered isOpen={status !== Status.HIDDEN} onClose={onClose} closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          {status === Status.PROCESSING && (
            <>
              <Heading {...styles.TitleStyle} mb={'10px'}>Processing...</Heading>
              <Loading />
            </>
          )}

          {status === Status.SUCCESS && (
            <>
              <Heading {...styles.TitleStyle} mb={'10px'}>Congratulations!</Heading>
              <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>The NFT has been queued for refresh. Please check again soon.</Text>

              <Box {...styles.ButtonsContainerStyle}>
                <Button boxShadow={'lg'} onClick={onClose}>Close</Button>
              </Box>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
};
