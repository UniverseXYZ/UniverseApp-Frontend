import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { useMeasure } from 'react-use';

import { INFT } from '../../../../types';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';
import { NFTItemAssetAudioLabel, NFTItemAssetVideoLabel } from './components';
import * as styles from './styles';

interface INFTItemAssetProps {
  NFT: INFT;
  renderAssetLabel?: React.ReactNode;
}

export const NFTItemAsset = ({ NFT, renderAssetLabel }: INFTItemAssetProps) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const isImage = isNFTAssetImage(NFT.artworkType);
  const isVideo = isNFTAssetVideo(NFT.artworkType);
  const isAudio = isNFTAssetAudio(NFT.artworkType);

  return (
    <Box ref={ref} pos={'relative'}>
      <Box {...styles.AssetStyle(width)}>
        {isImage && (<Image src={NFT.thumbnailUrl} alt={NFT.name} />)}
        {isVideo && (<video src={NFT.thumbnailUrl} />)}
      </Box>

      <Box {...styles.AssetLabelContainerStyle}>
        {renderAssetLabel || renderAssetLabel === null ? renderAssetLabel : (
          <>
            {isVideo && (<NFTItemAssetVideoLabel />)}
            {isAudio && (<NFTItemAssetAudioLabel />)}
          </>
        )}
      </Box>
    </Box>
  );
};
