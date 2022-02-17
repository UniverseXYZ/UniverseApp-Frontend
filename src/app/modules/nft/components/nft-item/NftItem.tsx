import {
  Box, BoxProps,
  Text, TextProps,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useBoolean } from 'react-use';

import { INft } from '../../types';
import {
  NFTItemAssetAudioLabel,
  NFTItemAssetVideoLabel,
  NFTItemHeader,
  NFTItemAsset,
  NFTItemAuctionTimer,
} from './components';
import { ItemWrapper } from '../../../../components';

interface IStyles {
  assetContainer: BoxProps;
  assetLabelContainer: BoxProps;
  nftName: TextProps;
  addition: TextProps;
}

const styles: IStyles = {
  assetContainer: {
    borderRadius: '6px',
    my: '16px',
    overflow: 'hidden',
    position: 'relative',
  },
  assetLabelContainer: {
    display: 'flex',
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
  },
  nftName: {
    fontSize: '14px',
    fontWeight: 700,
    mb: '10px',
  },
  addition: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#00000066',
  },
};

interface INftItemProps {
  nft: INft;
  isSelected?: boolean;
  selectedLabel?: string;
  onAuctionTimeOut?: () => void;

  showAuctionTimer?: boolean;
  assetLabel?: React.ReactNode;
  assetLabelContainerProps?: BoxProps;
}

export const NftItem = (
  {
    nft,
    isSelected,
    selectedLabel,
    onAuctionTimeOut,
    showAuctionTimer = true,
    assetLabel,
    assetLabelContainerProps,
  }: INftItemProps
) => {
  const [existAuctionTimer, toggleExistAuctionTimer] = useBoolean(!!nft.auctionExpDate);

  const handleAuctionTimeOut = useCallback(() => {
    toggleExistAuctionTimer(false);
    onAuctionTimeOut && onAuctionTimeOut();
  }, [onAuctionTimeOut]);

  return (
    <ItemWrapper isBundle={nft.tokenIds.length > 1} isSelected={isSelected} selectedLabel={selectedLabel}>

      <NFTItemHeader nft={nft} />

      <Box {...styles.assetContainer}>

        <NFTItemAsset nft={nft} showSwiperPagination={!showAuctionTimer || !existAuctionTimer} />

        <Box {...styles.assetLabelContainer} {...assetLabelContainerProps}>
          {assetLabel ? assetLabel : (
            <>
              {nft.isAudio && (<NFTItemAssetAudioLabel />)}
              {nft.isVideo && (<NFTItemAssetVideoLabel />)}
            </>
          )}
        </Box>

        {showAuctionTimer && existAuctionTimer && (
          <NFTItemAuctionTimer expDate={nft.auctionExpDate} onAuctionTimeOut={handleAuctionTimeOut}  />
        )}
      </Box>

      <Text {...styles.nftName}>{nft.name}</Text>
      <Text {...styles.addition}>{nft.tokenIds?.length ?? 0}/{nft.numberOfEditions}</Text>
    </ItemWrapper>
  );
};
