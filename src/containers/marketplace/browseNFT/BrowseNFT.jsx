import React, { useEffect, useState } from 'react';
import './BrowseNFT.scss';
import SelectedFiltersAndSorting from '../../../components/marketplace/browseNFT/selectedFiltersAndSorting/SelectedFiltersAndSorting';
import goToTopIcon from '../../../assets/images/marketplace/back-to-top.svg';
import { PLACEHOLDER_MARKETPLACE_NFTS } from '../../../utils/fixtures/BrowseNFTsDummyData';
import NFTCard from '../../../components/nft/NFTCard';
import LoadMore from '../../../components/pagination/LoadMore';
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
  const [quantity, setQuantity] = useState(8);
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  useEffect(() => {
    const onScroll = (e) => {
      if (window.scrollY > 100) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="browse--nft--page">
      <div className="browse--nft--grid">
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
          <div className="nfts__lists">
            {PLACEHOLDER_MARKETPLACE_NFTS.filter((nft) => !nft.hidden).map(
              (nft, index) => index < quantity && <NFTCard key={nft.id} nft={nft} placeholderData />
            )}
          </div>
          {PLACEHOLDER_MARKETPLACE_NFTS.filter((nft) => !nft.hidden).length > quantity && (
            <LoadMore quantity={quantity} setQuantity={setQuantity} perPage={8} />
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
