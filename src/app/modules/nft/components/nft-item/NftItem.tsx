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
import * as styles from './styles';

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

  const isImage = isNFTAssetImage(nft.artworkType);
  const isVideo = isNFTAssetVideo(nft.artworkType);
  const isAudio = isNFTAssetAudio(nft.artworkType);

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
        {...styles.AssetContainerStyle}
        borderRadius={renderHeader ? '' : '12px 12px 0 0'}
      >
        <NFTItemAsset nft={nft} bundleNFTs={bundleNFTs} showSwiperPagination={!showAuctionTimer} />

        <Box {...styles.AssetLabelContainerStyle} {...assetLabelContainerProps}>
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
      <Box {...styles.NFTContentStyle}>
        {renderContent || renderContent === null ? renderContent : (
          <>
            <Box {...styles.FirstContentRowStyle}>
              {renderNFTName || renderNFTName === null ? renderNFTName : <Text>{nft.name}</Text>}
              {/*TODO: provide price*/}
              {/*{renderNFTPrice || renderNFTPrice === null ? renderNFTPrice : (nft.price && (*/}
              {/*  <NFTItemPrice price={nft.price} />*/}
              {/*))}*/}
            </Box>

            <Box {...styles.SecondContentRowStyle}>
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
