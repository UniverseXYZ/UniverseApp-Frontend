import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { utils } from 'ethers';
import React from 'react';
import { useInfiniteQuery } from 'react-query';

import { getUserNFTsApi } from '../../../../../../api';
import { NftItem, NFTItemContentWithPrice } from '../../../../../nft/components';
import { OrderAssetClass } from '../../../../../nft/enums';
import { Loading } from '../../../../../../components';

const PER_PAGE = 8;

interface IArtistNFTsTabProps {
  artistAddress: string;
  onTotalLoad: (total: number) => void;
}

export const ArtistNFTsTab = ({ artistAddress, onTotalLoad }: IArtistNFTsTabProps) => {

  const { data: NFTsPages, fetchNextPage, hasNextPage, isFetching, isLoading, isIdle } = useInfiniteQuery(
    ['user', artistAddress, 'NFTs'],
    ({ pageParam = 1 }) => getUserNFTsApi({
      address: utils.getAddress(artistAddress),
      page: pageParam,
      size: PER_PAGE,
    }),
    {
      enabled: !!artistAddress,
      retry: false,
      getNextPageParam: (lastPage, pages) => {
        return pages.length * PER_PAGE < lastPage.total ? pages.length + 1 : undefined;
      },
      onSuccess: (result) => {
        onTotalLoad(result.pages[0].total);
      },
    },
  );

  return (
    <Box>
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
      {isFetching && <Loading mt={'10'} />}
      {!isFetching && hasNextPage && (
        <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextPage()}>Load more</Button>
      )}
    </Box>
  );
};
