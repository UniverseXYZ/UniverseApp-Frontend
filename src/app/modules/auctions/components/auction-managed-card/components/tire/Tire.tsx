import { Box, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';

import AuctionWinnerIcon from '@assets/images/auction-winner.png';

import { Select } from '@app/components';
import { TireNFTs } from '@app/modules/auctions/components';

import * as s from './Tire.styles';

interface ITireProps {
  name: string;
  winners: number;
}

export const Tire = (props: ITireProps) => {
  const {
    name,
    winners: initialWinnersAmount,
  } = props;

  const [winners] = useState(new Array(initialWinnersAmount).fill(null).map((_, i) => ({
    id: i + 1,
    name: `Winner #${i + 1}`,
    amountNFTs: (i + 1) * 3,
  })));

  const totalNFTs = useMemo(() => {
    return winners.reduce((total, winner) => total + winner.amountNFTs, 0);
  }, [winners]);

  const renderWinnerItem = useCallback((winner) => (
    <HStack spacing={'10px'}>
      <Image src={`${AuctionWinnerIcon}`} alt={'Winner icon'} w={'14px'} />
      <Heading fontSize={'11px'}>{winner.name}</Heading>
      <Text fontSize={'10px'}>{winner.amountNFTs} NFTs</Text>
    </HStack>
  ), []);

  return (
    <Box {...s.Wrapper}>
      <Stack {...s.TitleWrapper}>
        <Heading fontSize={'14px'}>{name}</Heading>
        <HStack spacing={'20px'} fontSize={'14px'} flex={1}>
          <Text>Winners: <strong>{winners.length}</strong></Text>
          <Text>Total NFTs: <strong>{totalNFTs}</strong></Text>
        </HStack>

        <Select
          buttonProps={s.WinnerSelectorButton}
          items={winners}
          value={winners[0]}
          renderSelectedItem={renderWinnerItem}
          renderItem={renderWinnerItem}
        />
      </Stack>

      <TireNFTs NFTs={15} />
    </Box>
  )
}
