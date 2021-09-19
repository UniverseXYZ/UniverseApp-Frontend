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
import goToTopIcon from '../../../assets/images/marketplace/back-to-top.svg';
import { PLACEHOLDER_MARKETPLACE_NFTS } from '../../../utils/fixtures/BrowseNFTsDummyData';
import { useThemeContext } from '../../../contexts/ThemeContext';

const BrowseNFT = () => {
  const { setDarkMode } = useThemeContext();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [saleTypeButtons, setSaleTypeButtons] = useState([
    {
      text: 'Buy now',
      description: 'Fixed price sale',
      selected: false,
    },
    {
      text: 'On auction',
      description: 'You can place bids',
      selected: false,
    },
    {
      text: 'New',
      description: 'Recently added',
      selected: false,
    },
    {
      text: 'Has offers',
      description: 'High in demand',
      selected: false,
    },
  ]);
  const [savedCollections, setSavedCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [savedCreators, setSavedCreators] = useState([]);
  const [selectedCreators, setSelectedCreators] = useState([]);
  const [nftNumber, setNftNumber] = useState(7);
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };
  });

  return (
    <div className="browse--nft--page">
      {/* <Submenu title="NFT Marketplace" subtitles={['Browse NFTs', 'Activity']} /> */}
      <div className="browse--nft--grid">
        {/* <div className="browse--nft--sidebar--filtration" hidden>
          <SaleType saleTypeButtons={saleTypeButtons} setSaleTypeButtons={setSaleTypeButtons} />
          <Price setSelectedPrice={setSelectedPrice} />
          <Collections
            savedCollections={savedCollections}
            setSavedCollections={setSavedCollections}
          />
          <Creators savedCreators={savedCreators} setSavedCreators={setSavedCreators} />
          <VerifiedOnly />
        </div> */}
        <div className="browse--nft--content">
          <SelectedFiltersAndSorting
            saleTypeButtons={saleTypeButtons}
            setSaleTypeButtons={setSaleTypeButtons}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            savedCollections={savedCollections}
            setSavedCollections={setSavedCollections}
            selectedCollections={selectedCollections}
            setSelectedCollections={setSelectedCollections}
            savedCreators={savedCreators}
            setSavedCreators={setSavedCreators}
            selectedCreators={selectedCreators}
            setSelectedCreators={setSelectedCreators}
          />
          <NFTsList data={PLACEHOLDER_MARKETPLACE_NFTS} nftNumber={nftNumber} />
          {nftNumber <= PLACEHOLDER_MARKETPLACE_NFTS.length && (
            <button
              type="button"
              className="light-border-button load--more--nfts"
              onClick={() => setNftNumber(nftNumber + 8)}
            >
              Load More
            </button>
          )}
        </div>
        {showGoToTop && (
          <img
            className="go--to--top"
            src={goToTopIcon}
            alt="Top"
            aria-hidden="true"
            onClick={() => window.scrollTo(0, 0)}
          />
        )}
      </div>
    </div>
  );
};

export default BrowseNFT;
