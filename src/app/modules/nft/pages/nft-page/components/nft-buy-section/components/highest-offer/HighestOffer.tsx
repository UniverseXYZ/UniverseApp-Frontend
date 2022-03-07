import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';

import * as styles from '../../styles';

import { IERC721AssetType, INFT, IOrder, IUser } from '../../../../../../types';
import Blockies from 'react-blockies';
import { ethers } from 'ethers';
import { getTokenByAddress } from '../../../../../../../../constants';
import { TokenIcon } from '../../../../../../../../components';
import { shortenEthereumAddress } from '../../../../../../../../../utils/helpers/format';
import BigNumber from 'bignumber.js';
import { useTokenPrice } from '../../../../../../../../hooks';

interface IHighestOfferProps {
  offer?: IOrder;
  creator?: IUser;
}

export const HighestOffer = ({ offer, creator }: IHighestOfferProps) => {

  const token = getTokenByAddress((offer?.make.assetType as IERC721AssetType).contract);
  
  const formattedPrice = ethers.utils.formatUnits(offer?.make?.value || 0, token.decimals ?? 18);
  
  const usdPrice = useTokenPrice(token.ticker);

  const usd = new BigNumber(usdPrice).multipliedBy(formattedPrice).toFixed(2);
  
  return (
    <Flex mb={'24px'}>
      {creator && creator.profileImageUrl ? (
        <Image src={creator.profileImageUrl} {...styles.ContentBidUserAvatarStyle} />
      ) : (
        <Box style={{ borderRadius: '50%', overflow: 'hidden' }} {...styles.ContentBidUserAvatarStyle}>
          <Blockies seed={creator?.address || ''} size={10} scale={5} />
        </Box>
      )}
      <Box>
        <Text {...styles.ContentBidLabelStyle}>
          Highest offer by{' '}
          <strong>
            {creator && creator?.displayName ? creator?.displayName : shortenEthereumAddress(creator?.address)}
          </strong>
        </Text>
        <Flex>
          <Text {...styles.ContentPriceStyle}>
            <Tooltip label={'WETH'} {...styles.TooltipCurrencyStyle}>
              <TokenIcon
                ticker={token.ticker}
                size={24}
              />
            </Tooltip>
            <strong>
              {formattedPrice} {token.ticker}
            </strong>
           {usd}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
