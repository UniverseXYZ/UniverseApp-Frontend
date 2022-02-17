import { Box, BoxProps } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useBoolean } from 'react-use';

import { INft } from '../../types';
import {
  NFTItemAssetAudioLabel,
  NFTItemAssetVideoLabel,
  NFTItemHeader,
  NFTItemAsset,
  NFTItemAuctionTimer, NFTItemFooter,
} from './components';
import { ItemWrapper } from '../../../../components';


interface IStyles {
  assetContainer: BoxProps;
  assetLabelContainer: BoxProps;
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
};

interface INftItemProps {
  nft: INft;
  isSelected?: boolean;
  selectedLabel?: string;
  onAuctionTimeOut?: () => void;

  showAuctionTimer?: boolean;
  showNFTName?: boolean;
  showNFTPrice?: boolean;

  renderAssetLabel?: React.ReactNode;
  assetLabelContainerProps?: BoxProps;

  renderFooter?: React.ReactNode;
}

export const NftItem = (
  {
    nft,
    isSelected,
    selectedLabel,
    onAuctionTimeOut,
    showAuctionTimer = true,
    showNFTName,
    showNFTPrice,
    renderAssetLabel,
    assetLabelContainerProps,
    renderFooter,
  }: INftItemProps
) => {
  const [existAuctionTimer, toggleExistAuctionTimer] = useBoolean(!!nft.auctionExpDate);

  const handleAuctionTimeOut = useCallback(() => {
    toggleExistAuctionTimer(false);
    onAuctionTimeOut && onAuctionTimeOut();
  }, [onAuctionTimeOut]);

  return (
    <ItemWrapper isBundle={nft.tokenIds.length > 1} isSelected={isSelected} selectedLabel={selectedLabel}>

      {/*TODO: add render header*/}
      <NFTItemHeader nft={nft} />

      <Box {...styles.assetContainer}>

        <NFTItemAsset nft={nft} showSwiperPagination={!showAuctionTimer || !existAuctionTimer} />

        <Box {...styles.assetLabelContainer} {...assetLabelContainerProps}>
          {renderAssetLabel ? renderAssetLabel : (
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

      {renderFooter ? renderFooter : (
        <NFTItemFooter
          nft={nft}
          showNFTName={showNFTName}
          showNFTPrice={showNFTPrice}
        />
      )}
    </ItemWrapper>
  );
};
