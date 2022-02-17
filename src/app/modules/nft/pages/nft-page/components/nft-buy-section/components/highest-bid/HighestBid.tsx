import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';

import * as styles from '../../styles';

import UserImage from '../../../../../../../../../assets/images/collection_img3.svg';
import EthIcon from '../../../../../../../../../assets/images/eth-icon-new.svg';

export const HighestBid = () => (
  <Flex mb={'24px'}>
    <Image src={UserImage} {...styles.ContentBidUserAvatarStyle} />
    <Box>
      <Text {...styles.ContentBidLabelStyle}>Highest bid by <strong>The Unveiling</strong></Text>
      <Flex>
        <Text {...styles.ContentPriceStyle}>
          <Tooltip label={'WETH'} {...styles.TooltipCurrencyStyle}>
            <Image src={EthIcon} />
          </Tooltip>

          <strong>0.5</strong>
          $142.39
        </Text>
        <Text {...styles.ContentFeeLabelStyle}>(10% of sales will go to creator)</Text>
      </Flex>
    </Box>
  </Flex>
);
