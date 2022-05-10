import NextImage from 'next/image';
import React from 'react';

import { INFT } from '@app/modules/nft/types';

interface INFTCardImageAssetProps {
  assetUrl: string;
  NFT: INFT;
  onLoadingComplete: () => void;
  onError: () => void;
}

export const NFTCardImageAsset = (props: INFTCardImageAssetProps) => {
  const { assetUrl, NFT, onLoadingComplete, onError } = props;

  return (
    <NextImage
      src={assetUrl}
      alt={NFT.name}
      width={800}
      height={800}
      onLoadingComplete={onLoadingComplete}
      onError={onError}
    />
  );
};
