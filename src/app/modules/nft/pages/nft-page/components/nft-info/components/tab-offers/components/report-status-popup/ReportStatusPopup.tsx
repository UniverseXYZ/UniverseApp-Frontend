import {
  Box,
  Button,
  Heading,
  Image,
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

interface IReportStatusPopupProps {
  status: Status;
  onClose: () => void;
}

export const ReportStatusPopup = ({ status, onClose }: IReportStatusPopupProps) => {

  return (
    <Modal isCentered isOpen={status !== Status.HIDDEN} onClose={onClose}>
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
              <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>Your report has been received. Thank you for keeping Universe safe!</Text>

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
