import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './MarketplaceNFT.scss';
import AppContext from '../../ContextAPI';
import NotFound from '../../components/notFound/NotFound.jsx';
import MarketplaceNFTDetails from '../../components/marketplaceNFT/MarketplaceNFTDetails';
import '../../components/marketplace/browseNFT/NFTsList.scss';
import { PLACEHOLDER_MARKETPLACE_NFTS } from '../../utils/fixtures/BrowseNFTsDummyData';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getNftData } from '../../utils/api/mintNFT';

const MarketplaceNFT = () => {
  const { setDarkMode } = useThemeContext();
  const location = useLocation();
  const { collectionAddress, tokenId } = useParams();
  const selectedNFT = location.state ? location.state.nft : null;
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getNftData(collectionAddress, tokenId);
        setNft(data.nft);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchInfo();
  }, []);

  return selectedNFT ? (
    <div className="marketplace--nft--page1">
      <MarketplaceNFTDetails
        data={PLACEHOLDER_MARKETPLACE_NFTS}
        onNFT={selectedNFT}
        placeholderData={location.state.placeholderData}
      />
    </div>
  ) : (
    <NotFound />
  );
};

export default MarketplaceNFT;
