import React, { useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';
import NextImage from 'next/image';

import { INFT } from '@app/modules/nft/types';

interface INFTCardVideoAssetProps {
  assetUrl: string;
  preview?: string;
  NFT: INFT;
  isHover?: boolean;
  onLoadingComplete: () => void;
  onError: () => void;
}

export const NFTCardVideoAsset = (props: INFTCardVideoAssetProps) => {
  const { assetUrl, preview, NFT, isHover, onLoadingComplete, onError } = props;

  const [previewError, setPreviewError] = useState(false);

  const showPreviewImage = useMemo(() => {
    return !previewError && (NFT.gifUrl || preview);
  }, [previewError, NFT, preview]);

  useEffectOnce(() => {
    if (!showPreviewImage) {
      onLoadingComplete();
    }
  });

  return (
    <>
      {!previewError && (NFT.gifUrl || preview) ? (
        <NextImage
          src={isHover ? `${(NFT.gifUrl || preview)}` : `${preview}`}
          alt={NFT.name}
          width={400}
          height={400}
          onLoadingComplete={onLoadingComplete}
          onError={() => setPreviewError(true)}
        />
      ) : (
        <video src={assetUrl || NFT.thumbnailUrl} onError={onError} />
      )}
    </>
  );
};
