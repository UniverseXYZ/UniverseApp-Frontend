import { Box, Button, Container, Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react';
import { useFormik } from 'formik';

import {
  ArtistsFilter,
  CollectionsFilter,
  ISaleTypeFilterValue,
  NFTTypeFilter,
  PriceRangeFilter,
  SaleTypeFilter,
  INftTypeFilterValue,
  IPriceRangeFilterValue, ICollectionsFilterValue,
} from '../../components';
import { SortNftsOptions } from '../../constants';
import { BackToTopButton, Select } from '../../../../components';
import { NftItem } from '../../../nft/components';
import { INft } from '../../../nft/types';
import { Nfts } from '../../mocks/nfts';
import { useStickyHeader, useStickyHeader2 } from '../../../../hooks';
import { coins } from '../../../../mocks';

import BrowseNFTsIntroImage from './../../../../../assets/images/marketplace/v2/browse_nfts_intro.png'

export const BrowseNFTsPage = () => {
  const saleTypeFilterForm = useFormik<ISaleTypeFilterValue>({
    initialValues: {
      buyNow: false,
      onAuction: false,
      new: false,
      hasOffers: false,
    },
    onSubmit: () => {},
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
    onSubmit: () => {},
  });

  const priceRangeFilterForm = useFormik<IPriceRangeFilterValue>({
    initialValues: {
      currency: coins[0],
      price: [0, 100],
    },
    onSubmit: () => {},
  });

  const collectionsFilterForm = useFormik<ICollectionsFilterValue>({
    initialValues: [],
    onSubmit: () => {},
  });

  // TODO
  const artistsFilterForm = useFormik<ICollectionsFilterValue>({
    initialValues: [],
    onSubmit: () => {},
  });

  const [sortBy, setSortBy] = useState();
  const [nfts, setNfts] = useState(Nfts);

  const filtersRef = useRef(null);

  const isStickiedFilters = useStickyHeader2(filtersRef);

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
    priceRangeFilterForm.resetForm();
    collectionsFilterForm.resetForm();
    artistsFilterForm.resetForm();
  }, []);

  return (
    <Box>
      <Flex
        sx={{
          alignItems: 'center',
          bg: `url(${BrowseNFTsIntroImage}) center / cover, black`,
          color: 'white',
          justifyContent: 'center',
          h: '250px',
          minH: '250px',
          textAlign: 'center',
        }}
      >
        <Box>
          <Text fontSize={'12px'} fontWeight={500} textTransform={'uppercase'} mb={'23px'}>Welcome to the</Text>
          <Heading as={'h1'} fontSize={'36px'}>Marketplace</Heading>
        </Box>
      </Flex>
      <Box
        ref={filtersRef}
        sx={{
          bg: isStickiedFilters ? 'white' : 'transparent',
          display: {
            base: 'none',
            md: 'block',
          },
          my: '20px',
          p: '20px !important',
          w: '100%',
          zIndex: 30,
        }}
      >
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
              <PriceRangeFilter
                value={priceRangeFilterForm.values}
                isDirty={priceRangeFilterForm.dirty}
                onChange={(values) => priceRangeFilterForm.setValues(values)}
                onClear={() => priceRangeFilterForm.resetForm()}
              />
              <CollectionsFilter
                value={collectionsFilterForm.values}
                onChange={(values) => collectionsFilterForm.setValues(values)}
                onClear={() => collectionsFilterForm.resetForm()}
              />
              <ArtistsFilter
                value={artistsFilterForm.values}
                onChange={(values) => artistsFilterForm.setValues(values)}
                onClear={() => artistsFilterForm.resetForm()}
              />
              {
                (
                  saleTypeFilterForm.dirty
                  || nftTypeFilterForm.dirty
                  || priceRangeFilterForm.dirty
                  || collectionsFilterForm.dirty
                  || artistsFilterForm.dirty
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
      <Box px={'20px'} pt={{ base: '20px', md: 0, }}>
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
      </Box>
    </Box>
  );
};
