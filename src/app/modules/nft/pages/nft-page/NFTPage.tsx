import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { GetCollectionApi, queryNFTsApi } from '@app/api';
import { collectionKeys, nftKeys } from '@app/utils/query-keys';

import { NFTInfo } from './components';
import { NFTPageProvider } from './NFTPage.context';
import { useThemeStore } from 'src/stores/themeStore';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { collectionAddress, tokenId } = context.params as { collectionAddress: string; tokenId: string;  };

  await queryClient.prefetchQuery(nftKeys.nftInfo({collectionAddress, tokenId}), async () => {
    const { data } = await queryNFTsApi({
      page: 1,
      limit: 1,
      collection: collectionAddress,
      tokenIds: [tokenId],
    });

    if (data.length) {
      // Dehydration will fail if there's a Date or undefined value in the NFT model
      // This will strip any invalid values
      return JSON.parse(JSON.stringify(data[0]));
    }
  });

  await queryClient.prefetchQuery(collectionKeys.centralizedInfo(collectionAddress), async () => {
    const result = await GetCollectionApi(collectionAddress);
    return JSON.parse(JSON.stringify(result));
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export const NFTPage = () => {
  const setDarkMode = useThemeStore(s => s.setDarkMode);

  useEffect(() => setDarkMode(false), []);

  return (
    <NFTPageProvider>
      <NFTInfo />
    </NFTPageProvider>
  );
};
