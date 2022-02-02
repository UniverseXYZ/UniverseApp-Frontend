import { Box, BoxProps, Text } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Navigation, Pagination } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { INFT } from '../../types';
import { NFTItemAsset, NFTItemFooter, NFTItemRelation } from './components';
import { ItemWrapper } from '../../../../components';
import * as styles from './styles';
import { NFTRelationType } from '../../enums';

interface INftItemProps {
  nft: INFT;
  bundleNFTs?: INFT[];
  isSelected?: boolean;
  selectedLabel?: string;

  renderHeader?: React.ReactNode | null;
  renderContent?: React.ReactNode | null;
  renderFooter?: React.ReactNode | null;
  renderNFTAdditions?: React.ReactNode | null;
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

    renderHeader = null,
    renderContent,
    renderFooter,
    renderNFTAdditions,
    renderAuctionTime,
    renderAssetLabel,

    assetLabelContainerProps,

    onClick,
    onAuctionTimeOut,
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
            <Text fontSize={'14px'} fontWeight={700} mb={'12px'}>{nft.name}</Text>

            <Box mb={'14px'}>
              <Box>
                <NFTItemRelation
                  type={NFTRelationType.CREATOR}
                  image={nft.creator?.profileImageUrl ?? ''}
                  value={nft.creator?.displayName ?? ''}
                />
                <NFTItemRelation
                  type={NFTRelationType.COLLECTION}
                  image={nft.collection?.coverUrl ?? ''}
                  value={nft.collection?.name ?? ''}
                />
                <NFTItemRelation
                  type={NFTRelationType.OWNER}
                  image={nft.owner?.profileImageUrl ?? ''}
                  value={nft.owner?.displayName ?? ''}
                />
              </Box>
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
