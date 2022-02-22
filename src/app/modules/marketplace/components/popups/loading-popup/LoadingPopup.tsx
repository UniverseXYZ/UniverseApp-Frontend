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
  ModalFooter,
} from '@chakra-ui/react';

import * as styles from './styles';
import { Loading } from '../../../../../components';
import { getEtherscanTxUrl} from '../../../../../../utils/helpers';
import { formatAddress } from '../../../../../../utils/helpers/format';

interface INFTCancelListingPopupProps {
  isOpen: boolean;
  heading: string;
  text: string;
  transactions: Array<any>;
  onClose: () => void;
}

export const LoadingPopup = ({isOpen, onClose, heading, text, transactions }: INFTCancelListingPopupProps) => {
  return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent maxW={'480px'} maxH={'400px'}>
          <ModalCloseButton />
          <ModalBody pt={'40px !important'} overflow='scroll'>
            <Heading {...styles.TitleStyle} mb={'24px'}>{heading}</Heading>

            <Loading />

            <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>
              {text}
            </Text>


            <Box  mt='5'>
              {transactions.map((tx, i) => (
                <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'} key={tx}>
                  Transaction hash #{i + 1}:{' '}
                  <a target="_blank" href={getEtherscanTxUrl(tx)} rel="noreferrer" style={{color: 'blue'}}>
                    {formatAddress(tx)}
                  </a>
                </Text>
              ))}
            </Box>


          </ModalBody>

          <ModalFooter justifyContent="center">
              <Button variant={'outline'} onClick={onClose}>Close</Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
  );
};
