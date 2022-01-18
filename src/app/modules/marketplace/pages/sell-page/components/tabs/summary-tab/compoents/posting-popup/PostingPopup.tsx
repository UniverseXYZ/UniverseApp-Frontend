import {
  Box,
  BoxProps,
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
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useMarketplaceSellData } from '../../../../../hooks';
import { Status } from './enums';
import * as styles from './styles';

const Loading = (props: BoxProps) => (
  <Box position={'relative'} display={'block'} h={'80px'} {...props}>
    <Box className="lds-roller" transform={'translate(-50%, -50%)'}>
      {Array(8).fill(null).map((_, i) => (<Box key={i} />))}
    </Box>
  </Box>
)

interface IPostingPopupProps {
  status: Status;
  onClose: () => void;
}

export const PostingPopup = ({ status, onClose }: IPostingPopupProps) => {
  const { nft } = useMarketplaceSellData();

  const router = useHistory();

  const handleClickViewListing = useCallback(() => {
    router.push(`/v2/nft/${nft.collection.address}/${nft.nft.tokenId}`);
  }, [nft]);

  const handleClickMyNFTs = useCallback(() => {
    router.push(`/my-nfts`);
  }, []);

  return (
    <Modal isOpen={status !== Status.HIDDEN} onClose={onClose}>
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
              <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>You have successfully bought the NFT</Text>

              <Image src={nft?.nft?.thumbnail_url} {...styles.AssetCongratsStyle} />

              <Box {...styles.ButtonsContainerStyle}>
                <Button boxShadow={'lg'} onClick={handleClickViewListing}>View listing</Button>
                <Button variant={'outline'} onClick={handleClickMyNFTs}>My NFTs</Button>
              </Box>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
};
