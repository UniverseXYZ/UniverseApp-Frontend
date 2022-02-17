import { Box, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import React  from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Navigation, Pagination } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { INFT } from '../../types';
import { NFTItemAsset, NFTItemFooter, NFTItemRelation } from './components';
import { ItemWrapper } from '../../../../components';
import * as styles from './styles';
import { NFTRelationType } from '../../enums';

export interface INftItemProps {
  NFT: INFT;
  bundleNFTs?: INFT[];
  isSelected?: boolean;
  selectedLabel?: string;
  showAssetBubbles?: boolean;

  renderHeader?: ((NFT: INFT) => React.ReactNode) | null;
  renderAsset?: ((NFT: INFT) => React.ReactNode) | null;
  renderContent?: ((NFT: INFT) => React.ReactNode) | null;
  renderFooter?: React.ReactNode | null;

  // TODO: remove
  renderNFTAdditions?: React.ReactNode | null;

  onClick?: (NFT: INFT) => void;
}

export const NftItem = (
  {
    NFT,
    bundleNFTs = [],
    isSelected,
    selectedLabel,
    showAssetBubbles = true,

    renderHeader,
    renderAsset,
    renderContent,
    renderFooter,

    renderNFTAdditions,

    onClick,
  }: INftItemProps
) => {
  return (
    <ItemWrapper
      isBundle={!!(NFT.numberOfEditions > 1 || bundleNFTs?.length)}
      isSelected={isSelected}
      selectedLabel={selectedLabel}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        const prevent = ['swiper-button-next', 'swiper-button-prev', 'swiper-pagination-bullet']
          .some((className) => (e.target as HTMLElement).className.split(' ').includes(className));

        if (prevent) {
          e.preventDefault();
        }

        if (onClick) {
          e.preventDefault();
          onClick(NFT);
        }
      }}
    >
      <LinkBox>
        <LinkOverlay href={`/v2/nft/${NFT.collection?.address}/${NFT.tokenId}`} display={'contents'}>
          {renderHeader === null ? null :
            renderHeader ? renderHeader(NFT) : null}

          <Box {...styles.AssetContainerStyle} borderRadius={renderHeader ? '' : '12px 12px 0 0'}>
            {!bundleNFTs?.length
              ? renderAsset === null ? null :
                renderAsset ? renderAsset(NFT) : (
                  <NFTItemAsset NFT={NFT} />
                )
              : (
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
                    {[NFT, ...bundleNFTs].map((NFT, i) => (
                      <SwiperSlide key={i}>
                        {renderAsset === null ? null :
                          renderAsset ? renderAsset(NFT) : (
                            <NFTItemAsset NFT={NFT} />
                          )
                        }
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              )
            }
          </Box>
          <Box {...styles.NFTContentStyle}>
            {renderContent === null ? null :
              renderContent ? renderContent(NFT) : (
                <>
                  <Text fontSize={'14px'} fontWeight={700} mb={'12px'}>{NFT.name}</Text>

                  <Box mb={'14px'}>
                    <Box>
                      <NFTItemRelation
                        type={NFTRelationType.CREATOR}
                        image={NFT.creator?.profileImageUrl ?? ''}
                        value={NFT.creator?.displayName ?? ''}
                        linkParam={NFT.creator?.universePageUrl ?? ''}
                      />
                      <NFTItemRelation
                        type={NFTRelationType.COLLECTION}
                        image={NFT.collection?.coverUrl ?? ''}
                        value={NFT.collection?.name ?? ''}
                        linkParam={NFT.collection?.address ?? ''}
                      />
                      <NFTItemRelation
                        type={NFTRelationType.OWNER}
                        image={NFT.owner?.profileImageUrl ?? ''}
                        value={NFT.owner?.displayName ?? ''}
                        linkParam={NFT.owner?.universePageUrl ?? ''}
                      />
                    </Box>
                  </Box>
                </>
              )
            }

            {renderFooter || renderFooter === null ? renderFooter : (
              <NFTItemFooter
                NFT={NFT}
                renderNFTAdditions={renderNFTAdditions}
                /*TODO: remove +1 trick*/
                bundleNFTsLength={bundleNFTs?.length ? bundleNFTs.length + 1 : 0}
              />
            )}
          </Box>
        </LinkOverlay>
      </LinkBox>
    </ItemWrapper>
  );
};
