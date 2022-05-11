import React, { useEffect } from 'react';

import CollectionPageProvider from './CollectionPage.context'
import FiltersContextProvider from '../../../account/pages/my-nfts-page/components/search-filters/search-filters.context';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { collectionKeys } from '@app/utils/query-keys';
import { useThemeStore } from 'src/stores/themeStore';
import { GetCollectionApi } from '../../../../api/nfts/new-get-nft.api';
import { CollectionInfo } from './components';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { collectionAddress } = context.params as { collectionAddress: string;  };
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery(collectionKeys.centralizedInfo(collectionAddress), async () => {
    const result = await GetCollectionApi(collectionAddress);
    // Dehydration will fail if there's a Date or undefined value in the data
    // This will strip any invalid values
    return JSON.parse(JSON.stringify(result))
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export const CollectionPage = () => {
  const setDarkMode = useThemeStore(s => s.setDarkMode);

  useEffect(() => setDarkMode(false), []);

  return (
    <CollectionPageProvider>
      <FiltersContextProvider defaultSorting={0}>
        <CollectionInfo />
      </FiltersContextProvider>
    </CollectionPageProvider>
  );
};