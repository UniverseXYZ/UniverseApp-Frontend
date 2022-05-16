import {
  Box, Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import SearchIcon from '@assets/images/search-gray.svg';

import { Alert, Pagination, Select } from '@app/components';
import { SORT_BY_ACTIVE_AUCTIONS } from '@app/modules/auctions/constants';
import {
  AuctionManagedCard,
  AuctionManagedCardSkeleton,
  AuctionManagedCardStatistic,
} from '@app/modules/auctions/components';

import { CardContent, RewardBalance } from './components';
import * as s from './TabPastAuctions.styles';

interface ITabPastAuctionsProps {}

export const TabPastAuctions = (props: ITabPastAuctionsProps) => {
  // just for example
  const [contents] = useState([
    null,
    (
      <CardContent
        title={'The auction didn’t get bids on all the slots'}
        description={'You can withdraw your NFTs by clicking a button below.'}
      >
        <Alert status={'warning'} w={'fit-content'}>
          You’ll be able to withdraw your NFTs right after all the rewards are released.
        </Alert>
        <Button disabled={true} {...s.ContentButton}>Withdraw NFTs</Button>
      </CardContent>
    ),
    (
      <CardContent
        title={'The auction didn’t get bids on'}
        description={'You can withdraw your NFTs by clicking a button below.'}
      >
        <Button {...s.ContentButton}>Withdraw NFTs</Button>
      </CardContent>
    ),
    (
      <CardContent
        title={'The auction didn’t get bids on'}
        description={'You have already withdrawn your NFTs to your wallet.'}
      />
    ),
    (
      <CardContent
        title={'The auction was cancelled'}
        description={'You can withdraw your NFTs by clicking a button below.'}
      >
        <Button {...s.ContentButton}>Withdraw NFTs</Button>
      </CardContent>
    ),
  ]);

  const [auctions] = useState([
    { hasStatistic: true, hasRewardBalance: true, },
    { hasStatistic: true, hasRewardBalance: true, },
    { hasStatistic: false, hasRewardBalance: false, },
    { hasStatistic: false, hasRewardBalance: false, },
    { hasStatistic: false, hasRewardBalance: false, },
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
            {contents[i] || null}
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
