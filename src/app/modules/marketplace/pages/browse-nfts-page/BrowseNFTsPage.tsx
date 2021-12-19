import React, { useCallback, useRef, useState } from 'react';
import { Box, Button, Container, Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react';

import {
  ArtistsFilter,
  CollectionsFilter,
  ISaleTypeFilterValue,
  NFTTypeFilter,
  PriceRangeFilter,
  SaleTypeFilter,
} from '../../components';
import { SortNftsOptions } from '../../constants';
import { BackToTopButton, Select } from '../../../../components';
import { NftItem } from '../../../nft/components';
import { INft } from '../../../nft/types';
import { Nfts } from '../../mocks/nfts';

import BrowseNFTsIntroImage from './../../../../../assets/images/marketplace/v2/browse_nfts_intro.png'
import { useStickyHeader } from '../../../../hooks';
import { FilterCollectionsItems } from '../../mocks/filter-collections';
import { FilterArtistsItems } from '../../mocks/filter-artists';
import { useFormik } from 'formik';
import { INftTypeFilterValue } from '../../components/filters/nft-type-filter/types';

export const BrowseNFTsPage = () => {
  const saleTypeFilterForm = useFormik<ISaleTypeFilterValue>({
    initialValues: {
      buyNow: false,
      onAuction: false,
      new: false,
      hasOffers: false,
    },
    onSubmit: (values) => {},
  });

  const nftTypeFilterForm = useFormik<INftTypeFilterValue>({
    initialValues: {
      singleItem: false,
      bundle: false,
      composition: false,
      stillImage: false,
      gif: false,
      audio: false,
      video: false,
    },
    onSubmit: (values) => {},
  });

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

  const handleClear = useCallback(() => {
    saleTypeFilterForm.resetForm();
    nftTypeFilterForm.resetForm();
  }, []);

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
              '> button, a': {
                mr: '14px'
              }
            }}>
              <SaleTypeFilter
                value={saleTypeFilterForm.values}
                onChange={(values) => saleTypeFilterForm.setValues(values)}
                onClear={() => saleTypeFilterForm.resetForm()}
              />
              <NFTTypeFilter
                value={nftTypeFilterForm.values}
                onChange={(values) => nftTypeFilterForm.setValues(values)}
                onClear={() => nftTypeFilterForm.resetForm()}
              />
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
              {
                (
                  saleTypeFilterForm.dirty ||
                  nftTypeFilterForm.dirty
                ) && (
                  <Link onClick={handleClear} sx={{
                    fontWeight: 500,
                    textDecoration: 'underline',
                    _hover: {
                      textDecoration: 'none',
                    }
                  }}>Clear all</Link>
                )
              }
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
