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
import NFTsList from '../../../components/marketplace/browseNFT/NFTsList';
import { PLACEHOLDER_MARKETPLACE_NFTS } from '../../../utils/fixtures/BrowseNFTsDummyData';

const BrowseNFT = () => {
  const { setDarkMode } = useContext(AppContext);
  const [selectedPrice, setSelectedPrice] = useState(null);
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
          <Price setSelectedPrice={setSelectedPrice} />
          <Collections />
          <Creators />
          <VerifiedOnly />
        </div>
        <div className="browse--nft--content">
          <SelectedFiltersAndSorting
            saleTypeButtons={saleTypeButtons}
            setSaleTypeButtons={setSaleTypeButtons}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
          <NFTsList data={PLACEHOLDER_MARKETPLACE_NFTS} />
          <button type="button" className="light-border-button load--more--nfts">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrowseNFT;
