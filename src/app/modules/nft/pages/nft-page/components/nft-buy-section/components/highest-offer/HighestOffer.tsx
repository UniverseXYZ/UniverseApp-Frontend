import { Box, Flex, HStack, Image, Text, Tooltip } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import * as styles from '../../styles';

import {
  IOrder,
  IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20,
  IOrderAssetTypeSingleListing,
} from '../../../../../../types';
import { IUser } from '../../../../../../../account/types';
import Blockies from 'react-blockies';
import { ethers } from 'ethers';
import { getTokenByAddress, TOKENS_MAP } from '../../../../../../../../constants';
import { TokenIcon } from '../../../../../../../../components';
import { shortenEthereumAddress } from '../../../../../../../../../utils/helpers/format';
import BigNumber from 'bignumber.js';
import { useTokenPrice } from '../../../../../../../../hooks';

interface IHighestOfferProps {
  offer?: IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing>;
  creator?: IUser;
}

export const HighestOffer: React.FC<IHighestOfferProps> = (props) => {
  const { offer, creator } = props;

  const token = getTokenByAddress(offer?.make?.assetType.contract);

  const tokenUSDPrice = useTokenPrice(token.ticker);

  const [price, usdPrice] = useMemo(() => {
    if (!offer) {
      return [0, 0, TOKENS_MAP.ETH];
    }

    const price = ethers.utils.formatUnits(offer.make?.value || 0, token.decimals ?? 18);
    const usdPrice = new BigNumber(tokenUSDPrice).multipliedBy(price).toFixed(2);

    return [price, usdPrice];
  }, [offer, tokenUSDPrice]);
  
  return (
    <Flex mb={'24px'}>
      {creator && creator.profileImageUrl ? (
        <Image src={creator.profileImageUrl} {...styles.ContentBidUserAvatarStyle} />
      ) : (
        <Box style={{ borderRadius: '50%', overflow: 'hidden' }} {...styles.ContentBidUserAvatarStyle}>
          <Blockies seed={creator?.address || offer?.maker || ''} size={10} scale={5} />
        </Box>
      )}
      <Box>
        <Text {...styles.ContentBidLabelStyle}>
          Highest offer by{' '}
          <strong>
            {creator && creator?.displayName ? creator?.displayName : shortenEthereumAddress(offer?.maker)}
          </strong>
        </Text>
        <HStack spacing={'6px'}>
          <Tooltip label={'WETH'} {...styles.TooltipCurrencyStyle}>
            <Box>
              <TokenIcon
                ticker={token.ticker}
                size={24}
              />
            </Box>
          </Tooltip>
          <Text {...styles.HighestOfferPrice}>
            {price} {token.ticker}
          </Text>
          <Text {...styles.HighestOfferPriceUSD}>
            ${usdPrice}
          </Text>
        </HStack>
      </Box>
    </Flex>
  );
};
