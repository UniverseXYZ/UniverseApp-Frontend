import { Box, Button, Container, Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useCallback, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { utils } from 'ethers';

import BrowseNFTsIntroImage from './../../../../../assets/images/marketplace/v2/browse_nfts_intro.png';

import {
  ArtistsFilter,
  CollectionsFilter,
  ICollectionsFilterValue,
  INftTypeFilterValue,
  IPriceRangeFilterValue,
  ISaleTypeFilterValue,
  NFTTypeFilter,
  PriceRangeFilter,
  SaleTypeFilter,
} from '../../components';
import { SortNftsOptions } from '../../constants';
import { BackToTopButton, Select } from '../../../../components';
import { NftItem, NFTItemContentWithPrice } from '../../../nft/components';
import { IERC721AssetType, IERC721BundleAssetType, INFT, IOrder, IOrderBackend } from '../../../nft/types';
import { useStickyHeader2 } from '../../../../hooks';
import { coins } from '../../../../mocks';
import { mapBackendOrder } from '../../../nft';
import { ORDERS_PER_PAGE } from './constants';
import { GetNFTApi } from '../../../nft/api';
import { TokenTicker } from '../../../../enums';
import { TOKENS_MAP } from '../../../../constants';

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

  const { data: ordersResult, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery('browse-nfts:orders', async ({ pageParam = 1 }) => {
    const [data, total] = (await axios.get<[IOrderBackend[], number]>(
      `${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders`,
      {
        params: {
          page: pageParam
        }
      }
    )).data;

    const orders = data.map((order) => mapBackendOrder(order));

    const NFTsRequests: Array<any> = [];

    for (const order of orders) {
      switch (order.make.assetType.assetClass) {
        case 'ERC721':
          const assetType = order.make.assetType as IERC721AssetType;
          NFTsRequests.push(GetNFTApi(assetType.contract, assetType.tokenId))
          break;
        case 'ERC721_BUNDLE':
          const assetTypeBundle = order.make.assetType as IERC721BundleAssetType;
          for (let i = 0; i < assetTypeBundle.contracts.length; i++) {
            for (const tokenId of assetTypeBundle.tokenIds[i]) {
              NFTsRequests.push(GetNFTApi(assetTypeBundle.contracts[i], tokenId))
            }
          }
          break;
      }
    }

    const NFTsMap = (await (Promise.allSettled(NFTsRequests))).reduce<Record<string, INFT>>((acc, response) => {
      if (response.status !== 'fulfilled') {
        return acc;
      }

      const NFT: INFT = response.value;

      const key = `${NFT.collection?.address}:${NFT.tokenId}`;

      acc[key] = NFT;

      return acc;
    }, {});

    const result = orders.reduce<Array<{ order: IOrder; NFTs: INFT[]; }>>((acc, order) => {
      const NFTsMapKeys = Object.keys(NFTsMap);

      switch (order.make.assetType.assetClass) {
        case 'ERC721':
          const assetType = order.make.assetType as IERC721AssetType;
          if (NFTsMapKeys.includes(`${assetType.contract}:${assetType.tokenId}`)) {
            acc.push({
              order,
              NFTs: NFTsMap[`${assetType.contract}:${assetType.tokenId}`]
                ? [NFTsMap[`${assetType.contract}:${assetType.tokenId}`]]
                : []
            })
          }
          break;
        case 'ERC721_BUNDLE':
          const assetTypeBundle = order.make.assetType as IERC721BundleAssetType;
          const NFTs = [];

          for (let i = 0; i < assetTypeBundle.contracts.length; i++) {
            for (const tokenId of assetTypeBundle.tokenIds[i]) {
              if (NFTsMap[`${assetTypeBundle.contracts[i]}:${tokenId}`]) {
                NFTs.push(NFTsMap[`${assetTypeBundle.contracts[i]}:${tokenId}`]);
              }
            }
          }

          acc.push({ order, NFTs });

          break;
      }

      return acc;
    }, []);

    return { total, data: result };
  }, {
    retry: false,
    getNextPageParam: (lastPage, pages) => {
      return pages.length * ORDERS_PER_PAGE < lastPage.total ? pages.length + 1 : undefined;
    },
    onSuccess: (result) => {
      console.log('onSuccess 5:', result);
    }
  });

  const [sortBy, setSortBy] = useState();

  const filtersRef = useRef(null);

  const isStickiedFilters = useStickyHeader2(filtersRef);

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
            {(ordersResult?.pages ?? []).map((page) => {
              return page.data.map(({ order, NFTs }) => {
                if (!NFTs.length) {
                  return null;
                }

                return (
                  <NftItem
                    key={order.id}
                    nft={NFTs[0]}
                    bundleNFTs={NFTs.slice(1)}
                    renderContent={(
                      <NFTItemContentWithPrice
                        name={NFTs[0].name}
                        creator={NFTs[0].creator}
                        collection={NFTs[0].collection}
                        owner={NFTs[0].owner}
                        price={+utils.formatUnits(order.take.value, `${TOKENS_MAP[order.take.assetType.assetClass as TokenTicker].decimals}`)}
                        priceToken={order.take.assetType.assetClass as TokenTicker}
                      />
                    )}
                  />
                );
              })
            })}
          </SimpleGrid>
          {hasNextPage && (
            <Button variant={'outline'} isFullWidth mb={'20px'} onClick={() => fetchNextPage()}>
              {isFetching ? 'Loading...' : 'Load More'}
            </Button>
          )}
          <BackToTopButton />
        </Container>
      </Box>
    </Box>
  );
};
