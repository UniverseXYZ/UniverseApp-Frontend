import {
  Box,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';


import * as s from './AuctionManagedCardSkeleton.styles';

export const AuctionManagedCardSkeleton = () => {

  const [badges] = useState(new Array(3).fill(null));
  const [statistics] = useState(new Array(4).fill(null));

  return (
    <Box {...s.GradientWrapper}>
      <Box {...s.Wrapper}>
        <Flex {...s.FirstRowWrapper}>
          <Box {...s.TitleWrapper}>
            <Skeleton {...s.Title} />
          </Box>
          <Skeleton{...s.LandingPageButton} />
          <Skeleton {...s.ExpandButton} />
        </Flex>

        <VStack spacing={'30px'} alignItems={'flex-start'}>
          <Stack spacing={'12px'} direction={{ base: 'column', md: 'row' }}>
            {badges.map((_, i) => <Skeleton key={i} {...s.Badge} />)}
          </Stack>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={'20px'} w={'100%'}>
            {statistics.map((_, i) => (
              <Box key={i} {...s.StatisticItem}>
                <Skeleton {...s.StatisticItemName} />
                <Skeleton {...s.StatisticItemValue} />
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
}
