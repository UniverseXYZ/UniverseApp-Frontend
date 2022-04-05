import React, { useEffect } from 'react';

import { CollectionInfo } from './components';
import CollectionPageProvider from './CollectionPage.context'
import FiltersContextProvider from '../../../account/pages/my-nfts-page/components/search-filters/search-filters.context';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { GetCollectionApi } from '../../api';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { collectionKeys } from '@app/utils/query-keys';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { collectionAddress } = context.params as { collectionAddress: string;  };
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery(collectionKeys.centralizedInfo(collectionAddress), async () => {
    const result = await await GetCollectionApi(collectionAddress);
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
  const { setDarkMode } = useThemeContext() as any;

  useEffect(() => setDarkMode(false), []);

  return (
    <CollectionPageProvider>
      <FiltersContextProvider defaultSorting={0}>
        <CollectionInfo />
      </FiltersContextProvider>
    </CollectionPageProvider>
  );
};