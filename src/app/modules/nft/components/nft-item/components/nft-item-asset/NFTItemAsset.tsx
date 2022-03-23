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
import { getArtworkType, getArtworkTypeByUrl } from '../../../../../../helpers';

interface INFTItemAssetProps {
  NFT: INFT;
  renderAssetLabel?: ((NFT: INFT) => React.ReactNode) | null;
  orderEnd?: number;
  isHover?: boolean;
}
export const NFTItemAsset = (props: INFTItemAssetProps) => {
  const { NFT, renderAssetLabel, orderEnd, isHover } = props;

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const isImage = isNFTAssetImage(NFT.artworkTypes);
  const isVideo = isNFTAssetVideo(NFT.artworkTypes);
  const isAudio = isNFTAssetAudio(NFT.artworkTypes);

  const previewUrl = NFT.previewUrl || NFT.thumbnailUrl || NFT.originalUrl;
  const previewArtworkType = getArtworkTypeByUrl(previewUrl);
  const isImagePreview = !previewArtworkType || isNFTAssetImage([previewArtworkType]);

  const gifUrl = NFT.gifUrl;

  const [showCountdown, setShowCountdown] = useState(!!orderEnd && orderEnd > Math.floor(new Date().getTime() / 1000));
  const [showError, setShowError] = useState(false);

  return (
    <Box ref={ref} pos={'relative'}>
      {NFT.artworkTypes && NFT.artworkTypes.length && !showError ? 
        <Box {...styles.AssetStyle(width)}>
          {isVideo &&
            <>
              {isImagePreview
                ? <Image src={isHover && gifUrl ? gifUrl : previewUrl} onError={() => setShowError(true)} alt={NFT.name}  />
                : <video src={NFT.videoUrl || NFT.thumbnailUrl} onError={() => setShowError(true)} />}
            </>
           || isImage && (<Image src={NFT.thumbnailUrl} onError={() => {console.log("erroring"); setShowError(true);}} alt={NFT.name} />)
           || isAudio && (<Image src={AudioNFTPreviewImage} onError={() => setShowError(true)} alt={NFT.name} />)}
        </Box> : 
        <Box {...styles.BrokenAssetStyle(width)}>
          <NFTAssetBroken _before={{ borderRadius: '6px 6px 0 0' }} />
        </Box>
      }

      {renderAssetLabel === null ? null :
        renderAssetLabel ? renderAssetLabel(NFT) : (<NFTItemAssetType NFT={NFT} />)
      }
      {!!orderEnd && showCountdown && <NFTItemAuctionCountdown auctionExpireDate={new Date(orderEnd * 1000)} onAuctionTimeOut={() => setShowCountdown(false)} />}
    </Box>
  );
};
