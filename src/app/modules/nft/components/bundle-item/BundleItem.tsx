import { Box, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { IERC721BundleAssetType, INFT, IOrder } from '../../types';
import { ItemWrapper } from '../../../../components';
import * as styles from '../nft-item/styles';
import { NFTItemAsset, NFTItemFooter, NFTItemRelation } from '../nft-item/components';
import { NFTRelationType } from '../../enums';

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

  // TODO: remove
  renderNFTAdditions?: React.ReactNode | null;

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
    renderNFTAdditions,
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
        <LinkOverlay href={`/v2/bundle/${order.hash}`} display={'contents'}>
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
                        <NFTItemAsset NFT={NFT} />
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
                      <NFTItemRelation
                        type={NFTRelationType.CREATOR}
                        image={NFTs[0].owner?.profileImageUrl ?? ''}
                        value={NFTs[0].owner?.displayName ?? ''}
                        linkParam={NFTs[0].owner?.universePageUrl ?? ''}
                      />
                    </Box>
                  </Box>
                </>
              )
            }

            {renderFooter === null ? null :
              renderFooter ? renderFooter(NFTs, order) : (
                <NFTItemFooter
                  NFT={NFTs[0]}
                  renderNFTAdditions={renderNFTAdditions}
                  bundleNFTsLength={NFTs.length}
                />
              )
            }
          </Box>
        </LinkOverlay>
      </LinkBox>
    </ItemWrapper>
  );
};
