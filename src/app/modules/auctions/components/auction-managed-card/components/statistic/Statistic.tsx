import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';

import { TokenIcon } from '@app/components';
import { TokenTicker } from '@app/enums';

import * as styles from './Statistic.styles';

interface IStatisticProps {
  totalBids: number;
  totalBidsAmount: number;
  highestWinningBid: number;
  lowestWinningBid: number;
}

export const Statistic = (props: IStatisticProps) => {
  const items = [
    {
      label: 'Total bids',
      value: props.totalBids,
      isPrice: false,
    },
    {
      label: 'Total bids amount',
      value: props.totalBidsAmount,
      isPrice: true,
    },
    {
      label: 'Highest winning bid',
      value: props.highestWinningBid,
      isPrice: true,
    },
    {
      label: 'Lowest winning bid',
      value: props.lowestWinningBid,
      isPrice: true,
    },
  ];
  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={'20px'} w={'100%'}>
      {items.map(({ label, value, isPrice }, i) => (
        <Box key={i} {...styles.ItemWrapper}>
          <Text {...styles.Label}>{label}</Text>
          <HStack spacing={'4px'}>
            {isPrice && (<TokenIcon ticker={TokenTicker.WETH} boxSize={'20px'} />)}
            <Text {...styles.Value}>{value}</Text>
            {isPrice && (
              <Text {...styles.USDValue}>~$41,594</Text>
            )}
          </HStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}
