import React, { useEffect } from 'react';

import { CollectionInfo } from './components';
import CollectionPageProvider from './CollectionPage.context'
import FiltersContextProvider from '../../../account/pages/my-nfts-page/components/search-filters/search-filters.context';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { GetCollectionApi } from '../../api';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { collectionAddress } = context.params as { collectionAddress: string;  };

  const collection = await GetCollectionApi(collectionAddress);

  return {
    props: {
      collection: JSON.parse(JSON.stringify(collection)), // TRICK
    }
  };
}

export const CollectionPage = ({ collection }: any) => {
  const { setDarkMode } = useThemeContext() as any;

  useEffect(() => setDarkMode(false), []);

  return (
    <CollectionPageProvider collection={collection}>
      <FiltersContextProvider defaultSorting={0}>
        <CollectionInfo />
      </FiltersContextProvider>
    </CollectionPageProvider>
  );
};