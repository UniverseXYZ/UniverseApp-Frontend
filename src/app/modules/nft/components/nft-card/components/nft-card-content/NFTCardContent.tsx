import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { utils } from 'ethers';

import { TokenTicker } from '@app/enums';
import { TokenIcon } from '@app/components';
import { getTokenByAddress, TOKENS_MAP } from '@app/constants';

import { ICollection, IERC20AssetType, IOrder } from '../../../../types';
import { formatPrice, formatSecondaryPrice } from './helpers';
import * as styles from './NFTCardContent.styles';

export interface INFTCardContentProps {
  name: string;
  collection?: ICollection;
  order?: IOrder;
  bestOfferPrice?: number | string;
  bestOfferPriceToken?: TokenTicker;
  lastOfferPrice?: number | string;
  lastOfferPriceToken?: TokenTicker;
}

export const NFTCardContent = (props: INFTCardContentProps) => {
  const {
    name,
    collection,
    order,
    bestOfferPrice,
    bestOfferPriceToken,
    lastOfferPrice,
    lastOfferPriceToken,
  } = props;

  const [additionPriceLabel, additionPriceValue, additionPriceToken] = useMemo(() => {
    const defaultTicker = TOKENS_MAP.ETH.ticker;

    if (Number(bestOfferPrice)) {
      return ['Offer', bestOfferPrice?.toString(), bestOfferPriceToken ?? defaultTicker];
    }

    if (Number(lastOfferPrice)) {
      return ['Last', lastOfferPrice?.toString(), lastOfferPriceToken ?? defaultTicker];
    }

    return [null, null, defaultTicker];
  }, [bestOfferPrice, bestOfferPriceToken, lastOfferPrice, lastOfferPriceToken]);

  const [priceToken, price] = useMemo(() => {
    if (!order) {
      return [TOKENS_MAP.ETH, ''];
    }

    const token = getTokenByAddress((order.take.assetType as IERC20AssetType).contract);
    const price = utils.formatUnits(order.take.value, `${token.decimals}`);

    return [token, price];
  }, [order]);

  return (
    <>
      <Flex justifyContent={'space-between'} fontSize={'14px'} fontWeight={700} mb={'6px'}>
        <Text {...styles.NFTName}>{name}</Text>
        {order && (
          <HStack spacing={'4px'}>
            <TokenIcon ticker={priceToken.ticker} boxSize={'20px'} />
            {/*TODO: provide text "top bit" | "min bit" in case of auction*/}
            <Text>{formatPrice(price)}</Text>
          </HStack>
        )}
      </Flex>

      <Flex justifyContent={'space-between'} alignItems={'top'} mb={'14px'}>
        <Text {...styles.CollectionName}>{collection?.name || collection?.address}</Text>
        <Box>
          {additionPriceValue && (
            <HStack spacing={'4px'} fontSize={'11px'} fontWeight={600}>
              <Text color={'#00000066'}>{additionPriceLabel}</Text>
              <TokenIcon ticker={additionPriceToken} boxSize={'16px'} />
              <Text color={'black'}>{formatSecondaryPrice(additionPriceValue)}</Text>
            </HStack>
          )}
        </Box>
      </Flex>
    </>
  );
}
