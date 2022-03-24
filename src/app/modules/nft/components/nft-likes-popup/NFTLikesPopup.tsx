import {
  Image,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import { NftLikes } from '../../../../mocks';
import * as styles from './styles';

interface INFTLikesPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NFTLikesPopup = ({ isOpen, onClose }: INFTLikesPopupProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={'inside'}>
      <ModalOverlay />
      <ModalContent maxW={'608px'}>
        <ModalHeader pb={'20px !important'}>Likes: {NftLikes.length}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={'0 !important'}>
          <SimpleGrid columns={5} spacingX={'22px'} spacingY={'32px'}>
            {NftLikes.map((like, i) => (
              <LinkBox key={i} {...styles.UserStyle}>
                <Image src={like.avatar} />
                <LinkOverlay href={'#'}>
                  <Text>{like.name}</Text>
                </LinkOverlay>
              </LinkBox>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
