import { Box, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMeasure } from 'react-use';

import AudioNFTPreviewImage from '../../../../../../../assets/images/v2/audio-nft-preview.png';

import { INFT } from '../../../../types';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';
import * as styles from './styles';
import { NFTItemAuctionCountdown } from '..';
import { NFTItemAssetType } from './components';
import { NFTAssetBroken } from '../../../../pages/nft-page/components/nft-asset-broken';

interface INFTItemAssetProps {
  NFT: INFT;
  renderAssetLabel?: ((NFT: INFT) => React.ReactNode) | null;
  orderEnd?: number;
}
export const NFTItemAsset = ({ NFT, renderAssetLabel, orderEnd }: INFTItemAssetProps) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const isImage = isNFTAssetImage(NFT.artworkType);
  const isVideo = isNFTAssetVideo(NFT.artworkType);
  const isAudio = isNFTAssetAudio(NFT.artworkType);

  const [showCountdown, setShowCountdown] = useState(!!orderEnd &&  orderEnd > new Date().getTime())

  return (
    <Box ref={ref} pos={'relative'}>

      <Box {...styles.AssetStyle(width)}>
        {!NFT.artworkType && <NFTAssetBroken/>}
        {isImage && (<Image src={NFT.thumbnailUrl} alt={NFT.name} />)}
        {isVideo && (<video src={NFT.thumbnailUrl} />)}
        {isAudio && (<Image src={AudioNFTPreviewImage} alt={NFT.name} />)}
      </Box>

      {renderAssetLabel === null ? null :
        renderAssetLabel ? renderAssetLabel(NFT) : (<NFTItemAssetType NFT={NFT} />)
      }
      {!!orderEnd && showCountdown && <NFTItemAuctionCountdown auctionExpireDate={new Date(orderEnd)} onAuctionTimeOut={() => setShowCountdown(false)} />}
    </Box>
  );
};
