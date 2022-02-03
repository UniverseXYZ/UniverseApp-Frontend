import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import { NFTItemRelation } from '../nft-item-relation';
import { NFTRelationType } from '../../../../enums';
import { ICollection, IUser } from '../../../../types';
import { TokenTicker } from '../../../../../../enums';
import { TokenIcon } from '../../../../../../components';
import { TOKENS_MAP } from '../../../../../../constants';

export interface INFTItemContentWithPriceProps {
  name: string;
  creator?: IUser;
  collection?: ICollection;
  owner?: IUser;
  price: number;
  priceToken: TokenTicker;
  offerPrice?: number | string;
  offerPriceToken?: TokenTicker;
  lastPrice?: number | string;
  lastPriceToken?: TokenTicker;
}

export const NFTItemContentWithPrice = (
  {
    name,
    creator,
    collection,
    owner,
    price,
    priceToken,
    offerPrice,
    offerPriceToken,
    lastPrice,
    lastPriceToken,
  }: INFTItemContentWithPriceProps
) => {

  const [additionPriceLabel, additionPriceValue, additionPriceToken] = useMemo(() => {
    const defaultTicker = TOKENS_MAP.ETH.ticker;

    if (offerPrice) {
      return ['Offer for', offerPrice, offerPriceToken ?? defaultTicker];
    }

    if (lastPrice) {
      return ['Last', lastPrice, lastPriceToken ?? defaultTicker];
    }

    return [null, null, defaultTicker];
  }, [offerPrice, lastPrice]);

  return (
    <>
      <Flex justifyContent={'space-between'} fontSize={'14px'} fontWeight={700} mb={'12px'}>
        <Text>{name}</Text>
        <Text>
          {/*TODO: provide text "top bit" | "min bit" in case of auction*/}
          <TokenIcon
            ticker={priceToken}
            display={'inline'}
            mx={'4px'}
            position={'relative'}
            top={'-2px'}
            width={'20px'}
          />
          {price}
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
