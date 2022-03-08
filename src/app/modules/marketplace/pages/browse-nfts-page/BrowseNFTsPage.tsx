import { Box, Button, Container, Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { utils } from 'ethers';
import Popup from 'reactjs-popup';
import { useIntersection } from 'react-use';

import NoiseTextureImage from './../../../../../assets/images/v2/marketplace/noise_texture.png';
import IntroDesktopBGImage from './../../../../../assets/images/v2/marketplace/img_hero_desktop.png';
import IntroTabletBGImage from './../../../../../assets/images/v2/marketplace/img_hero_tablet.png';
import IntroMobileBGImage from './../../../../../assets/images/v2/marketplace/img_hero_mobile.png';
import BGImage from './../../../../../assets/images/v2/stone_bg.jpg';
import filterIcon from './../../../../../assets/images/marketplace/filters.svg';

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
  SearchBar,
  ISearchBarValue,
} from '../../components';
import { SortOrderOptions, SortOrderOptionsEnum } from '../../constants';
import { BackToTopButton, Select } from '../../../../components';
import {
  NftItem,
  NFTItemContentWithPrice,
  BundleItem,
} from '../../../nft/components';
import { IERC721AssetType, IERC721BundleAssetType, INFT, IOrder, ICollectionBackend, ISearchBarDropdownCollection } from '../../../nft/types';
import { useStaticHeader } from '../../../../hooks';
import { coins } from '../../../../mocks';
import { ORDERS_PER_PAGE } from './constants';
import {
  GetNFT2Api,
  GetActiveSellOrdersApi,
  GetCollectionsFromScraperApi,
  GetCollectionApi
} from '../../../nft/api';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { CollectionPageLoader } from '../../../../../containers/collection/CollectionPageLoader';
import { OrderAssetClass } from '../../../nft/enums';
import BrowseFilterPopup from '../../../../../components/popups/BrowseFiltersPopup';
import * as styles from './styles';

export const BrowseNFTsPage = () => {
  const { setDarkMode } = useThemeContext() as any;

  const router = useHistory();

  const [sortBy, setSortBy] = useState('');

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
      price: [0, 0],
    },
    onSubmit: () => {},
  });

  const collectionsFilterForm = useFormik<ICollectionsFilterValue>({
    initialValues: [],
    onSubmit: () => {},
  });

  const searchBarForm = useFormik<ISearchBarValue>({
    initialValues: {
      searchValue: '',
    },
    onSubmit: () => {},
  });

  const handleSearchBarItemSelect = (address: string) => {
    // Clear all the current filters
    handleClear();

    // Refetch the orders based on the new address
    collectionsFilterForm.setValues([{address: address}]);
  }

  const { data: collectionsResult, isFetching: isFetchingCollections } = useInfiniteQuery([
    'collections',
    searchBarForm.values,
    sortBy
  ], async () => {

    const searchQuery = searchBarForm.values;

    // The Input field is empty, no need to send request to the Scraper.
    if (!searchQuery?.searchValue) return;

    // Get the collections data
    const scraperData = await GetCollectionsFromScraperApi(searchQuery.searchValue);

    // The scraper doesn't return off chain info like (images, etc.) so we need to call the Universe Backend App for more info.

    // Fetch collection (off chain) data from the Universe API
    const getOffChainCollectionDataPromises = scraperData.map(async (c: ISearchBarDropdownCollection) => {
      const copy: ISearchBarDropdownCollection  = { ...c };
      const offChainData = await GetCollectionApi(copy.address);

      // Mutate the copy
      if (offChainData) {
        copy.image = offChainData.coverUrl ?? null;
      }

      return copy;
    })

    const fullCollectionData = await Promise.all(getOffChainCollectionDataPromises);

    // TODO:: Fetch the items count from the Scrapper API (ако има време !)
    return { data: fullCollectionData };
  }, {
    retry: false,
    onSuccess: (result) => {
      console.log('Get collections Success', result);
    }
  });

  // TODO
  const artistsFilterForm = useFormik<ICollectionsFilterValue>({
    initialValues: [],
    onSubmit: () => {},
  });
  const { data: ordersResult, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery([
    'orders',
    saleTypeFilterForm.values,
    nftTypeFilterForm.values,
    priceRangeFilterForm.values,
    collectionsFilterForm.values,
    sortBy
  ], async ({ pageParam = 1 }) => {
    const apiFilters: any = { page: pageParam, side: 1 };

    // Sale Filters
    if (saleTypeFilterForm.values.hasOffers) {
      apiFilters['hasOffers'] = true
    }

    if (saleTypeFilterForm.values.buyNow) {
      apiFilters['side'] = 1
    }

    if (saleTypeFilterForm.values.new) {
      apiFilters['beforeTimestamp'] = Math.floor((new Date()).getTime() / 1000)
    }

    // NFT Filters
    if (nftTypeFilterForm.values.singleItem) {
      apiFilters['assetClass'] = "ERC721";
    }

    if (nftTypeFilterForm.values.bundle) {
      apiFilters['assetClass'] = "ERC721_BUNDLE";
    }
    
    // Price Filters
    if (priceRangeFilterForm.values.currency.token && priceRangeFilterForm.dirty) {
      apiFilters['token'] = priceRangeFilterForm.values.currency.token;
    }

    const [minPrice, maxPrice] = priceRangeFilterForm.values.price;

    if (minPrice) {
      apiFilters['minPrice'] = minPrice; 
    }

    if (maxPrice && priceRangeFilterForm.dirty) {
      apiFilters['maxPrice'] = maxPrice;
    }

    // Collection Filters
    if (collectionsFilterForm.values.length) {
      apiFilters['collection'] = collectionsFilterForm.values[0].address
    }

    // Sorting
    if (sortBy) {
      let sortFilter = 0
      switch (sortBy) {
        case SortOrderOptionsEnum.EndingSoon:
          sortFilter = 1
          break;
        case SortOrderOptionsEnum.HighestPrice:
          sortFilter = 2
          break;
        case SortOrderOptionsEnum.LowestPrice:
          sortFilter = 3
          break;
        case SortOrderOptionsEnum.RecentlyListed:
          sortFilter = 4
          break;
        default:
          break;
      }
      apiFilters['sortBy'] = sortFilter;
    }

    const { orders, total } = await GetActiveSellOrdersApi(apiFilters);

    const NFTsRequests: Array<any> = [];

    for (const order of orders) {
      switch (order.make.assetType.assetClass) {
        case 'ERC721':
          const assetType = order.make.assetType as IERC721AssetType;
          NFTsRequests.push(GetNFT2Api(assetType.contract, assetType.tokenId))
          break;
        case 'ERC721_BUNDLE':
          const assetTypeBundle = order.make.assetType as IERC721BundleAssetType;
          for (let i = 0; i < assetTypeBundle.contracts.length; i++) {
            for (const tokenId of assetTypeBundle.tokenIds[i]) {
              NFTsRequests.push(GetNFT2Api(assetTypeBundle.contracts[i], tokenId))
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

  const filtersRef = useRef(null);

  const intersection = useIntersection(filtersRef, {
    threshold: 1,
    root: null,
    rootMargin: '0px'
  });

  useStaticHeader();

  const handleClear = useCallback(() => {
    saleTypeFilterForm.resetForm();
    nftTypeFilterForm.resetForm();
    priceRangeFilterForm.resetForm();
    collectionsFilterForm.resetForm();
    artistsFilterForm.resetForm();
  }, []);

  useEffect(() => setDarkMode(false), []);

  return (
    <Box bg={`url(${BGImage}) center / cover`}>
      <Flex {...styles.IntroSectionStyle}>
        <Box>
          <Text fontSize={'12px'} fontWeight={500} textTransform={'uppercase'} mb={'23px'} letterSpacing={'5px'}>Welcome to the</Text>
          <Heading as={'h1'} fontSize={'36px'}>Marketplace</Heading>
        </Box>
      </Flex>

      <Flex {...styles.SearchBarWrapperStyle}>
        <Box mb={'60px'}
             w={{ sm: '100%', md: '600px' }}
             ml={{ sm: '20px', md: 'auto' }}
             mr={{ sm: '20px', md: 'auto' }}
        >
          <SearchBar
            collections={collectionsResult?.pages[0]?.data || []}
            isFetchingCollections={isFetchingCollections}
            value={searchBarForm.values}
            onChange={(value) => searchBarForm.setValues(value)}
            onClear={() => {
              handleClear();
              searchBarForm.resetForm();
            }}
            onItemSelect={(value) => handleSearchBarItemSelect(value)}
          />
        </Box>
      </Flex>

      <Box
        ref={filtersRef}
        sx={{
          bg: intersection?.intersectionRect.top === 0 ? 'white' : 'transparent',
          display: {
            base: 'none',
            md: 'block',
          },
          my: '20px',
          p: '20px !important',
          position: 'sticky',
          top: '-1px',
          transition: '200ms',
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
              {/* <CollectionsFilter
                value={collectionsFilterForm.values}
                onChange={(values) => collectionsFilterForm.setValues(values)}
                onClear={() => collectionsFilterForm.resetForm()}
              /> */}
              {/* <ArtistsFilter
                value={artistsFilterForm.values}
                onChange={(values) => artistsFilterForm.setValues(values)}
                onClear={() => artistsFilterForm.resetForm()}
              /> */}
              {
                (
                  saleTypeFilterForm.dirty
                  || nftTypeFilterForm.dirty
                  || priceRangeFilterForm.dirty
                  || collectionsFilterForm.dirty
                  || artistsFilterForm.dirty
                ) && (
                  <Link onClick={handleClear} sx={{
                    fontSize: '14px',
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
              items={SortOrderOptions}
              value={sortBy}
              buttonProps={{
                justifyContent: 'space-between',
              }}
              onSelect={(val) => setSortBy(val)}
            />
          </Flex>
        </Container>
      </Box>
      <div className="mobile--filters">
        <Popup
          trigger={
            <button type="button" className="light-button">
              <img src={filterIcon} alt="Filter" />
            </button>
          }
        >
          {(close: any) => (
            // TODO: need to convert this old functional with the new one -> useFormik
            <BrowseFilterPopup
              onClose={close}
              // saleTypeButtons={saleTypeButtons}
              // setSaleTypeButtons={setSaleTypeButtons}
              // setSelectedPrice={setSelectedPrice}
              // selectedTokenIndex={selectedTokenIndex}
              // setSelectedTokenIndex={setSelectedTokenIndex}
              // selectedCollections={selectedCollections}
              // setSelectedCollections={setSelectedCollections}
              // savedCollections={savedCollections}
              // setSavedCollections={setSavedCollections}
              // selectedCreators={selectedCreators}
              // setSelectedCreators={setSelectedCreators}
              // savedCreators={savedCreators}
              // setSavedCreators={setSavedCreators}
            />
          )}
        </Popup>
        {/* {selectedFiltersLength !== 0 && <div className="count">{selectedFiltersLength}</div>} */}
      </div>
      <Box px={'20px'} pt={{ base: '20px', md: 0, }}>
        <Container maxW={'1360px'} pt={'0 !important'} position={'relative'}>
          {!isFetching && !ordersResult?.pages[0].data.length ?
            <Container centerContent>
              <div>No results found</div>
            </Container>
            :
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacingX={'20px'} spacingY={'30px'} mb={'40px'}>
              {(ordersResult?.pages ?? []).map((page) => {
                return page.data.map(({ order, NFTs }) => {
                  if (!NFTs.length) {
                    return null;
                  }
                return order.make.assetType.assetClass === 'ERC721' ? (
                  <NftItem
                    order={order}
                    key={order.id}
                    NFT={NFTs[0]}
                    showBuyNowButton
                    collection={`${NFTs[0].collection?.address}`}
                    orderEnd={order.end}
                    renderContent={({ NFT, collection, creator, owner, bestOfferPrice, bestOfferPriceToken, lastOfferPrice, lastOfferPriceToken }) => (
                      <NFTItemContentWithPrice
                      name={NFT.name}
                      collection={collection}
                      tokenId={NFT.tokenId}
                      creator={creator || undefined}
                      owner={owner || undefined}
                      order={{
                        assetClass: OrderAssetClass.ERC721,
                        collectionAddress: `${NFT._collectionAddress}`,
                        tokenId: `${NFT.tokenId}`,
                      }}
                      bestOfferPrice={bestOfferPrice || 0}
                      bestOfferPriceToken={bestOfferPriceToken || undefined}
                      lastOfferPrice={lastOfferPrice || 0}
                      lastOfferPriceToken={lastOfferPriceToken || undefined}
                      />
                    )}
                  />
                ) : (
                  <BundleItem
                    key={order.id}
                    NFTs={NFTs}
                    order={order}
                    renderContent={() => (
                      <NFTItemContentWithPrice
                        name={(order.make.assetType as IERC721BundleAssetType).bundleName}
                        creator={NFTs[0].creator}
                        order={order}
                        // price={+utils.formatUnits(order.take.value, `${TOKENS_MAP[order.take.assetType.assetClass as TokenTicker].decimals}`)}
                        // priceToken={order.take.assetType.assetClass as TokenTicker}
                      />
                    )}
                  />
                );
              })
            })}
          </SimpleGrid>
          }
          {isFetching &&
           <Container centerContent>
              <CollectionPageLoader/>
            </Container>
          }
          {hasNextPage && !isFetching && (
            <Button variant={'outline'} isFullWidth mb={'20px'} onClick={() => fetchNextPage()}>
              {isFetching ? 'Loading...' : 'Load More'}
            </Button>
          )}

          <Box sx={{
            bg: `linear-gradient(92.86deg, #D5ACFD -3.25%, #ABB3FC 49.31%, #81EEBF 104.41%)`,
            borderRadius: '12px',
            position: 'relative',
            filter: 'drop-shadow(0px 10px 36px rgba(136, 120, 172, 0.14))',
            mt: '60px',
            p: {sm: '30px', md: '60px'},
            _before: {
              bg: `url(${NoiseTextureImage}) center / 20%, linear-gradient(92.86deg, #D5ACFD -3.25%, #ABB3FC 49.31%, #81EEBF 104.41%)`,
              borderRadius: 'inherit',
              position: 'absolute',
              backgroundBlendMode: 'overlay',
              top: 0,
              left: 0,
              w: '100%',
              h: '100%',
              content: '""',
              opacity: 0.3,
              zIndex: -1,
            },
          }}>
            <Flex alignItems={'center'} justifyContent={'space-between'} flexWrap={{ sm: 'wrap', md: 'nowrap' }}>
              <Box>
                <Heading fontSize={{ sm: '20px', md: '26px' }} mb={'10px'}>List your NFTs</Heading>
                <Text fontSize={'14px'}>Choose the NFT you’d like to list from your wallet and put them on sale for FREE.</Text>
              </Box>
              <Button sx={{ width: {sm: '100%', md: 'auto'}, marginTop: {sm: '20px', md: '0'} }} variant={'black'} onClick={() => router.push('/my-nfts')}>List an NFT</Button>
            </Flex>
          </Box>

          <BackToTopButton />
        </Container>
      </Box>
    </Box>
  );
};
