import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';

import { GetNFT2Api } from '@app/modules/nft/api';

import { useThemeContext } from '@legacy/ThemeContext';

import { NFTInfo } from './components';
import { NFTPageProvider } from './NFTPage.context';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { collectionAddress, tokenId } = context.params as { collectionAddress: string; tokenId: string;  };

  const NFT = await GetNFT2Api(collectionAddress, tokenId, false);

  return {
    props: {
      NFT: JSON.parse(JSON.stringify(NFT)), // TRICK
    }
  };
}

export const NFTPage = ({ NFT }: any) => {
  const { setDarkMode } = useThemeContext() as any;

  useEffect(() => setDarkMode(false), []);

  return (
    <NFTPageProvider NFT={NFT}>
      <NFTInfo />
    </NFTPageProvider>
  );
};
