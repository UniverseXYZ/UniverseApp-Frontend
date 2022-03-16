import { Button, SimpleGrid, Box } from '@chakra-ui/react';

// Contexts
import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { useFiltersContext } from '../search-filters/search-filters.context';

// Components
import NftCardSkeleton from '../../../../../../../components/skeletons/nftCardSkeleton/NftCardSkeleton';
import NoNftsFound from '../../../../../../../components/myNFTs/NoNftsFound';
import { NftItem, NFTItemContentWithPrice } from '../../../../../nft/components';
import { SearchFilters } from '../search-filters';

// Constants
import { useEffect } from 'react';

export const WalletTab = () => {
  const { address } = useAuthContext();

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

  return (
    <>
      <Box>
        <SearchFilters />
      </Box>

      {hasOrderBookFilters ? (

        hasOrders ? (
          <div className="mynfts__page">
            <div className="container mynfts__page__body">
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'}>
                {(orders?.pages ?? []).map((page) => {
                  return page.data.map(({ order, NFTs }) => {
                    if (!NFTs.length) {
                      return null;
                    }
                    return (
                      <NftItem
                        order={order}
                        key={order.id}
                        NFT={NFTs[0]}
                        collection={`${NFTs[0].collection?.address}`}
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
                  })
                })}
              </SimpleGrid>

              {!waitingOrders && hasMoreOrders && (
                <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextOrders()}>Load more</Button>
              )}

            </div>
          </div>
        ) : (
          !waitingOrders && <NoNftsFound />
        )

      ) : (
        // User NFTs
        hasUserNFTs ? (
          <div className="mynfts__page">
            <div className="container mynfts__page__body">
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'}>
                {(userNFTs?.pages ?? []).map((page: any) => {
                  return page.data.map((NFT: any) => (
                    <NftItem
                      key={NFT.id}
                      NFT={NFT}
                      showBuyNowButton={false}
                      collection={`${NFT._collectionAddress}`}
                      renderContent={({ NFT, collection, creator, owner, bestOfferPrice, bestOfferPriceToken, lastOfferPrice, lastOfferPriceToken, order }) => (
                        <NFTItemContentWithPrice
                          name={NFT.name}
                          collection={collection}
                          creator={creator || undefined}
                          owner={owner || undefined}
                          order={order || undefined}
                          bestOfferPrice={bestOfferPrice || 0}
                          bestOfferPriceToken={bestOfferPriceToken || undefined}
                          lastOfferPrice={lastOfferPrice || 0}
                          lastOfferPriceToken={lastOfferPriceToken || undefined}

                        />
                      )}
                    />
                  ))
                })}
              </SimpleGrid>

              {!waitingUserNFTs && hasMoreUserNFTs && (
                <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextUserNFTs()}>Load more</Button>
              )}

            </div>
        </div>
        ) : (
          !waitingUserNFTs && <NoNftsFound />
        )

      )}

      {( waitingOrders || waitingUserNFTs ) && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'} mt={10}>
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
        </SimpleGrid>
      )}
    </>
  );
};
