import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIntersection } from 'react-use';

import { NftItem, NFTItemContentWithPrice } from '@app/modules/nft/components';
import { useFiltersContext } from '@app/modules/account/pages/my-nfts-page/components/search-filters/search-filters.context';

import { SearchFilters } from '../../../my-nfts-page/components/search-filters';
import NoNftsFound from '../../../../../../../components/myNFTs/NoNftsFound';
import NftCardSkeleton from '../../../../../../../components/skeletons/nftCardSkeleton/NftCardSkeleton';
import * as styles from './ArtistNFTsTab.styles';
import { useRouter } from 'next/router';

interface IArtistNFTsTabProps {
  artistAddress: string;
  onTotalLoad: (total: number) => void;
}

export const ArtistNFTsTab = ({ artistAddress, onTotalLoad }: IArtistNFTsTabProps) => {
  const {
    setUserAddress,
    userNFTs,
    isFetchingUserNFTs,
    hasMoreUserNFTs,
    fetchNextUserNFTs,
    setShowCollectcionFilters,
    isLoadingUserNFTs,
    setShowSaleTypeFilters,
    setShowPriceRangeFilters,
    setShowNFTTypeFilters,
    hasSelectedOrderBookFilters,
    orders,
    fetchNextOrders,
		isFethingOrders,
		isLoadingOrders,
    hasMoreOrders,
    userCollections,
  } = useFiltersContext();

  const router = useRouter();
  const [currentScrollTop, setCurrentScrollTop] = useState(0);

  useEffect(() => {
    setUserAddress(artistAddress);
    setShowCollectcionFilters(true);
    setShowSaleTypeFilters(true);
    setShowPriceRangeFilters(true);
    setShowNFTTypeFilters(true);
  }, [artistAddress]);

  useEffect(() => {
    const nftPages = userNFTs?.pages;
    if(nftPages?.length) {
      onTotalLoad(nftPages[0].total);
    }
  }, [userNFTs])

  useEffect(() => {
    window.scrollTo(0, currentScrollTop)
  }, [currentScrollTop])

  const hasOrderBookFilters = hasSelectedOrderBookFilters();
	const hasOrders = orders?.pages?.length && orders.pages[0].data?.length;
	const waitingOrders = isFethingOrders || isLoadingOrders;
  const hasUserNFTs = userNFTs?.pages?.length && userNFTs?.pages[0]?.data?.length;
  const waitingUserNFTs = isFetchingUserNFTs || isLoadingUserNFTs;

  const handleFilterChange = useCallback((filters) => {
    const queryParams = {...router.query};

    // if collections loaded
    if (!userCollections.length) {
      return;
    }

    if (filters?.collectionFilter?.collections?.length) {
      queryParams.collection = filters?.collectionFilter?.collections[0].address;
    } else {
      delete queryParams.collection;
    }

    router.push({
      pathname: router.pathname,
      query: queryParams,
    }, undefined, { shallow: true });
  }, [userCollections]);

  const filtersRef = useRef(null);

  const intersection = useIntersection(filtersRef, {
    threshold: 1,
    rootMargin: '0px',
    root: null,
  });

  return (
    <Box>
      <Box
        ref={filtersRef}
        {...styles.FiltersWrapperStyle}
        bg={(intersection?.intersectionRect.top ?? 1) === 0 ? 'white' : 'transparent'}
      >
        <SearchFilters onFilterChanges={handleFilterChange} />
      </Box>

      {hasOrderBookFilters ? (
          hasOrders || waitingOrders ? (
            <div className="mynfts__page">
              <div className="container mynfts__page__body">
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'}>
                  {
                    !waitingOrders && (
                      orders?.pages ?? []).map((page) => {
                        return page.data.map(({ order, NFTs }) => {
                          if (!NFTs.length) {
                            return null;
                          }
                          return (
                            <NftItem
                              order={order}
                              key={order.id}
                              NFT={NFTs[0]}
                              collection={`${NFTs[0]._collectionAddress}`}
                              orderEnd={order.end}
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
                                  collectionAddress={NFT._collectionAddress}
                                  name={NFT.name}
                                  collection={collection}
                                  creator={creator?.mappedArtist || undefined}
                                  owner={owner?.mappedArtist || undefined}
                                  order={orderData || undefined}
                                  bestOfferPrice={bestOfferPrice || 0}
                                  bestOfferPriceToken={bestOfferPriceToken || undefined}
                                  lastOfferPrice={lastOfferPrice || 0}
                                  lastOfferPriceToken={lastOfferPriceToken || undefined}
                                />
                              )}
                            />
                          );
                        });
                      }
                    )
                  }
                </SimpleGrid>

                {!waitingOrders && hasMoreOrders && (
                  <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextOrders()}>
                    Load more
                  </Button>
                )}

                {waitingOrders && (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'} mt={10}>
                    <NftCardSkeleton />
                    <NftCardSkeleton />
                    <NftCardSkeleton />
                    <NftCardSkeleton />
                  </SimpleGrid>
                )}
              </div>
            </div>
          ) : (
            !waitingOrders && <NoNftsFound />
          )
        ) : // User NFTs
        hasUserNFTs || waitingUserNFTs ? (
          <div className="mynfts__page">
            <div className="container mynfts__page__body">
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'}>
                {
                  !waitingUserNFTs && (
                    userNFTs?.pages ?? []).map((page: any) => {
                      return page.data.map((NFT: any) => (
                        <NftItem
                          key={NFT.id}
                          NFT={NFT}
                          showBuyNowButton={false}
                          collection={`${NFT._collectionAddress}`}
                          renderContent={({
                            NFT,
                            collection,
                            creator,
                            owner,
                            bestOfferPrice,
                            bestOfferPriceToken,
                            lastOfferPrice,
                            lastOfferPriceToken,
                            order,
                          }) => (
                            <NFTItemContentWithPrice
                              collectionAddress={NFT._collectionAddress}
                              name={NFT.name}
                              collection={collection}
                              creator={creator?.mappedArtist || undefined}
                              owner={owner?.mappedArtist || undefined}
                              order={order || undefined}
                              bestOfferPrice={bestOfferPrice || 0}
                              bestOfferPriceToken={bestOfferPriceToken || undefined}
                              lastOfferPrice={lastOfferPrice || 0}
                              lastOfferPriceToken={lastOfferPriceToken || undefined}
                            />
                          )}
                        />
                      ));
                    }
                  )
                }
              </SimpleGrid>

              {!waitingUserNFTs && hasMoreUserNFTs && (
                <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => {
                  setCurrentScrollTop(document.documentElement.scrollTop);
                  fetchNextUserNFTs();
                }}>
                  Load more
                </Button>
              )}

              {waitingUserNFTs && (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'} mt={10}>
                  <NftCardSkeleton />
                  <NftCardSkeleton />
                  <NftCardSkeleton />
                  <NftCardSkeleton />
                </SimpleGrid>
              )}
            </div>
          </div>
        ) : (
          !waitingUserNFTs && <NoNftsFound />
        )}
    </Box>
  );
};
