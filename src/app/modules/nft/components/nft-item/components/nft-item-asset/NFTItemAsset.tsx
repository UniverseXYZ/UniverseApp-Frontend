import { Box, Center, Image, useImage } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMeasure } from 'react-use';

import AudioNFTPreviewImage from '../../../../../../../assets/images/v2/audio-nft-preview.png';

import { INFT } from '../../../../types';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';
import * as styles from './styles';
import { NFTItemAuctionCountdown } from '..';
import { NFTItemAssetType } from './components';
import { NFTAssetBroken } from '../../../../pages/nft-page/components/nft-asset-broken';
import { getArtworkTypeByUrl } from '../../../../../../helpers';
import { Loading } from '../../../../../../components';

interface INFTItemAssetProps {
  NFT: INFT;
  renderAssetLabel?: ((NFT: INFT) => React.ReactNode) | null;
  orderEnd?: number;
}
export const NFTItemAsset = (props: INFTItemAssetProps) => {
  const { NFT, renderAssetLabel, orderEnd } = props;

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [isHover, setIsHover] = useState(false);

  const isImage = isNFTAssetImage(NFT.artworkTypes);
  const isVideo = isNFTAssetVideo(NFT.artworkTypes);
  const isAudio = isNFTAssetAudio(NFT.artworkTypes);

  const previewUrl = NFT.previewUrl || NFT.thumbnailUrl || NFT.originalUrl;
  const previewArtworkType = getArtworkTypeByUrl(previewUrl);
  const isImagePreview = !previewArtworkType || isNFTAssetImage([previewArtworkType]);

  const gifUrl = NFT.gifUrl;

  const [showCountdown, setShowCountdown] = useState(!!orderEnd && orderEnd > Math.floor(new Date().getTime() / 1000));
  const [showError, setShowError] = useState(false);

  const imageState = useImage({ src: isImage ? NFT.thumbnailUrl : undefined });

  return (
    <Box 
      ref={ref} 
      pos={'relative'} 
      onMouseEnter={() => {
        setIsHover(true);
      }} 
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {NFT.artworkTypes && NFT.artworkTypes.length && !showError ? 
        <Box {...styles.AssetStyle(width)}>
          {isVideo &&
            <>
              {isImagePreview
                ? <Image src={isHover && gifUrl ? gifUrl : previewUrl} onError={() => setShowError(true)} alt={NFT.name}  />
                : <video 
                    src={NFT.videoUrl || NFT.thumbnailUrl} 
                    onError={() => setShowError(true)}
                    onMouseOver={(event: any) => event.target.play()}
                    onMouseOut={(event: any) => event.target.pause()}
                    muted
                  />}
            </>
           || isImage && (
             <Image
               src={NFT.thumbnailUrl}
               fallback={<Center h={`${width}px`}><Loading /></Center>}
               onError={() => {setShowError(true)}} alt={imageState}
             />)
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
