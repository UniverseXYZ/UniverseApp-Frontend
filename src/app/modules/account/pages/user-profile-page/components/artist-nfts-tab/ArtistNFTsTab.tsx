import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';

import { NftItem, NFTItemContentWithPrice } from '../../../../../nft/components';
import { OrderAssetClass } from '../../../../../nft/enums';
import { Loading } from '../../../../../../components';
import { SearchFilters } from '../../../my-nfts-page/components/search-filters';
import { useFiltersContext } from '../../../../../account/pages/my-nfts-page/components/search-filters/search-filters.context';

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
  } = useFiltersContext();

  useEffect(() => {
    setUserAddress(artistAddress);
    setShowCollectcionFilters(true);
  }, [artistAddress]);

  return (
    <Box>
      <SearchFilters />
      <SimpleGrid columns={4} spacing={'30px'}>
        {(userNFTs?.pages ?? []).map((page) => {
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
      {isFetchingUserNFTs && <Loading mt={'10'} />}
      {!isFetchingUserNFTs && hasMoreUserNFTs && (
        <Button variant={'outline'} isFullWidth={true} mt={10} onClick={() => fetchNextUserNFTs()}>Load more</Button>
      )}
    </Box>
  );
};
