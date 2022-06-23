import React from 'react';
import { Box, Container, Flex, HStack, SimpleGrid, Skeleton, VStack } from '@chakra-ui/react';

import { NFTCardSkeleton } from '@app/modules/nft/components';

import * as s from './CollectionPageSkeleton.styles';

export const CollectionPageSkeleton: React.FC = () => {
  return (
    <Box pos={'relative'}>
      <Skeleton {...s.Cover} />

      <Container {...s.Container}>
        <Flex justifyContent={'space-between'} mb={'24px'}>
          <HStack spacing={'22px'}>
            <Skeleton {...s.Avatar} />
            <VStack alignItems={'flex-start'}>
              <Skeleton {...s.Name} />
              <Skeleton {...s.Address} />
            </VStack>
          </HStack>
          <HStack spacing={'50px'}>
            <HStack spacing={'12px'}>
              {new Array(6).fill(null).map((_, i) => (
                <Skeleton key={i} {...s.SocialLink} />
              ))}
            </HStack>

            <HStack spacing={'20px'}>
              <Skeleton {...s.HeroButton} w={'68px'} h={'42px'} />
              <Skeleton {...s.HeroButton} boxSize={'42px'} />
            </HStack>
          </HStack>
        </Flex>

        <SimpleGrid
          spacing={'1px'}
          columns={4}
          bg={'#E6E6E6'}
          boxShadow={'0px 10px 30px rgba(0, 0, 0, 0.1)'}
          borderRadius={'12px'}
          overflow={'hidden'}
        >
          {new Array(4).fill(null).map((_, i) => (
            <VStack bg={'white'} padding={'30px 32px'}>
              <Skeleton {...s.Statistic} w={'60%'} h={'20px'} />
              <Skeleton {...s.Statistic} w={'30%'} h={'28px'} />
            </VStack>
          ))}
        </SimpleGrid>

        <SimpleGrid columns={4} spacing={`16px`} py={'76px'}>
          <NFTCardSkeleton />
          <NFTCardSkeleton />
          <NFTCardSkeleton />
          <NFTCardSkeleton />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
