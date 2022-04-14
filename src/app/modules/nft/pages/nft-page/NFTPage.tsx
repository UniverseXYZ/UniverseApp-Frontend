import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';

import { GetNFT2Api } from '@app/modules/nft/api';

import { useThemeContext } from '@legacy/ThemeContext';

import { NFTInfo } from './components';
import { NFTPageProvider } from './NFTPage.context';
import { dehydrate, QueryClient } from 'react-query';
import { nftKeys } from '@app/utils/query-keys';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { collectionAddress, tokenId } = context.params as { collectionAddress: string; tokenId: string;  };

  await queryClient.prefetchQuery(nftKeys.nftInfo({collectionAddress, tokenId}), async () => {
    const result = await GetNFT2Api(collectionAddress, tokenId, false);
    // Dehydration will fail if there's a Date or undefined value in the NFT model
    // This will strip any invalid values
    return JSON.parse(JSON.stringify(result));
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export const NFTPage = () => {
  const { setDarkMode } = useThemeContext() as any;

  useEffect(() => setDarkMode(false), []);

  return (
    <NFTPageProvider>
      <NFTInfo />
    </NFTPageProvider>
  );
};
