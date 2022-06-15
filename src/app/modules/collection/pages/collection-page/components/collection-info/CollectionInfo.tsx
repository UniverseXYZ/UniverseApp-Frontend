import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text, Tooltip, VStack,
} from '@chakra-ui/react';
import { Contract, providers } from 'ethers';
import { useRouter } from "next/router";
import { useInfiniteQuery, useQuery } from 'react-query';
import React, { useCallback, useMemo, useState } from 'react';
import { useCopyToClipboard, useDebounce, useMeasure } from 'react-use';

// Assets
import CollectionOGPlaceholder from "@assets/images/open-graph/collection-placeholder.png";
import SearchIcon from '@assets/images/search-gray.svg';

// Legacy
import { CollectionPageLoader } from "@legacy/collection/CollectionPageLoader";
import NotFound from '../../../../../../../components/notFound/NotFound';
import NftCardSkeleton from "../../../../../../../components/skeletons/nftCardSkeleton/NftCardSkeleton";
import Contracts from "../../../../../../../contracts/contracts.json";
import { useAuthStore } from "../../../../../../../stores/authStore";
import { useCollectionPageData } from "../../CollectionPage.context";

// App
import { FiltersStickyWrapper, Icon, OpenGraph, Select } from '@app/components';
import { NFTCard, NFTCardSkeleton, NoNFTsFound } from '@app/modules/nft/components';
import { SortBy, SortByNames, SortByOptions } from '@app/constants';
import {
  NFTTypeFilter,
  PriceRangeFilter,
  PropertiesFilter,
  SaleTypeFilter,
  useNFTTypeFilter,
  usePriceRangeFilter,
  usePropertiesFilter,
  useSaleTypeFilter,
} from '@app/components/filters/shared';
import { Filter, Filters, ToggleFiltersButton } from '@app/components/filters';
import { NFTCardSize, useNFTFluidGrid, useStaticHeader } from '@app/hooks';
import { formatAddress, getStrGradient } from '@app/helpers';

import { collectionKeys } from '@app/utils/query-keys';
import { getCollectionNFTsTotalApi, queryNFTsApi } from '@app/api';
import { ORDERS_PER_PAGE } from '@app/modules/marketplace/pages/browse-nfts-page/constants';
import { ToggleButton, ToggleButtonGroup } from '@app/modules/marketplace/pages/browse-nfts-page/components';

import { CollectionCover, CollectionSocialLinks, CollectionStatistics, NoDescriptionFound } from './components';
import * as s from './CollectionInfo.styles';

export const CollectionInfo = () => {
  const router = useRouter();

  const [_, copyToClipboard] = useCopyToClipboard();

  const { address, isAuthenticated } = useAuthStore();

  const [showCopied, setShowCopied] = useState(false);

  const {
    collection,
    collectionAddress,
    collectionGeneralInfo,
    collectionOrderBookData,
  } = useCollectionPageData();

  const { data: ownerAddress } = useQuery(
    collectionKeys.collectionOwner(collectionAddress),
    async () => {
      const network = providers.getNetwork(
        +`${process.env.REACT_APP_NETWORK_CHAIN_ID}`
      );
      const provider = providers.getDefaultProvider(network);

      // @ts-ignore
      const { contracts } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

      const collectionContract = new Contract(
        collectionAddress,
        contracts.UniverseERC721Core.abi,
        provider
      );

      const owner = await collectionContract.owner();

      return owner.toLowerCase();
    }
  );

  const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();

  const NFTGrid = useNFTFluidGrid(containerWidth, 16);

  useStaticHeader();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>();

  const saleTypeFilter = useSaleTypeFilter();
  const nftTypeFilter= useNFTTypeFilter();
  const priceRangeFilter = usePriceRangeFilter();
  const propertiesFilter = usePropertiesFilter();

  const dirtyFiltersAmount = useMemo(() => {
    return [
      saleTypeFilter,
      nftTypeFilter,
      priceRangeFilter,
      propertiesFilter,
    ].filter(filter => filter.form.dirty).length;
  }, [saleTypeFilter, nftTypeFilter, priceRangeFilter, propertiesFilter]);

  useDebounce(() => {
    setDebouncedSearch(search);
  }, 1000, [search]);

  const {
    data: NFTs,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    collectionKeys.collectionNFTs(collectionAddress, {
      saleFilter: saleTypeFilter.form.values,
      nftTypeFilter: nftTypeFilter.form.values,
      priceRangeFilter: priceRangeFilter.form.values,
      propertiesFilter: propertiesFilter.form.values,
      sorting: sortBy,
      search: debouncedSearch,
    }),
    ({ pageParam = 1 }) => queryNFTsApi({
      page: pageParam,
      limit: ORDERS_PER_PAGE,
      sortBy,
      collection: collectionAddress,
      search: debouncedSearch,
      hasOffers: saleTypeFilter.form.values.hasOffers,
      buyNow: saleTypeFilter.form.values.buyNow,
      newest: saleTypeFilter.form.values.new,
      singleListing: nftTypeFilter.form.values.singleItem,
      bundleListing: nftTypeFilter.form.values.bundle,
      tokenTicker: priceRangeFilter.form.values.currency?.token ?? undefined,
      minPrice: priceRangeFilter.form.values.price[0],
      maxPrice: priceRangeFilter.form.values.price[1],
      traits: propertiesFilter.form.values.properties,
    }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.data.length && lastPage.data.length >= ORDERS_PER_PAGE
          ? pages.length + 1
          : undefined;
      },
    }
  );

  const { data: NFTsTotal } = useQuery(
    collectionKeys.collectionNFTsTotal(collectionAddress),
    () => getCollectionNFTsTotalApi(collectionAddress),
  );

  const handleEdit = useCallback(() => {
    router.push(`/my-nfts/create?tabIndex=1&nftType=collection&collection=${collectionAddress}`)
  }, []);

  const handleCopy = useCallback((address: string) => {
    copyToClipboard(address);
    setShowCopied(true);

    setTimeout(() => setShowCopied(false), 1500);
  }, []);

  const schema = {
    "@context": "http://schema.org",
    "@type": "CreativeWork",
    name: `${collection?.name || collectionAddress} – Collection`,
    description: collection?.description || "",
    image: {
      "@type": "ImageObject",
      url: collection?.bannerUrl || collection?.coverUrl || "",
    },
  };

  const isOwner = (isAuthenticated &&
    (address?.toLowerCase() === ownerAddress
      || address?.toLowerCase() === process.env.REACT_APP_COLLECTION_EDITOR?.toLowerCase()
    ));

  const [color1, color2] = getStrGradient(collectionAddress);

  // FIXME: NotFound + CollectionPageLoader
  // return (<NotFound />);
  // return (<CollectionPageLoader />);

  return (
    <>
      <OpenGraph
        title={`${collection?.name || collection?.address} – Collection`}
        description={collection?.description || undefined}
        image={
          collection?.bannerUrl ||
          collection?.coverUrl ||
          CollectionOGPlaceholder
        }
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>

      <Box layerStyle={"StoneBG"}>
        <CollectionCover
          collectionAddress={collectionAddress}
          collection={collection}
          isOwner={isOwner}
        />
        <Box {...s.CollectionInfoWrapper}>
          <Stack
            direction={['column', null, 'row']}
            justifyContent={'space-between'}
            mb={['16px', null, 0]}
          >
            <HStack spacing={'20px'} mb={'16px'}>
              {collection?.coverUrl ? (
                <Avatar
                  src={collection?.coverUrl}
                  name={collectionGeneralInfo?.name || collection?.name}
                  {...s.Avatar}
                />
              ) : (
                <Box bgGradient={`linear(to-br, ${color1}, ${color2})`} borderRadius={'full'} boxSize={'72px'} />
              )}
              <VStack spacing={'4px'} alignItems={'flex-start'}>
                <Heading {...s.CollectionName}>
                  {collectionGeneralInfo?.name || collection.name}
                </Heading>

                <HStack spacing={0} {...s.AddressButton}>
                  <Tooltip hasArrow placement={'top'} label={'Copied'} isOpen={showCopied}>
                    <Text {...s.AddressButtonText} onClick={() => handleCopy(collectionAddress)}>
                      {formatAddress(collectionAddress)}
                    </Text>
                  </Tooltip>
                  <Link
                    href={`${process.env.REACT_APP_ETHERSCAN_URL}/address/${collectionAddress}`}
                    isExternal
                    {...s.AddressButtonLink}
                  >
                    <Icon name={'externalLink'} />
                  </Link>
                </HStack>
              </VStack>
            </HStack>
            <HStack spacing={['12px', null, '30px']}>
              <CollectionSocialLinks
                instagram={collection?.instagramLink}
                site={collection?.siteLink}
                medium={collection?.mediumLink}
                discord={collection?.discordLink}
                telegram={collection?.telegramLink}
              />
              <HStack spacing={'12px'}>
                {isOwner && (
                  <Button
                    variant={'ghost'}
                    color={'white'}
                    rightIcon={<Icon name={'pen'} />}
                    onClick={handleEdit}
                  >Edit</Button>
                )}
              </HStack>
            </HStack>
          </Stack>
          <CollectionStatistics
            amountNFTs={NFTsTotal}
            amountOwners={collectionGeneralInfo?.owners}
            floorPrice={collectionOrderBookData?.floorPrice}
            volumeTraded={collectionOrderBookData?.volumeTraded}
          />
        </Box>
        <Tabs {...s.Tabs}>
          <TabList {...s.TabList}>
            <Tab>Items</Tab>
            <Tab>Description</Tab>
          </TabList>

          <TabPanels>
            <TabPanel {...s.NFTsTabPanel}>
              <FiltersStickyWrapper {...s.FiltersWrapper}>
                <Stack spacing={'12px'} direction={['column', null, 'row']}>
                  <InputGroup flex={1}>
                    <InputLeftElement pointerEvents="none">
                      <Image src={SearchIcon} />
                    </InputLeftElement>
                    <Input
                      height={'48px'}
                      pl={'50px'}
                      placeholder={'Search for an NFT'}
                      value={search}
                      onChange={({ target }) => setSearch(target.value)}
                    />
                  </InputGroup>
                  <Box>
                    <Select
                      items={SortByOptions}
                      label={!sortBy ? 'Sort by' : undefined}
                      value={sortBy}
                      buttonProps={{
                        height: '48px',
                        justifyContent: "space-between",
                        w: ['100%', null, '200px'],
                      }}
                      renderSelectedItem={(item: SortBy) => SortByNames[item]}
                      renderItem={(item: SortBy) => SortByNames[item]}
                      onSelect={(val) => setSortBy(val)}
                    />
                  </Box>
                  <ToggleFiltersButton
                    display={['none', null, 'flex']}
                    dirtyAmount={dirtyFiltersAmount}
                    onClick={() => setShowFilters(!showFilters)}
                  />
                  <ToggleButtonGroup
                    size={'lg'}
                    name={"nftSize"}
                    value={NFTGrid.size}
                    onChange={(val) => {
                      NFTGrid.setSize(val as NFTCardSize)
                    }}
                  >
                    <ToggleButton value={NFTCardSize.LG}>
                      <Icon name={'mdGrid'} />
                    </ToggleButton>
                    <ToggleButton value={NFTCardSize.SM}>
                      <Icon name={'smGrid'} />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Stack>
                <Filters show={showFilters} mt={'16px'}>
                  <Filter filter={saleTypeFilter}>
                    <SaleTypeFilter
                      value={saleTypeFilter.form.values}
                      onChange={(value) => saleTypeFilter.form.setValues(value)}
                    />
                  </Filter>
                  <Filter filter={nftTypeFilter}>
                    <NFTTypeFilter
                      value={nftTypeFilter.form.values}
                      onChange={(value) => nftTypeFilter.form.setValues(value)}
                    />
                  </Filter>
                  <Filter filter={priceRangeFilter}>
                    <PriceRangeFilter
                      value={priceRangeFilter.form.values}
                      onChange={(value) => priceRangeFilter.form.setValues(value)}
                    />
                  </Filter>
                  <Filter filter={propertiesFilter}>
                    <PropertiesFilter
                      collectionAddress={collectionAddress}
                      value={propertiesFilter.form.values}
                      onChange={(value) => propertiesFilter.form.setValues(value)}
                    />
                  </Filter>
                </Filters>
              </FiltersStickyWrapper>
              <Box ref={containerRef} px={['16px', null, '24px', '40px']}>
                <SimpleGrid
                  columns={NFTGrid.columns}
                  spacing={`${NFTGrid.spacing}px`}
                >
                  {/*First load*/}
                  {(isFetching && !isFetchingNextPage && !NFTs?.pages.length) && (
                    <>
                      <NFTCardSkeleton />
                      <NFTCardSkeleton />
                      <NFTCardSkeleton />
                      <NFTCardSkeleton />
                    </>
                  )}

                  {(NFTs?.pages ?? []).map((page) => {
                    return page.data.map(({ order, NFT }) => (
                      <NFTCard
                        key={`${NFT._collectionAddress}:${NFT.tokenId}`}
                        NFT={NFT}
                        order={order}
                      />
                    ));
                  })}
                </SimpleGrid>

                {/*FIXME: NoNFTsFound*/}
                {/*<NoNFTsFound />*/}

                {(hasNextPage && !isFetching) && (
                  <Button variant={'ghost'} isFullWidth={true} mt={10} onClick={() => fetchNextPage()}>
                    Load more
                  </Button>
                )}
              </Box>
            </TabPanel>
            <TabPanel {...s.DescriptionTabPanel}>
              {collection.description ? (
                <Box whiteSpace={"break-spaces"} maxW={[null, null, null, '800px']}>
                  {collection.description}
                </Box>
              ) : (
                <NoDescriptionFound />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
