import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import { NFTItemRelation } from '../nft-item-relation';
import { NFTRelationType, OrderAssetClass } from '../../../../enums';
import { ICollection, IERC20AssetType, IOrder, IUser, INFT } from '../../../../types';
import { TokenTicker } from '../../../../../../enums';
import { TokenIcon } from '../../../../../../components';
import { getTokenByAddress, TOKENS_MAP } from '../../../../../../constants';
import { utils } from 'ethers';
import { shortenEthereumAddress } from '../../../../../../../utils/helpers/format';
import * as style from './NFTItemContentWithPrice.styles';

export interface INFTItemContentWithPriceProps {
  collectionAddress?: string;
  name: string;
  creator?: IUser;
  collection?: ICollection;
  owner?: IUser;
  ownerAddress?: string;
  order?: IOrder;
  bestOfferPrice?: number | string;
  bestOfferPriceToken?: TokenTicker;
  lastOfferPrice?: number | string;
  lastOfferPriceToken?: TokenTicker;
}

export const NFTItemContentWithPrice = (
  {
    collectionAddress,
    name,
    creator,
    collection,
    owner,
    ownerAddress,
    order,
    bestOfferPrice,
    bestOfferPriceToken,
    lastOfferPrice,
    lastOfferPriceToken,
  }: INFTItemContentWithPriceProps
) => {
  const [additionPriceLabel, additionPriceValue, additionPriceToken] = useMemo(() => {
    const defaultTicker = TOKENS_MAP.ETH.ticker;

    if (Number(bestOfferPrice)) {
      return ['Offer for', bestOfferPrice?.toString(), bestOfferPriceToken ?? defaultTicker];
    }
    
    if (Number(lastOfferPrice)) {
      return ['Last', lastOfferPrice?.toString(), lastOfferPriceToken ?? defaultTicker];
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
        <Text {...style.NFTName}>{name}</Text>
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
              {Number(price) < 0.0001 ? '< 0.0001' : price && price.length > 7 ? `> ${price.substring(0, 5)}` : price}
            </>
          )}
        </Text>
      </Flex>

      <Flex justifyContent={'space-between'} alignItems={'center'} mb={'14px'}>
        <Flex>
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
              value={(collection.name || collectionAddress) ?? ''}
              linkParam={(collection.address || collectionAddress) ?? ''}
            />
          )}
          {owner && (
            <NFTItemRelation
              type={NFTRelationType.OWNER}
              image={owner.profileImageUrl ?? ''}
              value={owner.displayName || ownerAddress || ''}
              linkParam={owner.universePageUrl ?? ''}
              externalOwner={!owner.displayName}
            />
          )}
        </Flex>
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
            <Box as={'span'} color={'black'}>
              {Number(additionPriceValue) < 0.0001
                ? '< 0.0001'
                : additionPriceValue.length > 7
                ? Number(additionPriceValue).toFixed(2)
                : additionPriceValue}
            </Box>
          </Text>
        )}
      </Flex>
    </>
  );
}
