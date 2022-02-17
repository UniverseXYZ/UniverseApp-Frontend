import { Box, BoxProps } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

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

  renderHeader?: React.ReactNode | null;
  renderFooter?: React.ReactNode | null;

  renderFooterNFTName?: React.ReactNode | null;
  renderFooterNFTPrice?: React.ReactNode | null;
  renderFooterNFTAdditions?: React.ReactNode | null;
  renderFooterNFTPriceInfo?: React.ReactNode | null;

  renderAuctionTime?: React.ReactNode | null;
  renderAssetLabel?: React.ReactNode;
  assetLabelContainerProps?: BoxProps;

  onClick?: (nft: INft) => void;
  onAuctionTimeOut?: () => void;
}

export const NftItem = (
  {
    nft,
    isSelected,
    selectedLabel,
    onAuctionTimeOut,

    renderHeader,
    renderFooter,

    renderFooterNFTName,
    renderFooterNFTPrice,
    renderFooterNFTAdditions,
    renderFooterNFTPriceInfo,

    renderAuctionTime,
    renderAssetLabel,
    assetLabelContainerProps,

    onClick,
  }: INftItemProps
) => {
  const [showAuctionTimer, setShowAuctionTimer] = useState(false);

  const handleAuctionTimeOut = useCallback(() => {
    setShowAuctionTimer(false);
    onAuctionTimeOut && onAuctionTimeOut();
  }, [onAuctionTimeOut]);

  useEffect(() => {
    setShowAuctionTimer(nft.auctionExpDate && renderAuctionTime !== null);
  }, [nft.auctionExpDate, renderAuctionTime]);

  return (
    <ItemWrapper
      isBundle={nft.tokenIds.length > 1}
      isSelected={isSelected}
      selectedLabel={selectedLabel}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (['swiper-button-next', 'swiper-button-prev'].includes((e.target as HTMLElement).className)) {
          return;
        }
        onClick && onClick(nft);
      }}
    >

      {renderHeader || renderHeader === null ? renderHeader : (
        <NFTItemHeader nft={nft} />
      )}

      <Box {...styles.assetContainer}>
        <NFTItemAsset nft={nft} showSwiperPagination={!showAuctionTimer} />

        <Box {...styles.assetLabelContainer} {...assetLabelContainerProps}>
          {renderAssetLabel || renderAssetLabel === null ? renderAssetLabel : (
            <>
              {nft.isAudio && (<NFTItemAssetAudioLabel />)}
              {nft.isVideo && (<NFTItemAssetVideoLabel />)}
            </>
          )}
        </Box>

        {showAuctionTimer && (
          renderAuctionTime ? renderAuctionTime : (
            <NFTItemAuctionTimer expDate={nft.auctionExpDate} onAuctionTimeOut={handleAuctionTimeOut}  />
          )
        )}
      </Box>

      {renderFooter || renderFooter === null ? renderFooter : (
        <NFTItemFooter
          nft={nft}
          renderNFTName={renderFooterNFTName}
          renderNFTPrice={renderFooterNFTPrice}
          renderNFTAdditions={renderFooterNFTAdditions}
          renderNFTPriceInfo={renderFooterNFTPriceInfo}
        />
      )}
    </ItemWrapper>
  );
};
