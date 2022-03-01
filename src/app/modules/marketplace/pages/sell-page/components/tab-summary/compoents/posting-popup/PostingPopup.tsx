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
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useMarketplaceSellData } from '../../../../hooks';
import { Status } from './enums';
import * as styles from './styles';
import { Loading } from '../../../../../../../../components';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../../../../nft/helpers';
import { NFTAssetVideo } from '../../../../../../../nft/pages/nft-page/components/nft-asset-video';
import AudioNFTPreviewImage from '../../../../../../../../../assets/images/v2/audio-nft-preview.png';

interface IPostingPopupProps {
  status: Status;
  onClose: () => void;
}

export const PostingPopup = ({ status, onClose }: IPostingPopupProps) => {
  const { nft } = useMarketplaceSellData();
  const isImage = isNFTAssetImage(nft.artworkType);
  const isVideo = isNFTAssetVideo(nft.artworkType);
  const isAudio = isNFTAssetAudio(nft.artworkType);
  const router = useHistory();

  const handleClickViewListing = useCallback(() => {
    router.push(`/nft/${nft.collection?.address}/${nft.tokenId}`);
  }, [nft]);

  const handleClickMyNFTs = useCallback(() => {
    router.push(`/my-nfts`);
  }, []);

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
              <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>You have successfully posted your listing</Text>

              {isImage && (<Image src={nft.thumbnailUrl} {...styles.AssetCongratsStyle} alt={nft.name} />)}
              {isVideo && (<NFTAssetVideo video={nft.thumbnailUrl} {...styles.AssetCongratsStyle}/>)}
              {isAudio && (<Image src={AudioNFTPreviewImage} {...styles.AssetCongratsStyle} alt={nft.name} />)}

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
