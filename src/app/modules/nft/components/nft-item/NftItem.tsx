import { Box, BoxProps, Text } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

import { INFT, NFTArtworkType } from '../../types';
import {
  NFTItemAsset,
  NFTItemAssetAudioLabel,
  NFTItemAssetVideoLabel,
  NFTItemAuctionTimer,
  NFTItemBindings,
  NFTItemFooter,
  NFTItemPrice,
  NFTItemPriceInfo,
} from './components';
import { ItemWrapper } from '../../../../components';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../helpers';


interface IStyles {
  assetContainer: BoxProps;
  assetLabelContainer: BoxProps;
  NFTContent: BoxProps;
  firstContentRow: BoxProps;
  secondContentRow: BoxProps;
}

const styles: IStyles = {
  assetContainer: {
    overflow: 'hidden',
    position: 'relative',
    zIndex: 3,
  },
  assetLabelContainer: {
    display: 'flex',
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1,
  },
  NFTContent: {
    padding: '16px 14px 14px 14px',
    position: 'relative',
    zIndex: 4,
  },
  firstContentRow: {
    display: 'flex',
    fontSize: '14px',
    fontWeight: 700,
    justifyContent: 'space-between',
  },
  secondContentRow: {
    display: 'flex',
    fontSize: '11px',
    fontWeight: 600,
    justifyContent: 'space-between',
    color: '#00000066',
    mt: '12px',
    mb: '14px',
    alignItems: 'center',
  }
};

interface INftItemProps {
  nft: INFT;
  bundleNFTs?: INFT[];
  isSelected?: boolean;
  selectedLabel?: string;

  renderHeader?: React.ReactNode | null;
  renderContent?: React.ReactNode | null;
  renderFooter?: React.ReactNode | null;
  renderNFTName?: React.ReactNode | null;
  renderNFTPrice?: React.ReactNode | null;
  renderNFTAdditions?: React.ReactNode | null;
  renderNFTPriceInfo?: React.ReactNode | null;
  renderAuctionTime?: React.ReactNode | null;
  renderAssetLabel?: React.ReactNode;

  showAssetTypeLabels?: boolean;
  assetLabelContainerProps?: BoxProps;

  onClick?: (nft: INFT) => void;
  onAuctionTimeOut?: () => void;
}

export const NftItem = (
  {
    nft,
    bundleNFTs = [],
    isSelected,
    selectedLabel,
    onAuctionTimeOut,

    renderHeader = null,
    renderContent,
    renderFooter,
    renderNFTName,
    renderNFTPrice,
    renderNFTAdditions,
    renderNFTPriceInfo,
    renderAuctionTime,
    renderAssetLabel,

    showAssetTypeLabels = true,
    assetLabelContainerProps,

    onClick,
  }: INftItemProps
) => {
  const [showAuctionTimer, setShowAuctionTimer] = useState(false);

  const handleAuctionTimeOut = useCallback(() => {
    setShowAuctionTimer(false);
    onAuctionTimeOut && onAuctionTimeOut();
  }, [onAuctionTimeOut]);

  // TODO: auction
  // useEffect(() => {
  //   setShowAuctionTimer(nft.auctionExpDate && renderAuctionTime !== null);
  // }, [nft.auctionExpDate, renderAuctionTime]);

  const isAudio = isNFTAssetAudio(nft.artworkType);
  const isVideo = isNFTAssetVideo(nft.artworkType);
  const isImage = isNFTAssetImage(nft.artworkType);

  return (
    <ItemWrapper
      isBundle={!!(nft.numberOfEditions > 1 || bundleNFTs?.length)}
      isSelected={isSelected}
      selectedLabel={selectedLabel}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (['swiper-button-next', 'swiper-button-prev'].includes((e.target as HTMLElement).className)) {
          return;
        }
        onClick && onClick(nft);
      }}
    >
      {renderHeader}

      <Box
        {...styles.assetContainer}
        borderRadius={renderHeader ? '' : '12px 12px 0 0'}
      >
        <NFTItemAsset nft={nft} bundleNFTs={bundleNFTs} showSwiperPagination={!showAuctionTimer} />

        <Box {...styles.assetLabelContainer} {...assetLabelContainerProps}>
          {renderAssetLabel || renderAssetLabel === null ? renderAssetLabel : (
            showAssetTypeLabels && (
              <>
                {isAudio && (<NFTItemAssetAudioLabel />)}
                {isVideo && (<NFTItemAssetVideoLabel />)}
              </>
            )
          )}
        </Box>

        {/*TODO: auction*/}
        {/*{showAuctionTimer && (*/}
        {/*  renderAuctionTime ? renderAuctionTime : (*/}
        {/*    <NFTItemAuctionTimer expDate={nft.auctionExpDate} onAuctionTimeOut={handleAuctionTimeOut}  />*/}
        {/*  )*/}
        {/*)}*/}
      </Box>
      <Box {...styles.NFTContent}>
        {renderContent || renderContent === null ? renderContent : (
          <>
            <Box {...styles.firstContentRow}>
              {renderNFTName || renderNFTName === null ? renderNFTName : <Text>{nft.name}</Text>}
              {/*TODO: provide price*/}
              {/*{renderNFTPrice || renderNFTPrice === null ? renderNFTPrice : (nft.price && (*/}
              {/*  <NFTItemPrice price={nft.price} />*/}
              {/*))}*/}
            </Box>

            <Box {...styles.secondContentRow}>
              <NFTItemBindings creator={nft.creator} collection={nft.collection} owner={nft.owner} />
              {/*TODO: provide offer price*/}
              {/*{renderNFTPriceInfo || renderNFTPriceInfo === null ? renderNFTPriceInfo : (*/}
              {/*  <NFTItemPriceInfo offerPrice={nft.offerPrice} lastPrice={nft.lastPrice} />*/}
              {/*)}*/}
            </Box>
          </>
        )}

        {renderFooter || renderFooter === null ? renderFooter : (
          <NFTItemFooter
            nft={nft}
            renderNFTAdditions={renderNFTAdditions}
          />
        )}
      </Box>
    </ItemWrapper>
  );
};
