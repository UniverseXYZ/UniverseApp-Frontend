import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

import { INFT } from '../../../../../../types';
import { isNFTAssetAudio, isNFTAssetVideo } from '../../../../../../helpers';
import { NFTItemAssetVideoLabel } from './NFTItemAssetVideoLabel';
import { NFTItemAssetAudioLabel } from './NFTItemAssetAudioLabel';
import * as styles from './styles';

interface INFTItemAssetTypeProps extends BoxProps {
  NFT: INFT;
}

export const NFTItemAssetType = ({ NFT, ...boxStyles }: INFTItemAssetTypeProps) => {
  const isVideo = isNFTAssetVideo(NFT.artworkType);
  const isAudio = isNFTAssetAudio(NFT.artworkType);

  return (
    <Box {...styles.AssetLabelContainerStyle} {...boxStyles}>
      {isVideo && (<NFTItemAssetVideoLabel />)}
      {isAudio && (<NFTItemAssetAudioLabel />)}
    </Box>
  );
};
