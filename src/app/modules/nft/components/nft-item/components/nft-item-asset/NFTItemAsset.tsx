import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import { useMeasure } from 'react-use';

import { INFT } from '../../../../types';
import { isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';
import { NFTItemAssetType } from './components';
import * as styles from './styles';

interface INFTItemAssetProps {
  NFT: INFT;
  renderAssetLabel?: ((NFT: INFT) => React.ReactNode) | null;
}

export const NFTItemAsset = ({ NFT, renderAssetLabel }: INFTItemAssetProps) => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const isImage = isNFTAssetImage(NFT.artworkType);
  const isVideo = isNFTAssetVideo(NFT.artworkType);

  return (
    <Box ref={ref} pos={'relative'}>
      <Box {...styles.AssetStyle(width)}>
        {isImage && (<Image src={NFT.thumbnailUrl} alt={NFT.name} />)}
        {isVideo && (<video src={NFT.thumbnailUrl} />)}
      </Box>

      {renderAssetLabel === null ? null :
        renderAssetLabel ? renderAssetLabel(NFT) : (<NFTItemAssetType NFT={NFT} />)
      }
    </Box>
  );
};
