import { Box, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import React, { useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useHoverDirty } from 'react-use';
import { utils } from 'ethers';
import NextLink from 'next/link';

import { ICollection, IERC721AssetType, INFT, IUser, IOrder } from '../../types';
import { NFTItemAsset, NFTItemFooter, NFTItemRelation } from './components';
import { ItemWrapper } from '../../../../components';
import * as styles from './styles';
import { NFTRelationType } from '../../enums';
import { GetActiveListingApi, GetBestAndLastOffer, GetCollectionApi, GetNFT2Api, GetUserApi } from '../../api';
import { TokenTicker } from '../../../../enums';
import { getTokenByAddress, TOKENS_MAP } from '../../../../constants';
import { NFTCheckoutPopup } from '../../pages/nft-page/components';
import { shortenEthereumAddress } from '../../../../../utils/helpers/format';
import { collectionKeys, nftKeys, orderKeys, userKeys } from '../../../../utils/query-keys';
import { OrderSide, OrderStatus } from '../../../marketplace/enums';
import { getArtistApi } from '@app/api';

type IRenderFuncProps = {
  NFT: INFT;
  collection: ICollection;
  creator?: { mappedArtist: IUser | null } | null;
  owner?: { mappedArtist: IUser | null }| null;
  isLoadingNFT: boolean;
  isLoadingCollection: boolean;
  isLoadingCreator: boolean;
  isLoadingOwner: boolean;
  bestOfferPrice?: number | string;
  bestOfferPriceToken?: TokenTicker;
  lastOfferPrice?: number | string;
  lastOfferPriceToken?: TokenTicker;
  order?: IOrder | null;
};

type IRenderFunc = ((props: IRenderFuncProps) => React.ReactNode) | null;

export interface INftItemProps {
  collection: string;
  NFT: INFT;
  orderEnd?: number;
  order?: IOrder;
  isSelected?: boolean;
  selectedLabel?: string;
  showBuyNowButton?: boolean;
  renderHeader?: IRenderFunc;
  renderAsset?: IRenderFunc;
  renderContent?: IRenderFunc;
  renderFooter?: IRenderFunc;

  onClick?: (e: React.MouseEvent<HTMLElement>, NFT: INFT) => void;
}

export const NftItem = (
  {
    collection: _collectionAddress,
    NFT: _NFT,
    order,
    isSelected,
    selectedLabel,
    showBuyNowButton = true,
    renderHeader,
    renderAsset,
    renderContent,
    renderFooter,
    orderEnd,
    onClick,
  }: INftItemProps
) => {
  const [isCheckoutPopupOpened, setIsCheckoutPopupOpened] = useState(false);

  // Get Collection Info Query
  const { data: collection, isLoading: isLoadingCollection } = useQuery(
    collectionKeys.centralizedInfo(_collectionAddress),
    () => GetCollectionApi(_collectionAddress),
    {
      retry: false,
      enabled: !!_collectionAddress
    },
  );

  // Get NFT Info Query
  const { data: NFT, isLoading: isLoadingNFT } = useQuery(
    nftKeys.nftInfo({collectionAddress: _NFT._collectionAddress || '', tokenId: _NFT.tokenId || ""}),
    () => GetNFT2Api(_NFT._collectionAddress || "", _NFT.tokenId, false),
    {
      enabled: !!_NFT._collectionAddress && !!_NFT.tokenId,
      retry: false,
      initialData: _NFT,
    },
  );

  // Get Creator Query
  const { data: creator, isLoading: isLoadingCreator } = useQuery(
    userKeys.info(NFT?._creatorAddress || ""),
    () => getArtistApi(NFT?._creatorAddress as string),
    {
      enabled: !!NFT?._creatorAddress,
      retry: false,
    },
  );

  // Get Owner Query
  const { data: owner, isLoading: isLoadingOwner } = useQuery(
    userKeys.info(NFT?._ownerAddress || ""),
    () => getArtistApi(NFT?._ownerAddress as string),
    {
      enabled: !!NFT?._ownerAddress,
      retry: false,
    },
  );


  // Get Last And Best Offer Query
  const { data, isLoading: isLoadingOffers } = useQuery(
    orderKeys.cardOffers({collectionAddress: NFT?._collectionAddress || "", tokenId: NFT?.tokenId || ""}),
    () => GetBestAndLastOffer(NFT?._collectionAddress || '', NFT?.tokenId || ''),
    {
      enabled: !!NFT?._collectionAddress && !!NFT?.tokenId,
      retry: false,
    },
  );

  // Get Active Listing Query
  const { data: orderData, isLoading: isLoadingOrder } = useQuery(
    orderKeys.listing({collectionAddress: NFT?._collectionAddress || '', tokenId: NFT?.tokenId || ""}),
    () => GetActiveListingApi(NFT?._collectionAddress ?? "", NFT?.tokenId ?? ""),
    {
      retry: false,
      enabled: !order && !!NFT?._collectionAddress && !!NFT?.tokenId
    },
  );

  const [bestOfferPriceToken, bestOfferPrice, lastOfferPriceToken, lastOfferPrice] = useMemo(() => {
    const bestOfferPriceT = !data?.bestOffer ? null : getTokenByAddress((data?.bestOffer.make.assetType as IERC721AssetType).contract);
    const bestOfferP = !bestOfferPriceT ? null : utils.formatUnits(data?.bestOffer.make.value || 0, bestOfferPriceT.decimals ?? 18);

    let lastOfferPriceT = undefined;
    let lastOfferP = undefined;

    if (data && data.lastOffer && data?.lastOffer.side) {
      switch (data?.lastOffer.side) {
        // Sell order
        case 0:
          lastOfferPriceT = !data?.lastOffer ? null : getTokenByAddress((data?.lastOffer.make.assetType as IERC721AssetType).contract);
          lastOfferP = !lastOfferPriceT ? null : utils.formatUnits(data?.lastOffer.make.value || 0, lastOfferPriceT.decimals ?? 18);      
          break;
        // Buy order
        case 1:
          lastOfferPriceT = !data?.lastOffer ? null : getTokenByAddress((data?.lastOffer.take.assetType as IERC721AssetType).contract);
          lastOfferP = !lastOfferPriceT ? null : utils.formatUnits(data?.lastOffer.take.value || 0, lastOfferPriceT.decimals ?? 18);      
          break;
      }
    }
  
    return [bestOfferPriceT, bestOfferP, lastOfferPriceT, lastOfferP]
  }, [orderData]);

  const ref = useRef(null);

  const isHover = useHoverDirty(ref);

  return (
    <ItemWrapper
      ref={ref}
      isBundle={NFT && NFT.numberOfEditions > 1}
      isSelected={isSelected}
      selectedLabel={selectedLabel}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (onClick) {
          onClick(e, NFT as INFT);
        }
      }}
      sx={{ 
        maxWidth: {
          md: 'unset',
          sm: '325px',
        },
        margin: {
          md: 'unset',
          sm: '0 auto',
        },
        width: '100%',
      }}
    >
      <LinkBox>
        <NextLink href={!onClick ? `/nft/${NFT?._collectionAddress}/${NFT?.tokenId}`: 'javascript: void(0);'}>
          <LinkOverlay display={'contents'}>
            {!NFT || renderHeader === null ? null :
              renderHeader ? renderHeader({
                NFT: NFT as INFT,
                collection: collection as ICollection,
                creator,
                owner,
                isLoadingNFT,
                isLoadingCollection,
                isLoadingCreator,
                isLoadingOwner,
              }) : null}

            <Box {...styles.AssetContainerStyle} borderRadius={renderHeader ? '' : '12px 12px 0 0'}>
              {!NFT || renderAsset === null ? null :
                renderAsset ? renderAsset({
                  NFT: NFT as INFT,
                  collection: collection as ICollection,
                  creator,
                  owner,
                  isLoadingNFT,
                  isLoadingCollection,
                  isLoadingCreator,
                  isLoadingOwner,
                }) : (
                  <NFTItemAsset NFT={NFT} orderEnd={orderEnd || orderData?.end || 0} isHover={isHover} />
                )
              }
            </Box>
            <Box {...styles.NFTContentStyle}>
              {!NFT || renderContent === null ? null :
                renderContent ? renderContent({
                  NFT: NFT as INFT,
                  collection: collection as ICollection,
                  creator: creator,
                  owner: owner,
                  isLoadingNFT,
                  isLoadingCollection,
                  isLoadingCreator,
                  isLoadingOwner,
                  bestOfferPrice: bestOfferPrice || "0",
                  bestOfferPriceToken: bestOfferPriceToken?.ticker,
                  lastOfferPrice: lastOfferPrice || "0",
                  lastOfferPriceToken: lastOfferPriceToken?.ticker,
                  order: order || orderData
                }) : (
                  <>
                    <Text fontSize={'14px'} fontWeight={700} mb={'12px'}>{NFT?.name}</Text>

                    <Box mb={'14px'}>
                      <Flex>
                        <NFTItemRelation
                          type={NFTRelationType.CREATOR}
                          image={creator?.artist?.avatar ?? ''}
                          value={creator?.artist?.name ?? ''}
                          linkParam={creator?.artist?.universePageAddress || NFT._creatorAddress?.toLowerCase() || ""}
                        />
                        <NFTItemRelation
                          type={NFTRelationType.COLLECTION}
                          image={collection?.coverUrl ?? ''}
                          value={collection?.name ?? ''}
                          linkParam={NFT._collectionAddress ?? ''}
                        />
                        <NFTItemRelation
                          type={NFTRelationType.OWNER}
                          image={owner?.artist?.avatar ?? ''}
                          value={owner?.artist?.name || NFT._ownerAddress || ''}
                          linkParam={owner?.artist?.universePageAddress || owner?.address || NFT._ownerAddress?.toLowerCase() || ""}
                        />
                      </Flex>
                    </Box>
                  </>
                )
              }

              {!NFT || renderFooter === null ? null :
                renderFooter ? renderFooter({
                  NFT: NFT as INFT,
                  collection: collection as ICollection,
                  creator,
                  owner,
                  isLoadingNFT,
                  isLoadingCollection,
                  isLoadingCreator,
                  isLoadingOwner,
                }) : (
                  <NFTItemFooter
                    isCheckoutPopupOpened={isCheckoutPopupOpened}
                    setIsCheckoutPopupOpened={setIsCheckoutPopupOpened}
                    showBuyNowButton={showBuyNowButton && (orderData || order) && (orderData || order)?.side === OrderSide.SELL && (orderData || order)?.status === OrderStatus.CREATED ? true : false}
                    NFT={NFT as INFT}
                    collection={collection}
                    order={(order || orderData) as IOrder}
                  />
                )
              }
            </Box>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </ItemWrapper>
  );
};
