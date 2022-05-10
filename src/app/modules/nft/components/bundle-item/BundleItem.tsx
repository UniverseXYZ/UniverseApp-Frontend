import { Box, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ItemWrapper } from '@app/components';

import { IERC721BundleAssetType, INFT, IOrder } from '../../types';
import * as styles from '../nft-card/NFTCard.styles';
import { NFTCardAsset, NFTCardFooter, BundleLabel } from '../nft-card/components';
// import { NFTRelationType } from '../../enums';

interface IBundleItemProps {
  NFTs: INFT[];
  order: IOrder;

  isSelected?: boolean;
  selectedLabel?: string;
  showAssetBubbles?: boolean;

  renderHeader?: ((NFTs: INFT[], order: IOrder) => React.ReactNode) | null;
  renderAsset?: ((NFT: INFT, order: IOrder) => React.ReactNode) | null;
  renderContent?: ((NFTs: INFT[], order: IOrder) => React.ReactNode) | null;
  renderFooter?: ((NFTs: INFT[], order: IOrder) => React.ReactNode) | null;

  onClick?: (e: React.MouseEvent<HTMLElement>, NFTs: INFT[], order: IOrder) => void;
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
                  <Text fontSize={'14px'} fontWeight={700} mb={'12px'}>
                    {(order.make.assetType as IERC721BundleAssetType).bundleName}
                  </Text>

                  <Box mb={'14px'}>
                    <Box>
                      {/*<NFTItemRelation*/}
                      {/*  type={NFTRelationType.CREATOR}*/}
                      {/*  image={NFTs[0].owner?.profileImageUrl ?? ''}*/}
                      {/*  value={NFTs[0].owner?.displayName || NFTs[0]._ownerAddress || ''}*/}
                      {/*  linkParam={NFTs[0].owner?.universePageUrl ?? ''}*/}
                      {/*  externalOwner={!NFTs[0].owner?.displayName}*/}
                      {/*/>*/}
                    </Box>
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
