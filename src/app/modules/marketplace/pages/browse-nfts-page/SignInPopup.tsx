import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

// TODO: This is a temporary solution, remove once we release version 1

interface ISigninPopup {
    isOpen: boolean;
    onModalClose: () => void;
}

export const SigninPopup = ({ isOpen, onModalClose }: ISigninPopup) => {

  return (
    <Modal isOpen={isOpen} onClose={onModalClose} closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent maxW={'450px'} top={'5rem'}>
        <ModalHeader sx={{
          pt: '40px !important',
          pb: '20px !important',
          textAlign: 'center',
        }}>Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={'0 !important'}>
          <Text sx={{
            textAlign: 'center',
            m: 'auto',
            mb: '30px',
            w: '300px',
          }}>Please, sign in before listing an item</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
