import { Box, Flex, HStack, Skeleton } from '@chakra-ui/react';
import React from 'react';
import { useMeasure } from 'react-use';

import * as s from './NFTCardSkeleton.styles';

export const NFTCardSkeleton: React.FC = () => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  return (
    <Box ref={ref} {...s.Wrapper}>
      <Box h={`${width}px`} {...s.AssetWrapper}>
        <Skeleton {...s.Asset} />
      </Box>
      <Box {...s.ContentWrapper}>
        <Flex justifyContent={'space-between'} mb={'6px'}>
          <Skeleton {...s.Title} />
          <Skeleton {...s.Price} />
        </Flex>

        <Flex justifyContent={'space-between'} mb={'14px'}>
          <Skeleton {...s.CollectionName} />
          <Skeleton {...s.CollectionName} />
        </Flex>

        <HStack {...s.Footer}>
          <Box flex={1}>
            <Skeleton {...s.FooterLabel1} />
          </Box>
          <Skeleton {...s.FooterLabel2} />
          <Skeleton {...s.FooterLabel3} />
        </HStack>
      </Box>
    </Box>
  );
}
