import { Box, Center } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMeasure } from 'react-use';

import AudioNFTPreviewImage from '@assets/images/v2/audio-nft-preview.png';
import { Loading } from '@app/components';
import { INFT } from '@app/modules/nft/types';

import * as styles from './styles';
import { NFTItemAuctionCountdown } from '..';
import { NFTCardImageAsset, NFTCardVideoAsset, NFTItemAssetType } from './components';
import { NFTAssetBroken } from '../../../../pages/nft-page/components/nft-asset-broken';
import { useNFTAsset } from './hooks';

interface INFTItemAssetProps {
  NFT: INFT;
  renderAssetLabel?: ((NFT: INFT) => React.ReactNode) | null;
  orderEnd?: number;
}

export const NFTItemAsset = (props: INFTItemAssetProps) => {
  const { NFT, renderAssetLabel, orderEnd } = props;

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [isHover, setIsHover] = useState(false);

  const { asset, preview } = useNFTAsset(NFT);

  const [state, setState] = useState<'loading' | 'error' | 'loaded'>(asset.url ? 'loading' : 'error');

  return (
    <Box ref={ref} pos={'relative'}>
      {state === 'error' && (
        <Box {...styles.BrokenAssetStyle(width)}>
          <NFTAssetBroken _before={{ borderRadius: '6px 6px 0 0' }} />
        </Box>
      )}
      {(state === 'loading' || state === 'loaded') && (
        <Box {...styles.AssetStyle(width)}>
          {asset.type === 'image' && (
            <NFTCardImageAsset
              assetUrl={asset.url}
              NFT={NFT}
              onLoadingComplete={() => setState('loaded')}
              onError={() => setState('error')}
            />
          )}

          {asset.type === 'video' && (
            <NFTCardVideoAsset
              assetUrl={asset.url}
              preview={preview}
              NFT={NFT}
              isHover={isHover}
              onLoadingComplete={() => setState('loaded')}
              onError={() => setState('error')}
            />
          )}

          {asset.type === 'audio' && (
            <NFTCardImageAsset
              assetUrl={AudioNFTPreviewImage}
              NFT={NFT}
              onLoadingComplete={() => setState('loaded')}
              onError={() => setState('error')}
            />
          )}
        </Box>
      )}

      {state === 'loading' && (
        <Center boxSize={`${width}px`} pos={'absolute'} top={0} left={0}>
          <Loading />
        </Center>
      )}

      {renderAssetLabel === null ? null :
        renderAssetLabel ? renderAssetLabel(NFT) : (<NFTItemAssetType NFT={NFT} />)
      }
      {!!orderEnd && <NFTItemAuctionCountdown date={new Date(orderEnd * 1000)} />}
    </Box>
  );
};
