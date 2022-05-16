import {
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import SearchIcon from '@assets/images/search-gray.svg';

import { Pagination, Select } from '@app/components';
import { SORT_BY_ACTIVE_AUCTIONS } from '@app/modules/auctions/constants';
import {
  AuctionManagedCard,
  AuctionManagedCardSkeleton,
  AuctionManagedCardStatistic,
} from '@app/modules/auctions/components';

interface ITabActiveAuctionsProps {
  auctions: any[];
}

export const TabActiveAuctions = (props: ITabActiveAuctionsProps) => {
  return (
    <VStack spacing={'40px'} w={'100%'}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={'14px'} w={'100%'}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Image src={SearchIcon} alt={'Search icon'} />
          </InputLeftElement>
          <Input pl={'50px'} placeholder={'Search by name'} />
        </InputGroup>
        <Select
          buttonProps={{ size: 'lg', minWidth: '200px', }}
          label={'Sort by'}
          items={SORT_BY_ACTIVE_AUCTIONS}
          value={SORT_BY_ACTIVE_AUCTIONS[0]}
        />
      </Stack>

      {new Array(2).fill(null).map((auction, i) => (
        <AuctionManagedCard key={i}>
          <AuctionManagedCardStatistic
            totalBids={120}
            totalBidsAmount={84.51}
            highestWinningBid={14.24}
            lowestWinningBid={2.2}
          />
        </AuctionManagedCard>
      ))}
      <AuctionManagedCardSkeleton />
      <Pagination
        pageCount={10}
        pageRangeDisplayed={5}
        onPageChange={() => void 0}
        w={'100%'}
      />
    </VStack>
  );
};
