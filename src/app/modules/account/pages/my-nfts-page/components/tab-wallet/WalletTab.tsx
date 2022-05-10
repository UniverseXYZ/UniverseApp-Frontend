import { Button, SimpleGrid, Box } from '@chakra-ui/react';

// Contexts
import { useFiltersContext } from '../search-filters/search-filters.context';

// Components
import NftCardSkeleton from '../../../../../../../components/skeletons/nftCardSkeleton/NftCardSkeleton';
import NoNftsFound from '../../../../../../../components/myNFTs/NoNftsFound';
import { NFTCard } from '../../../../../nft/components';
import { SearchFilters } from '../search-filters';

// Constants
import { useEffect, useRef } from 'react';
import { useIntersection, useMedia } from 'react-use';
import { useAuthStore } from '../../../../../../../stores/authStore';
import { breakpoints } from '../../../../../../theme/constants';

interface IWalletTabProps {
  getTotalNfts: (total: number) => void;
}

export const WalletTab = ({ getTotalNfts }: IWalletTabProps) => {
  const address = useAuthStore(state => state.address);
  const isMobile = useMedia(`(max-width: ${breakpoints.md})`);

  const {
    setUserAddress,
    userNFTs,
    isFetchingUserNFTs,
    isLoadingUserNFTs,
    hasMoreUserNFTs,
    fetchNextUserNFTs,
    setShowCollectcionFilters,
    setDisabledSortByFilters,
    setShowSaleTypeFilters,
    setShowPriceRangeFilters,
    setShowNFTTypeFilters,
    hasSelectedOrderBookFilters,
    orders,
    fetchNextOrders,
    isFethingOrders,
    isLoadingOrders,
    hasMoreOrders,
  } = useFiltersContext();

  useEffect(() => {
    if (userNFTs?.pages.length) {
      getTotalNfts(userNFTs?.pages[0].total);
    }
  }, [userNFTs]);

  useEffect(() => {
    setUserAddress(address);
    setShowCollectcionFilters(true);
    setShowSaleTypeFilters(true);
    setShowPriceRangeFilters(true);
    setShowNFTTypeFilters(true);
  }, [address]);

  const hasOrderBookFilters = hasSelectedOrderBookFilters();
  const hasOrders = orders?.pages?.length && orders.pages[0].data?.length;
  const waitingOrders = isFethingOrders || isLoadingOrders;
  const hasUserNFTs = userNFTs?.pages?.length && userNFTs?.pages[0]?.data?.length;
  const waitingUserNFTs = isFetchingUserNFTs || isLoadingUserNFTs;

  const filtersRef = useRef(null);

  const intersection = useIntersection(filtersRef, {
    threshold: 1,
    rootMargin: '0px',
    root: null,
  });

  return (
    <>
      <Box
        ref={filtersRef}
        sx={{
          bg: (intersection?.intersectionRect.top ?? 1) === 0 ? 'white' : 'transparent',
          p: isMobile && '0px 20px',
          pos: 'sticky',
          top: '-1px',
          mb: '40px',
          zIndex: 20,
          '.search--sort--filters--section': {
            mb: 0,
          },
        }}
      >
        <SearchFilters />
      </Box>

      <div className="container mynfts__page__body" style={{padding: isMobile ? '0px 20px' : '0px'}}>
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
                          return (<NFTCard key={order.id} NFT={NFTs[0]} order={order} />);
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
                        <NFTCard key={NFT.id} NFT={NFT} showBuyNowButton={false} />
                      ));
                    }
                  )
                }
              </SimpleGrid>

              {!waitingUserNFTs && hasMoreUserNFTs && (
                <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextUserNFTs()}>
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
      </div>
    </>
  );
};
