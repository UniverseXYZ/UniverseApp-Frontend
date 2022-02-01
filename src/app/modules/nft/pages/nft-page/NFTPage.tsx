import React, { useEffect, useState } from 'react';

import { NFTLikesPopup } from '../../components';
import { NFTInfo } from './components';

import NFTPageProvider from './NFTPage.context'
import { useThemeContext } from '../../../../../contexts/ThemeContext';

// TODO: hide metadata tab for not Polymorph NFT type
export const NFTPage = () => {
  const { setDarkMode } = useThemeContext() as any;

  const [isLikesPopupOpened, setIsLikesPopupOpened] = useState(false);

  useEffect(() => setDarkMode(false), []);

  return (
    <NFTPageProvider>
      <NFTInfo />

      {/*TODO: move to nft-like component*/}
      <NFTLikesPopup isOpen={isLikesPopupOpened} onClose={() => setIsLikesPopupOpened(false)} />
    </NFTPageProvider>
  );
};
