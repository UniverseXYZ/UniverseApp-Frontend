import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './MarketplaceNFT.scss';
import AppContext from '../../ContextAPI';
import NotFound from '../../components/notFound/NotFound.jsx';
import MarketplaceNFTDetails from '../../components/marketplaceNFT/MarketplaceNFTDetails';
import '../../components/marketplace/browseNFT/NFTsList.scss';
import { PLACEHOLDER_MARKETPLACE_NFTS } from '../../utils/fixtures/BrowseNFTsDummyData';

const MarketplaceNFT = () => {
  const { setDarkMode } = useContext(AppContext);
  const location = useLocation();
  const selectedNFT = location.state ? location.state.nft : null;

  useEffect(() => {
    setDarkMode(false);
  });

  return selectedNFT ? (
    <div className="marketplace--nft--page1">
      <MarketplaceNFTDetails data={PLACEHOLDER_MARKETPLACE_NFTS} onNFT={selectedNFT} />
    </div>
  ) : (
    <NotFound />
  );
};

export default MarketplaceNFT;
