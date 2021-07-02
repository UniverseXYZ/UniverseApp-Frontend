import React, { useContext, useEffect, useState } from 'react';
import SaleType from '../../../components/marketplace/browseNFT/sidebarFiltration/SaleType';
import Price from '../../../components/marketplace/browseNFT/sidebarFiltration/Price';
import Collections from '../../../components/marketplace/browseNFT/sidebarFiltration/Collections';
import Creators from '../../../components/marketplace/browseNFT/sidebarFiltration/Creators';
import Submenu from '../../../components/submenu/Submenu';
import AppContext from '../../../ContextAPI';
import './BrowseNFT.scss';
import SelectedFiltersAndSorting from '../../../components/marketplace/browseNFT/selectedFiltersAndSorting/SelectedFiltersAndSorting';
import VerifiedOnly from '../../../components/marketplace/browseNFT/sidebarFiltration/VerifiedOnly';

const BrowseNFT = () => {
  const { setDarkMode } = useContext(AppContext);
  const [saleTypeButtons, setSaleTypeButtons] = useState([
    {
      text: 'Buy Now',
      selected: false,
    },
    {
      text: 'On Auction',
      selected: false,
    },
    {
      text: 'New',
      selected: false,
    },
    {
      text: 'Has Offers',
      selected: false,
    },
  ]);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <div className="browse--nft--page">
      <Submenu title="NFT Marketplace" subtitles={['Browse NFTs', 'Activity']} />
      <div className="browse--nft--grid">
        <div className="browse--nft--sidebar--filtration">
          <SaleType saleTypeButtons={saleTypeButtons} setSaleTypeButtons={setSaleTypeButtons} />
          <Price />
          <Collections />
          <Creators />
          <VerifiedOnly />
        </div>
        <div className="browse--nft--content">
          <SelectedFiltersAndSorting
            saleTypeButtons={saleTypeButtons}
            setSaleTypeButtons={setSaleTypeButtons}
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseNFT;
