import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import { NFTItemRelation } from '../nft-item-relation';
import { NFTRelationType, OrderAssetClass } from '../../../../enums';
import { ICollection, IERC721AssetType, IOrder, IUser } from '../../../../types';
import { TokenTicker } from '../../../../../../enums';
import { TokenIcon } from '../../../../../../components';
import { TOKENS_MAP } from '../../../../../../constants';
import { useQuery } from 'react-query';
import { GetNFT2Api, GetOrdersApi } from '../../../../api';
import { utils } from 'ethers';

type IOrderFetchPayload = {
  assetClass: OrderAssetClass,
  collectionAddress: string;
  tokenId: string;
}

export interface INFTItemContentWithPriceProps {
  name: string;
  creator?: IUser;
  collection?: ICollection;
  owner?: IUser;
  order: IOrder | IOrderFetchPayload;
  // price: number;
  // priceToken: TokenTicker;
  bestOfferPrice?: number | string;
  bestOfferPriceToken?: TokenTicker;
  lastOfferPrice?: number | string;
  lastOfferPriceToken?: TokenTicker;
}

export const NFTItemContentWithPrice = (
  {
    name,
    creator,
    collection,
    owner,
    order: _order,
    // price,
    // priceToken,
    bestOfferPrice,
    bestOfferPriceToken,
    lastOfferPrice,
    lastOfferPriceToken,
  }: INFTItemContentWithPriceProps
) => {
  const { data: order, isLoading: isLoadingOrder } = useQuery(
    (_order as IOrder).id
      ? ['order', (_order as IOrder).id]
      : ['NFT', (_order as IOrderFetchPayload).collectionAddress, (_order as IOrderFetchPayload).tokenId, 'order'],
    async () => {
      const collectionAddress = (_order as IOrderFetchPayload).collectionAddress.toLowerCase();

      const { orders } = await GetOrdersApi({
        assetClass: (_order as IOrderFetchPayload).assetClass,
        collection: collectionAddress,
        // tokenId,
        side: 1,
      });

      return orders.find((order) => {
        const assetType = order.make.assetType as IERC721AssetType;
        return assetType.contract === collectionAddress
          && +assetType.tokenId === +(_order as IOrderFetchPayload).tokenId
          && !order.cancelledTxHash;
      });
    },
    {
      retry: false,
      staleTime: !(_order as IOrder).id ? 0 : Infinity,
      initialData: !(_order as IOrder).id ? undefined : (_order as IOrder),
    },
  );

  const [additionPriceLabel, additionPriceValue, additionPriceToken] = useMemo(() => {
    const defaultTicker = TOKENS_MAP.ETH.ticker;

    if (bestOfferPrice) {
      return ['Offer for', bestOfferPrice, bestOfferPriceToken ?? defaultTicker];
    }
    
    if (lastOfferPrice) {
      return ['Last', lastOfferPrice, lastOfferPriceToken ?? defaultTicker];
    }

    return [null, null, defaultTicker];
  }, [bestOfferPrice, bestOfferPriceToken, lastOfferPrice, lastOfferPriceToken]);

  const price = useMemo(() => {
    if (!order) {
      return null;
    }

    return utils.formatUnits(order.take.value, `${TOKENS_MAP[order.take.assetType.assetClass as TokenTicker].decimals}`);
  }, [order]);

  const priceToken = useMemo(() => {
    return (order?.take.assetType.assetClass as TokenTicker) ?? null;
  }, [order]);

  return (
    <>
      <Flex justifyContent={'space-between'} fontSize={'14px'} fontWeight={700} mb={'12px'}>
        <Text>{name}</Text>
        <Text>
          {/*TODO: provide text "top bit" | "min bit" in case of auction*/}
          {order && (
            <>
              <TokenIcon
                ticker={priceToken}
                display={'inline'}
                mx={'4px'}
                position={'relative'}
                top={'-2px'}
                width={'20px'}
              />
              {price}
            </>
          )}
        </Text>
      </Flex>

      <Flex justifyContent={'space-between'} alignItems={'center'} mb={'14px'}>
        <Box>
          {creator && (
            <NFTItemRelation
              type={NFTRelationType.CREATOR}
              image={creator.profileImageUrl ?? ''}
              value={creator.displayName ?? ''}
              linkParam={creator.universePageUrl ?? ''}
            />
          )}
          {collection && (
            <NFTItemRelation
              type={NFTRelationType.COLLECTION}
              image={collection.coverUrl ?? ''}
              value={collection.name ?? ''}
              linkParam={collection.address ?? ''}
            />
          )}
          {owner && (
            <NFTItemRelation
              type={NFTRelationType.OWNER}
              image={owner.profileImageUrl ?? ''}
              value={owner.displayName ?? ''}
              linkParam={owner.universePageUrl ?? ''}
            />
          )}
        </Box>
        {additionPriceValue && (
          <Text color={'#00000066'} fontSize={'11px'} fontWeight={600}>
            {additionPriceLabel}
            <TokenIcon
              ticker={additionPriceToken}
              display={'inline'}
              mx={'4px'}
              position={'relative'}
              top={'-2px'}
              width={'20px'}
            />
            <Box as={'span'} color={'black'}>{additionPriceValue}</Box>
          </Text>
        )}
      </Flex>
    </>
  );
}
