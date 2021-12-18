import React, { useCallback, useRef, useState } from 'react';
import { Box, Button, Container, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { ArtistsFilter, CollectionsFilter, NFTTypeFilter, PriceRangeFilter, SaleTypeFilter } from '../../components';
import { SortNftsOptions } from '../../constants';
import { BackToTopButton, Select } from '../../../../components';
import { NftItem } from '../../../nft/components';
import { INft } from '../../../nft/types';
import { Nfts } from '../../mocks/nfts';

import BrowseNFTsIntroImage from './../../../../../assets/images/marketplace/v2/browse_nfts_intro.png'
import { useStickyHeader } from '../../../../hooks';
import { FilterCollectionsItems } from '../../mocks/filter-collections';
import { FilterArtistsItems } from '../../mocks/filter-artists';

export const BrowseNFTsPage = () => {
  const [sortBy, setSortBy] = useState();
  const [nfts, setNfts] = useState(Nfts);

  const filtersRef = useRef(null);

  useStickyHeader(filtersRef);

  const handleNFTAuctionTimeOut = useCallback((index) => {
    setNfts(nfts.filter((nft, i) => i !== index));
  }, [nfts]);

  const handleLoadMore = useCallback(() => {
    setNfts([
      ...nfts,
      ...Nfts.map((nft) => ({
        ...nft,
        id: (nft.id as number) * (nfts.length / Nfts.length + 1),
      }))
    ]);
  }, [nfts]);

  return (
    <>
      <Flex
        sx={{
          bg: `url(${BrowseNFTsIntroImage}) center / cover, black`,
          minH: '250px',
          h: '250px',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Box>
          <Text fontSize={'12px'} fontWeight={500} textTransform={'uppercase'} mb={'23px'}>Welcome to the</Text>
          <Heading as={'h1'} fontSize={'36px'}>Marketplace</Heading>
        </Box>
      </Flex>
      <Box ref={filtersRef} bg={'white'} w={'100%'} py={'40px !important'}>
        <Container maxW={'1360px'} py={'0 !important'} position={'relative'}>
          <Flex justifyContent={'space-between'}>
            <Box sx={{
              '> button': {
                mr: '14px'
              }
            }}>
              <SaleTypeFilter onChange={(values) => console.log('values', values)} />
              <NFTTypeFilter onChange={(values) => console.log('values', values)} />
              <PriceRangeFilter onChange={(values) => console.log('values', values)} />
              <CollectionsFilter
                items={FilterCollectionsItems}
                onChange={(values) => console.log('values', values)}
                onClear={() => {}}
              />
              <ArtistsFilter
                items={FilterArtistsItems}
                onChange={(values) => console.log('values', values)}
                onClear={() => {}}
              />
            </Box>
            <Select
              label={'Sort by'}
              items={SortNftsOptions}
              value={sortBy}
              buttonProps={{
                justifyContent: 'space-between',
              }}
              onSelect={(val) => setSortBy(val)}
            />
          </Flex>
        </Container>
      </Box>
      <Container maxW={'1360px'} pt={'0 !important'} position={'relative'}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacingX={'20px'} spacingY={'30px'} mb={'40px'}>
          {nfts.map((nft, i) => {
            return (
              <NftItem
                key={nft.id}
                nft={nft as INft}
                onAuctionTimeOut={() => handleNFTAuctionTimeOut(i)}
              />
            );
          })}
        </SimpleGrid>
        <Button variant={'outline'} isFullWidth mb={'20px'} onClick={handleLoadMore}>Load More</Button>
        <BackToTopButton />
      </Container>
    </>
  );
};
