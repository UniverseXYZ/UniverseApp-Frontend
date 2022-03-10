import { Button, SimpleGrid, Box } from '@chakra-ui/react';

// Contexts
import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { useErrorContext } from '../../../../../../../contexts/ErrorContext';
import { useFiltersContext } from '../search-filters/search-filters.context';

// Components
import NftCardSkeleton from '../../../../../../../components/skeletons/nftCardSkeleton/NftCardSkeleton';
import NoNftsFound from '../../../../../../../components/myNFTs/NoNftsFound';
import { NftItem, NFTItemContentWithPrice } from '../../../../../nft/components';
import { SearchFilters } from '../search-filters';

// Helpers
import { OrderAssetClass } from '../../../../../nft/enums';

// Constants
import { useEffect } from 'react';

export const WalletTab = () => {
  const { address } = useAuthContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext() as any;
  const {
    setUserAddress,
    userNFTs,
    isFetchingUserNFTs,
    hasMoreNFTs,
    fetchNextUserNFTs,
  } = useFiltersContext();

  useEffect(() => {
    setUserAddress(address);
  }, [address])

  return (
    <>
      <Box>
        <SearchFilters />
      </Box>

      {userNFTs?.pages?.length && userNFTs?.pages[0]?.data.length ? (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={'30px'}>
            {(userNFTs?.pages ?? []).map((page: any) => {
              return page.data.map((NFT: any) => (
                <NftItem
                  key={NFT.id}
                  NFT={NFT}
                  showBuyNowButton={false}
                  collection={`${NFT._collectionAddress}`}
                  renderContent={({ NFT, collection, creator, owner, bestOfferPrice, bestOfferPriceToken, lastOfferPrice, lastOfferPriceToken }) => (
                    <NFTItemContentWithPrice
                      name={NFT.name}
                      collection={collection}
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
              ))
            })}
          </SimpleGrid>

          {!isFetchingUserNFTs && hasMoreNFTs && (
            <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextUserNFTs()}>Load more</Button>
          )}
        </>
      ) : (
        <>
          {!isFetchingUserNFTs ?
            <NoNftsFound /> : <></>
          }
        </>
      )}

      {isFetchingUserNFTs && (
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
