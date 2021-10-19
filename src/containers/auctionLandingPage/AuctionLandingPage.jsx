import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import './AuctionLandingPage.scss';
import AuctionDetails from '../../components/auctionLandingPage/AuctionDetails.jsx';
import UniverseAuctionDetails from '../../components/auctionLandingPage/UniverseAuctionDetails.jsx';
import RewardTiers from '../../components/auctionLandingPage/RewardTiers.jsx';
import AuctionOwnerDetails from '../../components/auctionLandingPage/AuctionOwnerDetails.jsx';
import PlaceBid from '../../components/auctionLandingPage/PlaceBid.jsx';
import AppContext from '../../ContextAPI';
import NotFound from '../../components/notFound/NotFound.jsx';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { getAuctionLandingPage } from '../../utils/api/auctions';

const AuctionLandingPage = () => {
  // const { auction } = useAuctionContext();
  // const { setDarkMode } = useThemeContext();
  // const location = useLocation();
  // const artist = selectedAuction?.artist;
  // const selectedAuction = auction || null;
  const { artistUsername, auctionName } = useParams();

  const [auction, setAuction] = useState(null);
  const [bidders, setBidders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAuctionData = async () => {
    const auctionData = await getAuctionLandingPage(artistUsername, auctionName);
    console.log(auctionData);
    setAuction(auctionData);
    setBidders(auctionData.bids);
    setLoading(false);
  };

  useEffect(() => {
    getAuctionData();
  }, []);

  return auction ? (
    <div className="auction__landing__page">
      <AuctionDetails onAuction={auction} bidders={bidders} setBidders={setBidders} />
      <UniverseAuctionDetails />
      <RewardTiers auction={auction} />
      <AuctionOwnerDetails artist={auction.artist} />
      <PlaceBid auction={auction} bidders={bidders} setBidders={setBidders} />
      {auction.artist && auction.artist.personalLogo ? (
        <div className="artist__personal__logo">
          <div>
            <img
              src={URL.createObjectURL(auction.artist.personalLogo)}
              alt="Artist personal logo"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : !loading ? (
    <NotFound />
  ) : (
    <></>
  );
};

export default AuctionLandingPage;
