import OpenGraphImage from "@assets/images/open-graph/marketplace.png";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useIntersection, useSearchParam } from "react-use";
import { useSignInPopupStore } from "src/stores/signInPopup";
import { useThemeStore } from "src/stores/themeStore";
import ArrowDownIcon from "../../../../../assets/images/arrow-down.svg";
import NFTTypeIcon from "../../../../../assets/images/v2/marketplace/filter-nft-type.svg";
import PriceRangeIcon from "../../../../../assets/images/v2/marketplace/filter-price-range.svg";
import SaleTypeIcon from "../../../../../assets/images/v2/marketplace/filter-sale-type.svg";
import Badge from "../../../../../components/badge/Badge";
import {
  BackToTopButton,
  FiltersPopup,
  Loading,
  OpenGraph,
  Select,
} from "../../../../components";
import {
  ClearAllButton,
  NFTTypeFilter,
  NFTTypeFilterDropdown,
  PriceRangeFilter,
  PriceRangeFilterDropdown,
  SaleTypeFilter,
  SaleTypeFilterDropdown,
  useNFTTypeFilter,
  usePriceRangeFilter,
  useSaleTypeFilter,
} from "../../../../components/filters";
import { getTokenAddressByTicker } from "../../../../constants";
import { TokenTicker } from "../../../../enums";
import { useStaticHeader } from "../../../../hooks";
import { nftKeys, orderKeys } from "../../../../utils/query-keys";
import { GetActiveSellOrdersApi, GetNFT2Api } from "../../../nft/api";
import {
  BundleItem,
  NftItem,
  NFTItemContentWithPrice,
} from "../../../nft/components";
import {
  IERC721AssetType,
  IERC721BundleAssetType,
  INFT,
  IOrder,
} from "../../../nft/types";
import { SearchBar } from "../../components";
import { SortOrderOptions, SortOrderOptionsEnum } from "../../constants";
import * as styles from "./BrowseNFTsPage.styles";
import { ListingBanner } from "./components";
import { ORDERS_PER_PAGE } from "./constants";

export type ICollectionsFilterValue = Array<any>;

export const BrowseNFTsPage = () => {
  const setDarkMode = useThemeStore((s) => s.setDarkMode);
  const queryClient = useQueryClient();

  const router = useRouter();

  const collectionSearchParam = useSearchParam("collection");

  const [sortBy, setSortBy] = useState(SortOrderOptionsEnum.RecentlyListed);
  const setShowNotAuthenticatedPopup = useSignInPopupStore(
    (s) => s.setShowNotAuthenticatedPopup
  );

  const [selectedAddress, setSelectedAddress] = useState(
    collectionSearchParam?.toString() || undefined
  );

  const { form: saleTypeFilterForm } = useSaleTypeFilter();
  const { form: nftTypeFilterForm } = useNFTTypeFilter();
  const { form: priceRangeFilterForm } = usePriceRangeFilter();

  const {
    data: ordersResult,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery(
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
        apiFilters["hasOffers"] = true;
      }

      if (saleTypeFilterForm.values.buyNow) {
        apiFilters["side"] = 1;
      }

      if (saleTypeFilterForm.values.new) {
        apiFilters["beforeTimestamp"] = Math.floor(new Date().getTime() / 1000);
      }

      // NFT Filters
      const assetClassFilters = [];
      if (nftTypeFilterForm.values.singleItem) {
        assetClassFilters.push("ERC721");
      }

      if (nftTypeFilterForm.values.bundle) {
        assetClassFilters.push("ERC721_BUNDLE");
      }

      if (assetClassFilters.length) {
        apiFilters["assetClass"] = assetClassFilters.join(",");
      }

      // Price Filters
      if (
        priceRangeFilterForm.values.currency.token &&
        priceRangeFilterForm.dirty
      ) {
        const ticker = priceRangeFilterForm.values.currency
          .token as TokenTicker;
        apiFilters["token"] = getTokenAddressByTicker(ticker);
      }

      const [minPrice, maxPrice] = priceRangeFilterForm.values.price;

      if (minPrice) {
        apiFilters["minPrice"] = minPrice;
      }

      if (maxPrice && priceRangeFilterForm.dirty) {
        apiFilters["maxPrice"] = maxPrice;
      }

      // Collection Filters
      if (selectedAddress) {
        apiFilters["collection"] = selectedAddress;
      }

      // Sorting
      if (sortBy) {
        let sortFilter = 0;
        switch (sortBy) {
          case SortOrderOptionsEnum.EndingSoon:
            sortFilter = 1;
            break;
          case SortOrderOptionsEnum.HighestPrice:
            sortFilter = 2;
            break;
          case SortOrderOptionsEnum.LowestPrice:
            sortFilter = 3;
            break;
          case SortOrderOptionsEnum.RecentlyListed:
            sortFilter = 4;
            break;
          default:
            break;
        }
        apiFilters["sortBy"] = sortFilter;
      }

      const { orders, total } = await GetActiveSellOrdersApi(apiFilters);

      const NFTsRequests: Array<any> = [];

      for (const order of orders) {
        switch (order.make.assetType.assetClass) {
          case "ERC721":
            const assetType = order.make.assetType as IERC721AssetType;
            queryClient.setQueryData(
              orderKeys.listing({
                collectionAddress: assetType.contract,
                tokenId: assetType.tokenId.toString(),
              }),
              order
            );
            NFTsRequests.push(
              GetNFT2Api(assetType.contract, assetType.tokenId, false)
            );
            break;
          case "ERC721_BUNDLE":
            const assetTypeBundle = order.make
              .assetType as IERC721BundleAssetType;
            for (let i = 0; i < assetTypeBundle.contracts.length; i++) {
              for (const tokenId of assetTypeBundle.tokenIds[i]) {
                queryClient.setQueryData(
                  orderKeys.listing({
                    collectionAddress: assetTypeBundle.contracts[i],
                    tokenId: tokenId.toString(),
                  }),
                  order
                );
                NFTsRequests.push(
                  GetNFT2Api(assetTypeBundle.contracts[i], tokenId, false)
                );
              }
            }
            break;
        }
      }

      const NFTsMap = (await Promise.allSettled(NFTsRequests)).reduce<
        Record<string, INFT>
      >((acc, response) => {
        if (response.status !== "fulfilled") {
          return acc;
        }

        const NFT: INFT = response.value;
        //TODO: set query cache to this specific nft(nftKeys.info)
        const key = `${NFT._collectionAddress?.toLowerCase()}:${NFT.tokenId}`;

        queryClient.setQueryData(
          nftKeys.nftInfo({
            collectionAddress: NFT._collectionAddress || "",
            tokenId: NFT.tokenId,
          }),
          NFT
        );

        acc[key] = NFT;

        return acc;
      }, {});

      const result = orders.reduce<Array<{ order: IOrder; NFTs: INFT[] }>>(
        (acc, order) => {
          const NFTsMapKeys = Object.keys(NFTsMap);

          switch (order.make.assetType.assetClass) {
            case "ERC721":
              const assetType = order.make.assetType as IERC721AssetType;
              if (
                NFTsMapKeys.includes(
                  `${assetType.contract}:${assetType.tokenId}`
                )
              ) {
                acc.push({
                  order,
                  NFTs: NFTsMap[`${assetType.contract}:${assetType.tokenId}`]
                    ? [NFTsMap[`${assetType.contract}:${assetType.tokenId}`]]
                    : [],
                });
              }
              break;
            case "ERC721_BUNDLE":
              const assetTypeBundle = order.make
                .assetType as IERC721BundleAssetType;
              const NFTs = [];

              for (let i = 0; i < assetTypeBundle.contracts.length; i++) {
                for (const tokenId of assetTypeBundle.tokenIds[i]) {
                  if (NFTsMap[`${assetTypeBundle.contracts[i]}:${tokenId}`]) {
                    NFTs.push(
                      NFTsMap[`${assetTypeBundle.contracts[i]}:${tokenId}`]
                    );
                  }
                }
              }

              acc.push({ order, NFTs });

              break;
          }

          return acc;
        },
        []
      );

      return { total, data: result };
    },
    {
      retry: false,
      getNextPageParam: (lastPage, pages) => {
        return pages.length * ORDERS_PER_PAGE < lastPage.total
          ? pages.length + 1
          : undefined;
      },
    }
  );

  const filtersRef = useRef(null);

  const intersection = useIntersection(filtersRef, {
    threshold: 1,
    root: null,
    rootMargin: "0px",
  });

  useStaticHeader();

  const handleClear = useCallback(() => {
    saleTypeFilterForm.resetForm();
    nftTypeFilterForm.resetForm();
    priceRangeFilterForm.resetForm();
    setSelectedAddress(undefined);
  }, []);

  useEffect(() => {
    const queryParams = { ...router.query };

    if (selectedAddress) {
      queryParams.collection = selectedAddress;
    } else {
      delete queryParams.collection;
    }

    router.push(
      {
        pathname: router.pathname,
        query: queryParams,
      },
      undefined,
      { shallow: true }
    );
  }, [selectedAddress]);

  useEffect(() => setDarkMode(false), []);

  const isFiltersDirty =
    saleTypeFilterForm.dirty ||
    nftTypeFilterForm.dirty ||
    priceRangeFilterForm.dirty;

  return (
    <Box layerStyle={"StoneBG"}>
      <OpenGraph
        title={"Browse NFTs on Universe Marketplace"}
        description={
          "Universe NFT marketplace is completely decentralized and rigged with multiple open source tools and features."
        }
        image={OpenGraphImage}
      />
      <Flex {...styles.IntroSectionStyle}>
        <Box>
          <Text
            fontSize={"12px"}
            fontWeight={500}
            textTransform={"uppercase"}
            mb={"23px"}
            letterSpacing={"5px"}
          >
            Welcome to the
          </Text>
          <Heading as={"h1"} fontSize={"36px"}>
            Marketplace{" "}
            <Badge
              style={{
                fontSize: "12px",
                padding: "4px 9px",
                top: "-20px",
                marginLeft: "-2px",
              }}
              text="beta"
            />
          </Heading>
        </Box>
      </Flex>

      <Flex {...styles.SearchBarWrapperStyle}>
        <Box
          mb={"60px"}
          w={{ sm: "100%", md: "600px" }}
          mx={{ sm: "20px", md: "auto" }}
        >
          <SearchBar
            value={selectedAddress}
            onChange={(address) => setSelectedAddress(address)}
            onClear={() => handleClear()}
          />
        </Box>
      </Flex>

      <Box
        ref={filtersRef}
        {...styles.FiltersStickyWrapper}
        bg={intersection?.intersectionRect.top === 0 ? "white" : "transparent"}
      >
        <Container {...styles.FiltersContainer}>
          <FiltersPopup
            mobileFilters={[
              {
                name: "Sale type",
                form: saleTypeFilterForm,
                icon: SaleTypeIcon,
                renderFilter: (props) => <SaleTypeFilter {...props} />,
              },
              {
                name: "NFT Type",
                form: nftTypeFilterForm,
                icon: NFTTypeIcon,
                renderFilter: (props) => <NFTTypeFilter {...props} />,
              },
              {
                name: "Price range",
                form: priceRangeFilterForm,
                icon: PriceRangeIcon,
                renderFilter: (props) => <PriceRangeFilter {...props} />,
              },
            ]}
          >
            {({ openMobileFilters }) => (
              <Box {...styles.FiltersWrapper}>
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
                  variant={"dropdown"}
                  rightIcon={
                    <Image
                      src={ArrowDownIcon}
                      sx={{
                        width: "10px",
                        transition: "200ms",
                        transform: "rotate(0deg)",
                      }}
                    />
                  }
                  {...styles.MoreFiltersButton}
                  onClick={openMobileFilters}
                >
                  More
                </Button>
                {isFiltersDirty && <ClearAllButton onClick={handleClear} />}
              </Box>
            )}
          </FiltersPopup>
          <Select
            label={"Sort by"}
            items={SortOrderOptions}
            value={sortBy}
            buttonProps={{
              justifyContent: "space-between",
              w: { base: "100%", md: "fit-content" },
            }}
            onSelect={(val) => setSortBy(val)}
          />
        </Container>
      </Box>

      <Box px={"20px"} pt={{ base: "20px", md: 0 }}>
        <Container maxW={"1360px"} pt={"0 !important"} position={"relative"}>
          {!isFetching && !ordersResult?.pages[0].data.length ? (
            <Container centerContent>
              <div>No results found</div>
            </Container>
          ) : (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacingX={"20px"}
              spacingY={"30px"}
              mb={"40px"}
            >
              {(ordersResult?.pages ?? []).map((page) => {
                return page.data.map(({ order, NFTs }) => {
                  if (!NFTs.length) {
                    return null;
                  }
                  return order.make.assetType.assetClass === "ERC721" ? (
                    <NftItem
                      order={order}
                      key={order.id}
                      NFT={NFTs[0]}
                      collection={`${NFTs[0]._collectionAddress}`}
                      orderEnd={order.end}
                      onAuctionTimerEnd={refetch}
                      renderContent={({
                        NFT,
                        collection,
                        creator,
                        owner,
                        bestOfferPrice,
                        bestOfferPriceToken,
                        lastOfferPrice,
                        lastOfferPriceToken,
                        order: orderData,
                      }) => (
                        <NFTItemContentWithPrice
                          name={NFT.name}
                          collection={collection}
                          creator={creator?.mappedArtist || undefined}
                          owner={owner?.mappedArtist || undefined}
                          ownerAddress={NFT._ownerAddress}
                          order={orderData || undefined}
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
                          name={
                            (order.make.assetType as IERC721BundleAssetType)
                              .bundleName
                          }
                          creator={NFTs[0].creator}
                          order={order}
                          // price={+utils.formatUnits(order.take.value, `${TOKENS_MAP[order.take.assetType.assetClass as TokenTicker].decimals}`)}
                          // priceToken={order.take.assetType.assetClass as TokenTicker}
                        />
                      )}
                    />
                  );
                });
              })}
            </SimpleGrid>
          )}
          {isFetching && (
            <Container centerContent py={"20px !important"}>
              <Loading />
            </Container>
          )}
          {hasNextPage && !isFetching && (
            <Button
              variant={"outline"}
              isFullWidth
              mb={"20px"}
              onClick={() => fetchNextPage()}
            >
              {isFetching ? "Loading..." : "Load More"}
            </Button>
          )}

          <ListingBanner
            onLogin={() => {
              setShowNotAuthenticatedPopup(true);
            }}
          />
          <BackToTopButton />
        </Container>
      </Box>
    </Box>
  );
};
