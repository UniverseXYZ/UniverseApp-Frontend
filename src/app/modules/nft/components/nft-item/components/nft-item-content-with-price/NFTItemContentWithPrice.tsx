import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import { NFTItemRelation } from '../nft-item-relation';
import { NFTRelationType, OrderAssetClass } from '../../../../enums';
import { ICollection, IERC20AssetType, IOrder, IUser } from '../../../../types';
import { TokenTicker } from '../../../../../../enums';
import { TokenIcon } from '../../../../../../components';
import { getTokenByAddress, TOKENS_MAP } from '../../../../../../constants';
import { useQuery } from 'react-query';
import { GetActiveListingApi, GetOrdersApi } from '../../../../api';
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
  tokenId?: string;
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
    tokenId
  }: INFTItemContentWithPriceProps
) => {
  const { data: order, isLoading: isLoadingOrder } = useQuery(
      ['listing', collection?.address, tokenId],
      () => GetActiveListingApi(collection?.address ?? "", tokenId ?? ""),
    {
      retry: false,
      enabled: !!collection?.address && !!tokenId
    },
  );

  const [additionPriceLabel, additionPriceValue, additionPriceToken] = useMemo(() => {
    const defaultTicker = TOKENS_MAP.ETH.ticker;

    if (Number(bestOfferPrice)) {
      return ['Offer for', bestOfferPrice, bestOfferPriceToken ?? defaultTicker];
    }
    
    if (Number(lastOfferPrice)) {
      return ['Last', lastOfferPrice, lastOfferPriceToken ?? defaultTicker];
    }

    return [null, null, defaultTicker];
  }, [bestOfferPrice, bestOfferPriceToken, lastOfferPrice, lastOfferPriceToken]);

  const priceToken = useMemo(() => {
    if (!order) {
      return TOKENS_MAP.ETH;
    }

    return getTokenByAddress((order.take.assetType as IERC20AssetType).contract);
  }, [order]);

  const price = useMemo(() => {
    if (!order) {
      return null;
    }

    return utils.formatUnits(order.take.value, `${priceToken.decimals}`);
  }, [order, priceToken]);

  return (
    <>
      <Flex justifyContent={'space-between'} fontSize={'14px'} fontWeight={700} mb={'12px'}>
        <Text>{name}</Text>
        <Text>
          {/*TODO: provide text "top bit" | "min bit" in case of auction*/}
          {order && (
            <>
              <TokenIcon
                ticker={priceToken.ticker}
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
