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
      width={500}
      height={500}
      quality={25}
      onLoadingComplete={onLoadingComplete}
      onError={onError}
    />
  );
};
