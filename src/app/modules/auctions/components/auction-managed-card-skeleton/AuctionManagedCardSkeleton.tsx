import { Box, Button, Flex, Heading, HStack, Icon, SimpleGrid, Tooltip, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

import { ReactComponent as ArrowIcon } from '@assets/images/arrow-2.svg';

import * as styles from './AuctionManagedCardSkeleton.styles';

export const AuctionManagedCardSkeleton = () => {

  const [badges] = useState(new Array(3).fill(null));
  const [statistics] = useState(new Array(4).fill(null));

  return (
    <Box {...styles.GradientWrapper}>
      <Box {...styles.Wrapper}>
        <Flex alignItems={'center'} justifyContent={'space-between'} mb={'20px'}>
          <Box {...styles.Title} />
          <HStack spacing={'14px'}>
            <Box {...styles.LandingPageButton} />
            <Box {...styles.ExpandButton} />
          </HStack>
        </Flex>

        <VStack spacing={'30px'} alignItems={'flex-start'}>
          <HStack spacing={'12px'}>
            {badges.map((_, i) => <Box key={i} {...styles.Badge} />)}
          </HStack>

          <SimpleGrid columns={4} spacing={'20px'} w={'100%'}>
            {statistics.map((_, i) => (
              <Box key={i} {...styles.StatisticItem}>
                <Box {...styles.StatisticItemName} />
                <Box {...styles.StatisticItemValue} />
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
}
