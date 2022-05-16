import {
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import SearchIcon from '@assets/images/search-gray.svg';

import { Pagination, Select } from '@app/components';
import { SORT_BY_ACTIVE_AUCTIONS } from '@app/modules/auctions/constants';
import {
  AuctionManagedCard,
  AuctionManagedCardSkeleton,
  AuctionManagedCardStatistic,
} from '@app/modules/auctions/components';

import { CardContent, ICardContentState, RewardBalance } from './components';

interface ITabPastAuctionsProps {}

export const TabPastAuctions = (props: ITabPastAuctionsProps) => {

  // just for example
  const [auctions] = useState<Array<{
    hasStatistic: boolean;
    hasRewardBalance: boolean;
    contentState: ICardContentState | null;
  }>>([
    { hasStatistic: true, hasRewardBalance: true, contentState: null },
    { hasStatistic: true, hasRewardBalance: true, contentState: 'didntGetBids' },
    { hasStatistic: false, hasRewardBalance: false, contentState: 'canWithdraw' },
    { hasStatistic: false, hasRewardBalance: false, contentState: 'alreadyWithdrawn' },
    { hasStatistic: false, hasRewardBalance: false, contentState: 'auctionWasCancelled' },
  ]);

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

      {auctions.map((auction, i) => (
        <AuctionManagedCard key={i} state={'past'}>
          <>
            {auction.hasStatistic && (
              <AuctionManagedCardStatistic
                totalBids={120}
                totalBidsAmount={84.51}
                highestWinningBid={14.24}
                lowestWinningBid={2.2}
              />
            )}
            {auction.hasRewardBalance && (
              <RewardBalance
                unreleasedFunds={120.423}
                availableBalance={14.24}
                onReleaseRewards={() => console.log('onReleaseRewards')}
                onClaimFunds={() => console.log('onClaimFunds')}
              />
            )}
            {!auction.contentState ? null : (
              <CardContent state={auction.contentState} />
            )}
          </>
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
}
