import React, { useEffect } from 'react';

import { CollectionInfo } from './components';

import CollectionPageProvider from './CollectionPage.context'
import FiltersContextProvider from '../../../account/pages/my-nfts-page/components/search-filters/search-filters.context';
import { useThemeContext } from '../../../../../contexts/ThemeContext';


export const CollectionPage = () => {
  const { setDarkMode } = useThemeContext() as any;

  useEffect(() => setDarkMode(false), []);

  return (
    <CollectionPageProvider>
      <FiltersContextProvider>
        <CollectionInfo />
      </FiltersContextProvider>
    </CollectionPageProvider>
  );
};
