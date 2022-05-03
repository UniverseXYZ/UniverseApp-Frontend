import React, { useEffect } from 'react';
import { NextPageContext } from 'next';

import { CollectionInfo } from './components';
import CollectionPageProvider from './CollectionPage.context'
import FiltersContextProvider from '../../../account/pages/my-nfts-page/components/search-filters/search-filters.context';
import { useThemeContext } from '../../../../../contexts/ThemeContext';

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

CollectionPage.getInitialProps = (ctx: NextPageContext) => ({});
