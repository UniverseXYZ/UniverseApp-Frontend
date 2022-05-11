import { Box, Image, Input, InputGroup, InputLeftElement, SimpleGrid, Stack } from '@chakra-ui/react';
import React from 'react';
import { useMeasure } from 'react-use';

import SearchIcon from '@assets/images/search-gray.svg';

import { useFluidGrid } from '@app/hooks';
import { Select } from '@app/components';
import { AuctionCard } from '@app/modules/auctions/components';
import { SORT_BY_ACTIVE_AUCTIONS } from '@app/modules/auctions/constants';

interface ITabMyBidsProps {
  auctions: any[];
}

export const TabMyBids = (props: ITabMyBidsProps) => {
  const { auctions } = props;

  const [ref, { width: containerWidth }] = useMeasure<HTMLDivElement>();

  const { columns, spacingX } = useFluidGrid(containerWidth, 280, 24);

  return (
    <Box ref={ref}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={'14px'} mb={'40px'}>
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
      <SimpleGrid columns={columns} spacing={`${spacingX}px`}>
        {auctions.map((_, i) => <AuctionCard key={i} />)}
      </SimpleGrid>
    </Box>
  );
}
