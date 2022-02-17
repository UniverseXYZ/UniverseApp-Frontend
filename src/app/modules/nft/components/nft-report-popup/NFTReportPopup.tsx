import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Select } from '../../../../components';

interface INFTReportPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NFTReportPopup = ({ isOpen, onClose, }: INFTReportPopupProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalHeader sx={{
          pt: '40px !important',
          pb: '20px !important',
          textAlign: 'center',
        }}>Report this item</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={'0 !important'}>
          <Text sx={{
            textAlign: 'center',
            m: 'auto',
            mb: '30px',
            w: '300px',
          }}>Explain why you think this item should be removed from marketplace</Text>

          <FormControl mb={'20px'}>
            <FormLabel>Reason</FormLabel>
            <Select
              label={'Select a reason'}
              items={[
                'Copyright infringement',
                'Explict and sensitive content',
                'Other',
              ]}
              value={null}
              buttonProps={{
                size: 'lg',
                width: '100%',
              }}
              containerProps={{
                width: '100%',
              }}
              popoverContentProps={{
                width: '100%',
              }}
            />
          </FormControl>

          <FormControl mb={'72px'}>
            <FormLabel>Message</FormLabel>
            <Input placeholder='Tell us some details' />
          </FormControl>

          <Flex justifyContent={'center'}>
            <Button variant={'outline'} mr={'15px'} onClick={onClose}>Cancel</Button>
            <Button boxShadow={'lg'} onClick={onClose}>Report</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
