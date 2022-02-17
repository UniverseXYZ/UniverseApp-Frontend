import { Box, BoxProps, Text } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Navigation, Pagination } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { INFT } from '../../types';
import {
  NFTItemAsset,
  NFTItemAuctionTimer,
  NFTItemBindings,
  NFTItemFooter,
  NFTItemPrice,
  NFTItemPriceInfo,
} from './components';
import { ItemWrapper } from '../../../../components';
import * as styles from './styles';


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
//TODO make Layout for IMoreNftBackend
interface INftItemProps {
  nft: INft;
  // nft: IMoreNftBackend;
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

      <Box{...styles.AssetContainerStyle} borderRadius={renderHeader ? '' : '12px 12px 0 0'}>
        {!bundleNFTs?.length
          ? <NFTItemAsset NFT={nft} renderAssetLabel={renderAssetLabel} />
          : (
            <Box {...styles.SwiperStyle}>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={!showAuctionTimer && {
                  dynamicBullets: true,
                  clickable: true,
                }}
                loop={true}
              >
                {[nft, ...bundleNFTs].map((NFT, i) => (
                  <SwiperSlide key={i}>
                    <NFTItemAsset NFT={NFT} renderAssetLabel={renderAssetLabel} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )
        }

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
            /*TODO: remove +1 trick*/
            bundleNFTsLength={bundleNFTs?.length ? bundleNFTs.length + 1 : 0}
          />
        )}
      </Box>
    </ItemWrapper>
  );
};
