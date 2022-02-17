import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container, Flex, SimpleGrid } from '@chakra-ui/react';

import { ArtistsFilter, CollectionsFilter, NFTTypeFilter, PriceRangeFilter, SaleTypeFilter } from '../../components';
import { SortNftsOptions } from '../../constants';
import { Select } from '../../../../components';
import { NftItem } from '../../../nft/components';
import { INft } from '../../../nft/types';
import { Nfts } from '../../mocks/nfts';
import { useThemeContext } from '../../../../../contexts/ThemeContext';

export const BrowseNFTsPage = () => {
  const { setDarkMode } = useThemeContext() as any;

  const [sortBy, setSortBy] = useState();
  const [nfts, setNfts] = useState(Nfts);

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

  useEffect(() => setDarkMode(false), []);

  return (
    <>
      <Container maxW={'1360px'}>
        <Box py={'40px'}>
          <Flex justifyContent={'space-between'}>
            <Box sx={{
              '> button': {
                mr: '14px'
              }
            }}>
              <SaleTypeFilter onChange={(values) => console.log('values', values)} />
              <NFTTypeFilter onChange={(values) => console.log('values', values)} />
              <PriceRangeFilter onChange={(values) => console.log('values', values)} />
              <CollectionsFilter />
              <ArtistsFilter />
            </Box>
            <Select
              label={'Sort by'}
              items={SortNftsOptions}
              value={sortBy}
              buttonProps={{
                mr: '12px',
                justifyContent: 'space-between',
              }}
              onSelect={(val) => setSortBy(val)}
            />
          </Flex>
        </Box>
        <SimpleGrid columns={4} spacing={'20px'} mb={'40px'}>
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
      </Container>
    </>
  );
};
