import { Box, Button, Container, Flex, Heading, Image, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { utils } from 'ethers';
import { useIntersection } from 'react-use';

import NoiseTextureImage from './../../../../../assets/images/v2/marketplace/noise_texture.png';
import IntroDesktopBGImage from './../../../../../assets/images/v2/marketplace/img_hero_desktop.png';
import IntroTabletBGImage from './../../../../../assets/images/v2/marketplace/img_hero_tablet.png';
import IntroMobileBGImage from './../../../../../assets/images/v2/marketplace/img_hero_mobile.png';
import BGImage from './../../../../../assets/images/v2/stone_bg.jpg';
import SaleTypeIcon from '../../../../../assets/images/v2/marketplace/filter-sale-type.svg';
import NFTTypeIcon from '../../../../../assets/images/v2/marketplace/filter-nft-type.svg';
import PriceRangeIcon from '../../../../../assets/images/v2/marketplace/filter-price-range.svg';
import ArrowDownIcon from '../../../../../assets/images/arrow-down.svg';

import { useAuthContext } from '../../../../../contexts/AuthContext'
import { SigninPopup } from './SignInPopup'
import {
  SearchBar,
  ISearchBarValue,
} from '../../components';
import { SortOrderOptions, SortOrderOptionsEnum } from '../../constants';
import { BackToTopButton, Loading, Select, Filters, ClearAll } from '../../../../components';
import {
  NftItem,
  NFTItemContentWithPrice,
  BundleItem,
} from '../../../nft/components';
import { IERC721AssetType, IERC721BundleAssetType, INFT, IOrder, ICollectionBackend, ISearchBarDropdownCollection } from '../../../nft/types';
import { useStaticHeader } from '../../../../hooks';
import { ORDERS_PER_PAGE } from './constants';
import {
  GetNFT2Api,
  GetActiveSellOrdersApi,
  GetCollectionsFromScraperApi,
  GetCollectionApi
} from '../../../nft/api';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { OrderAssetClass } from '../../../nft/enums';
import * as styles from './styles';
import { getTokenAddressByTicker } from '../../../../constants';
import { TokenTicker } from '../../../../enums';
import {
  SaleTypeFilter,
  SaleTypeFilterDropdown,
  NFTTypeFilter,
  NFTTypeFilterDropdown,
  PriceRangeFilter,
  PriceRangeFilterDropdown,
  useNFTTypeFilter,
  usePriceRangeFilter,
  useSaleTypeFilter,
} from '../../../account/pages/my-nfts-page/components/search-filters';
import { collectionKeys, nftKeys, orderKeys } from '../../../../utils/query-keys';
import Badge from '../../../../../components/badge/Badge';

export type ICollectionsFilterValue = Array<any>;

export const BrowseNFTsPage = () => {
  const { setDarkMode } = useThemeContext() as any;
  const { isWalletConnected } = useAuthContext();
  const queryClient = useQueryClient();

  const router = useHistory();

  const [sortBy, setSortBy] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState<string>();

  const { form: saleTypeFilterForm } = useSaleTypeFilter();
  const { form: nftTypeFilterForm } = useNFTTypeFilter();
  const { form: priceRangeFilterForm } = usePriceRangeFilter();

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
    setSelectedAddress(address);
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
      queryClient.setQueryData(collectionKeys.centralizedInfo(copy.address), offChainData)
      // Mutate the copy
      if (offChainData) {
        copy.image = offChainData.coverUrl ?? null;
        copy.name = copy.name || offChainData.name;
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

  const { data: ordersResult, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    orderKeys.browse({
      selectedAddress,
      saleFilter: saleTypeFilterForm.values,
      nftTypeFilter: nftTypeFilterForm.values,
      priceRangeFilter: priceRangeFilterForm.values,
      sorting: sortBy,
    }),
    async ({ pageParam = 1 }) => {
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
      const assetClassFilters = []
      if (nftTypeFilterForm.values.singleItem) {
        assetClassFilters.push("ERC721");
      }

      if (nftTypeFilterForm.values.bundle) {
        assetClassFilters.push("ERC721_BUNDLE");
      }

      if (assetClassFilters.length) {
        apiFilters['assetClass'] = assetClassFilters.join(',');
      }

      // Price Filters
      if (priceRangeFilterForm.values.currency.token && priceRangeFilterForm.dirty) {
        const ticker = priceRangeFilterForm.values.currency.token as TokenTicker;
        apiFilters['token'] = getTokenAddressByTicker(ticker)
      }

      const [minPrice, maxPrice] = priceRangeFilterForm.values.price;

      if (minPrice) {
        apiFilters['minPrice'] = minPrice;
      }

      if (maxPrice && priceRangeFilterForm.dirty) {
        apiFilters['maxPrice'] = maxPrice;
      }

      // Collection Filters
      if (selectedAddress) {
        apiFilters['collection'] = selectedAddress;
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
            queryClient.setQueryData(orderKeys.listing({collectionAddress: assetType.contract, tokenId: assetType.tokenId.toString()}), order);
            NFTsRequests.push(GetNFT2Api(assetType.contract, assetType.tokenId))
            break;
          case 'ERC721_BUNDLE':
            const assetTypeBundle = order.make.assetType as IERC721BundleAssetType;
            for (let i = 0; i < assetTypeBundle.contracts.length; i++) {
              for (const tokenId of assetTypeBundle.tokenIds[i]) {
                queryClient.setQueryData(orderKeys.listing({collectionAddress: assetTypeBundle.contracts[i], tokenId: tokenId.toString()}), order);
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
        //TODO: set query cache to this specific nft(nftKeys.info)
        const key = `${NFT.collection?.address}:${NFT.tokenId}`;

        queryClient.setQueryData(nftKeys.nftInfo({collectionAddress: NFT._collectionAddress || "", tokenId: NFT.tokenId}), NFT)

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
    },
    {
      retry: false,
      getNextPageParam: (lastPage, pages) => {
        return pages.length * ORDERS_PER_PAGE < lastPage.total ? pages.length + 1 : undefined;
      },
      onSuccess: (result) => {
        console.log('onSuccess 5:', result);
      }
    }
  );

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
    setSelectedAddress(undefined);
  }, []);

  useEffect(() => setDarkMode(false), []);

  const onModalClose = () => setIsOpen(false);

  const handleListNft = () => {
    if(!isWalletConnected) {
      setIsOpen(true);
      return;
    }
    router.push('/my-nfts')
  }

  const isFiltersDirty = saleTypeFilterForm.dirty
    || nftTypeFilterForm.dirty
    || priceRangeFilterForm.dirty;

  return (
    <Box layerStyle={'StoneBG'}>
      <Flex {...styles.IntroSectionStyle}>
        <Box>
          <Text fontSize={'12px'} fontWeight={500} textTransform={'uppercase'} mb={'23px'} letterSpacing={'5px'}>Welcome to the</Text>
          <Heading as={'h1'} fontSize={'36px'}>Marketplace <Badge style={{ fontSize: '12px', padding: '4px 9px', top: '-20px', marginLeft: '-2px' }} text="beta" /></Heading>
        </Box>
      </Flex>

      <Flex {...styles.SearchBarWrapperStyle}>
        <Box
          mb={'60px'}
          w={{ sm: '100%', md: '600px' }}
          mx={{ sm: '20px', md: 'auto' }}
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

      <Filters
        mobileFilters={[
          {
            name: 'Sale type',
            form: saleTypeFilterForm,
            icon: SaleTypeIcon,
            mobileComponent: SaleTypeFilter,
          },
          {
            name: 'NFT Type',
            form: nftTypeFilterForm,
            icon: NFTTypeIcon,
            mobileComponent: NFTTypeFilter,
          },
          {
            name: 'Price range',
            form: priceRangeFilterForm,
            icon: PriceRangeIcon,
            mobileComponent: PriceRangeFilter,
          },
        ]}
      >
        {({ openMobileFilters }) => (
          <Box
            ref={filtersRef}
            sx={{
              bg: intersection?.intersectionRect.top === 0 ? 'white' : 'transparent',
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
                    mr: '14px',
                  },
                  '> button:nth-of-type(n+3):not(:nth-last-of-type(1))': {
                    display: {
                      base: 'none',
                      lg: 'inline-flex',
                    }
                  }
                }}>
                  <SaleTypeFilterDropdown
                    value={saleTypeFilterForm.values}
                    onSave={(value) => saleTypeFilterForm.setValues(value)}
                    onClear={() => saleTypeFilterForm.resetForm()}
                  />
                  <NFTTypeFilterDropdown
                    value={nftTypeFilterForm.values}
                    onSave={(value) => nftTypeFilterForm.setValues(value)}
                    onClear={() => nftTypeFilterForm.resetForm()}
                  />
                  <PriceRangeFilterDropdown
                    value={priceRangeFilterForm.values}
                    isDirty={priceRangeFilterForm.dirty}
                    onSave={(value) => priceRangeFilterForm.setValues(value)}
                    onClear={() => priceRangeFilterForm.resetForm()}
                  />
                  <Button
                    variant={'dropdown'}
                    rightIcon={
                      <Image src={ArrowDownIcon} sx={{
                        width: '10px',
                        transition: '200ms',
                        transform: 'rotate(0deg)',
                      }} />
                    }
                    sx={{
                      fontSize: '14px',
                      minWidth: 'fit-content',
                      padding: '0 12px',
                      position: 'relative',
                      zIndex: 1,
                      display: {
                        base: 'none',
                        md: 'inline-flex',
                        lg: 'none',
                      }
                    }}
                    onClick={openMobileFilters}
                  >More</Button>
                  {isFiltersDirty && (<ClearAll onClick={handleClear} />)}
                </Box>
                <Select
                  label={'Sort by'}
                  items={SortOrderOptions}
                  value={sortBy}
                  buttonProps={{ justifyContent: 'space-between', }}
                  onSelect={(val) => setSortBy(val)}
                />
              </Flex>
            </Container>
          </Box>
        )}
      </Filters>

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
                  return order.make.assetType.assetClass === 'ERC721'
                    ? (
                      <NftItem
                        order={order}
                        key={order.id}
                        NFT={NFTs[0]}
                        collection={`${NFTs[0].collection?.address}`}
                        orderEnd={order.end}
                        renderContent={({ NFT, collection, creator, owner, bestOfferPrice, bestOfferPriceToken, lastOfferPrice, lastOfferPriceToken, order: orderData }) => (
                          <NFTItemContentWithPrice
                            name={NFT.name}
                            collection={collection}
                            creator={creator || undefined}
                            owner={owner || undefined}
                            order={orderData || undefined}
                            bestOfferPrice={bestOfferPrice || 0}
                            bestOfferPriceToken={bestOfferPriceToken || undefined}
                            lastOfferPrice={lastOfferPrice || 0}
                            lastOfferPriceToken={lastOfferPriceToken || undefined}
                          />
                        )}
                      />
                    )
                    : (
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
          {isFetching && (
            <Container centerContent py={'20px !important'}>
              <Loading />
            </Container>
          )}
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
                <Text fontSize={'14px'}>Choose the NFT's you’d like to list from your wallet and put them on sale.</Text>
              </Box>
              <Button sx={{ width: {sm: '100%', md: 'auto'}, marginTop: {sm: '20px', md: '0'} }} variant={'black'} onClick={handleListNft}>List an NFT</Button>
            </Flex>
          </Box>

          <BackToTopButton />
        </Container>
      </Box>
      <SigninPopup isOpen={isOpen} onModalClose={onModalClose} />
    </Box>
  );
};
