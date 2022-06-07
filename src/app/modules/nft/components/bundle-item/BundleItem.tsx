import { Box, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ItemWrapper } from '@app/components';

import { INFT, IOrder, IOrderAssetTypeBundleListing, IOrderAssetTypeERC20 } from '../../types';
import * as styles from '../nft-card/NFTCard.styles';
import { NFTCardAsset, NFTCardFooter, BundleLabel } from '../nft-card/components';
// import { NFTRelationType } from '../../enums';

type IBundleOrder = IOrder<IOrderAssetTypeBundleListing, IOrderAssetTypeERC20>;

interface IBundleItemProps {
  NFTs: INFT[];
  order: IBundleOrder;

  isSelected?: boolean;
  selectedLabel?: string;
  showAssetBubbles?: boolean;

  renderHeader?: ((NFTs: INFT[], order: IBundleOrder) => React.ReactNode) | null;
  renderAsset?: ((NFT: INFT, order: IBundleOrder) => React.ReactNode) | null;
  renderContent?: ((NFTs: INFT[], order: IBundleOrder) => React.ReactNode) | null;
  renderFooter?: ((NFTs: INFT[], order: IBundleOrder) => React.ReactNode) | null;

  onClick?: (e: React.MouseEvent<HTMLElement>, NFTs: INFT[], order: IBundleOrder) => void;
}

export const BundleItem = (
  {
    NFTs,
    order,
    isSelected,
    selectedLabel,
    showAssetBubbles = true,
    renderHeader,
    renderAsset,
    renderContent,
    renderFooter,
    onClick,
  }: IBundleItemProps
) => {
  const bundleName = useMemo(() => {
    const assetType = order.make.assetType as IOrderAssetTypeBundleListing;
    return assetType.bundleName;
  }, [order]);

  return (
    <ItemWrapper
      isBundle={true}
      isSelected={isSelected}
      selectedLabel={selectedLabel}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        const prevent = ['swiper-button-next', 'swiper-button-prev', 'swiper-pagination-bullet']
          .some((className) => (e.target as HTMLElement).className.split(' ').includes(className));

        if (prevent) {
          e.preventDefault();
          return;
        }

        if (onClick) {
          e.preventDefault();
          onClick(e, NFTs, order);
        }
      }}
    >
      <LinkBox>
        <LinkOverlay href={`/bundle/${order.hash}`} display={'contents'}>
          {renderHeader === null ? null :
            renderHeader ? renderHeader(NFTs, order) : null}

          <Box {...styles.AssetContainerStyle} borderRadius={renderHeader ? '' : '12px 12px 0 0'}>
            <Box {...styles.SwiperStyle}>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={showAssetBubbles && {
                  dynamicBullets: true,
                  clickable: true,
                }}
                loop={true}
              >
                {NFTs.map((NFT, i) => (
                  <SwiperSlide key={i}>
                    {renderAsset === null ? null :
                      renderAsset ? renderAsset(NFT, order) : (
                        <NFTCardAsset NFT={NFT} />
                      )
                    }
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Box>
          <Box {...styles.NFTContentStyle}>
            {renderContent === null ? null :
              renderContent ? renderContent(NFTs, order) : (
                <>
                  <Text fontSize={'14px'} fontWeight={700} mb={'12px'}>{bundleName}</Text>

                  <Box mb={'14px'}>
                  {/*  bundle collections*/}
                  </Box>
                </>
              )
            }

            {renderFooter === null ? null :
              renderFooter ? renderFooter(NFTs, order) : (
                <NFTCardFooter NFT={NFTs[0]}>
                  <BundleLabel count={NFTs.length} />
                </NFTCardFooter>
              )
            }
          </Box>
        </LinkOverlay>
      </LinkBox>
    </ItemWrapper>
  );
};
