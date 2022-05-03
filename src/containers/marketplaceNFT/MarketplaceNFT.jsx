import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import './MarketplaceNFT.scss';
import NotFound from '../../components/notFound/NotFound.jsx';
import MarketplaceNFTDetails from '../../components/marketplaceNFT/MarketplaceNFTDetails';
import '../../components/marketplace/browseNFT/NFTsList.scss';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getNftData } from '../../utils/api/mintNFT';
import { CollectionPageLoader } from '../collection/CollectionPageLoader';

const MarketplaceNFT = () => {
  const { setDarkMode } = useThemeContext();
  const { collectionAddress, tokenId } = useParams();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getNftData(collectionAddress, tokenId);
        if (!data.error && !data.statusCode) {
          setNft(data);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchInfo();
  }, [collectionAddress, tokenId]);

  return loading ? (
    <div className="loader-wrapper">
      <CollectionPageLoader />
    </div>
  ) : nft ? (
    <div className="marketplace--nft--page1">
      <MarketplaceNFTDetails onNFT={nft} />
    </div>
  ) : (
    <NotFound />
  );
};

export default MarketplaceNFT;
