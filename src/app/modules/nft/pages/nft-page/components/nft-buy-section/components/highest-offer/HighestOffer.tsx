import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';

import * as styles from '../../styles';

import { IERC721AssetType, INFT, IOrder, IUser } from '../../../../../../types';
import Blockies from 'react-blockies';
import { ethers } from 'ethers';
import { getTokenByAddress } from '../../../../../../../../constants';
import { useAuthContext } from '../../../../../../../../../contexts/AuthContext';
import { TokenIcon } from '../../../../../../../../components';
import { shortenEthereumAddress } from '../../../../../../../../../utils/helpers/format';

interface IHighestOfferProps {
  offer?: IOrder;
  creator?: IUser;
}

export const HighestOffer = ({ offer, creator }: IHighestOfferProps) => {
  const { usdPrice } = useAuthContext();
  const formattedPrice = Number(ethers.utils.formatUnits(offer?.make?.value || 0, 18));

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
                ticker={getTokenByAddress((offer?.make?.assetType as IERC721AssetType)?.contract)?.ticker}
                size={24}
              />
            </Tooltip>
            <strong>
              {formattedPrice} {getTokenByAddress((offer?.make?.assetType as IERC721AssetType)?.contract)?.ticker}
            </strong>
            ${(formattedPrice * usdPrice).toFixed(2)}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
