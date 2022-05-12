import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { collectionKeys, nftKeys } from '@app/utils/query-keys';

import { NFTInfo } from './components';
import { NFTPageProvider } from './NFTPage.context';
import { useThemeStore } from 'src/stores/themeStore';
import { GetNFTApi, GetCollectionApi } from '../../../../api';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { collectionAddress, tokenId } = context.params as { collectionAddress: string; tokenId: string;  };

  await queryClient.prefetchQuery(nftKeys.nftInfo({collectionAddress, tokenId}), async () => {
    const result = await GetNFTApi(collectionAddress, tokenId, false);
    // Dehydration will fail if there's a Date or undefined value in the NFT model
    // This will strip any invalid values
    return JSON.parse(JSON.stringify(result));
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
