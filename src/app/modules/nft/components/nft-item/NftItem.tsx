import { Box, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import React, { useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useHoverDirty } from 'react-use';
import { utils } from 'ethers';

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
import { nftKeys, orderKeys, userKeys } from '../../../../utils/query-keys';
import { useNftCheckoutPopupContext } from '../../../../providers/NFTCheckoutProvider';
import { OrderSide, OrderStatus } from '../../../marketplace/enums';

type IRenderFuncProps = {
  NFT: INFT;
  collection: ICollection;
  creator?: IUser | null;
  owner?: IUser | null;
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
    ['collection', _collectionAddress],
    () => GetCollectionApi(_collectionAddress),
    {
      retry: false,
      enabled: !!_collectionAddress
    },
  );

  // Get NFT Info Query
  const { data: NFT, isLoading: isLoadingNFT } = useQuery(
    nftKeys.nftInfo({collectionAddress: collection?.address || '', tokenId: _NFT.tokenId || ""}),
    () => GetNFT2Api(`${collection?.address}`, _NFT.tokenId),
    {
      enabled: !!collection?.address && !!_NFT.tokenId,
      retry: false,
      initialData: _NFT,
    },
  );

  // Get Creataor Query
  const { data: creator, isLoading: isLoadingCreator } = useQuery(
    userKeys.info(NFT?._creatorAddress || ""),
    () => GetUserApi(NFT?._creatorAddress as string),
    {
      enabled: !!NFT?._creatorAddress,
      retry: false,
    },
  );

  // Get Owner Query
  const { data: owner, isLoading: isLoadingOwner } = useQuery(
    userKeys.info(NFT?._ownerAddress || ""),
    () => GetUserApi(NFT?._ownerAddress as string),
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
    orderKeys.listing({collectionAddress: collection?.address || '', tokenId: NFT?.tokenId || ""}),
    () => GetActiveListingApi(collection?.address ?? "", NFT?.tokenId ?? ""),
    {
      retry: false,
      enabled: !order && !!collection?.address && !!NFT?.tokenId
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
        <LinkOverlay
          as={Link}
          to={!onClick ? `/nft/${collection?.address}/${NFT?.tokenId}`: 'javascript: void(0);'}
          display={'contents'}
        >
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
                <NFTItemAsset NFT={NFT} orderEnd={orderEnd || 0} isHover={isHover} />
              )
            }
          </Box>
          <Box {...styles.NFTContentStyle}>
            {!NFT || renderContent === null ? null :
              renderContent ? renderContent({
                NFT: NFT as INFT,
                collection: collection as ICollection,
                creator,
                owner,
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
                    <Box>
                      <NFTItemRelation
                        type={NFTRelationType.CREATOR}
                        image={creator?.profileImageUrl ?? ''}
                        value={creator?.displayName ?? ''}
                        linkParam={creator?.universePageUrl ?? ''}
                      />
                      <NFTItemRelation
                        type={NFTRelationType.COLLECTION}
                        image={collection?.coverUrl ?? ''}
                        value={collection?.name ?? ''}
                        linkParam={collection?.address ?? ''}
                      />
                      <NFTItemRelation
                        type={NFTRelationType.OWNER}
                        image={owner?.profileImageUrl ?? ''}
                        value={owner?.displayName || shortenEthereumAddress(owner?.address)}
                        linkParam={owner?.universePageUrl ?? ''}
                      />
                    </Box>
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
                  order={(order || orderData) as IOrder}
                />
              )
            }
          </Box>
        </LinkOverlay>
      </LinkBox>
    </ItemWrapper>
  );
};
