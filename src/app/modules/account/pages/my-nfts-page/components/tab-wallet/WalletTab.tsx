import { Button, SimpleGrid } from '@chakra-ui/react';
import { utils } from 'ethers';
import React from 'react';
import { useInfiniteQuery } from 'react-query';

import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { useErrorContext } from '../../../../../../../contexts/ErrorContext';
import NftCardSkeleton from '../../../../../../../components/skeletons/nftCardSkeleton/NftCardSkeleton';
import { CollectionPageLoader } from '../../../../../../../containers/collection/CollectionPageLoader';
import NoNftsFound from '../../../../../../../components/myNFTs/NoNftsFound';
import { ORDERS_PER_PAGE } from '../../../../../marketplace/pages/browse-nfts-page/constants';
import { NftItem, NFTItemContentWithPrice } from '../../../../../nft/components';
import { getUserNFTsApi } from '../../../../../../api';
import { OrderAssetClass } from '../../../../../nft/enums';

const PER_PAGE = 12;

export const WalletTab = () => {
  const { address } = useAuthContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext() as any;

  const { data: NFTsPages, fetchNextPage, hasNextPage, isFetching, isLoading, isIdle } = useInfiniteQuery(
    ['user', address, 'NFTs'],
    ({ pageParam = 1 }) => getUserNFTsApi(utils.getAddress(address), pageParam, PER_PAGE),
    {
      enabled: !!address,
      retry: false,
      getNextPageParam: (lastPage, pages) => {
        return pages.length * ORDERS_PER_PAGE < lastPage.total ? pages.length + 1 : undefined;
      },
      onError: ({ error, message }) => {
        setErrorTitle(error);
        setErrorBody(message);
        setShowError(true);
      },
    },
  );

  if (isIdle || isLoading) {
    return (
      <SimpleGrid columns={4} spacing={'30px'}>
        <NftCardSkeleton />
        <NftCardSkeleton />
        <NftCardSkeleton />
        <NftCardSkeleton />
      </SimpleGrid>
    );
  }

  return NFTsPages?.pages?.length ? (
    <>
      <SimpleGrid columns={4} spacing={'30px'}>
        {(NFTsPages?.pages ?? []).map((page) => {
          return page.data.map((NFT) => (
            <NftItem
              key={NFT.id}
              NFT={NFT}
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
      {isFetching && <CollectionPageLoader />}
      {!isFetching && hasNextPage && (
        <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextPage()}>Load more</Button>
      )}
    </>
  ) : !isIdle ? <NoNftsFound /> : null;
};
