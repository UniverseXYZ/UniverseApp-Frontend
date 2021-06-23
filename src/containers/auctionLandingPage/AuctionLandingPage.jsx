import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import './AuctionLandingPage.scss';
import AuctionDetails from '../../components/auctionLandingPage/AuctionDetails.jsx';
import UniverseAuctionDetails from '../../components/auctionLandingPage/UniverseAuctionDetails.jsx';
import RewardTiers from '../../components/auctionLandingPage/RewardTiers.jsx';
import AuctionOwnerDetails from '../../components/auctionLandingPage/AuctionOwnerDetails.jsx';
import PlaceBid from '../../components/auctionLandingPage/PlaceBid.jsx';
import AppContext from '../../ContextAPI';
import NotFound from '../../components/notFound/NotFound.jsx';

const AuctionLandingPage = () => {
  const { setWebsite } = useContext(AppContext);
  const location = useLocation();
  const selectedAuction = location.state ? location.state.auction : null;
  const artist = selectedAuction?.artist;

  const [bidders, setBidders] = useState([]);

  useEffect(() => {
    setWebsite(false);
    document.title = `Universe Minting - Auction - ${selectedAuction?.name}`;
    if (selectedAuction) {
      // Fake data for testing
      setBidders([
        {
          id: uuid(),
          aucionId: selectedAuction.id,
          artistId: uuid(),
          name: 'Whaleshark',
          bid: 10,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: selectedAuction.id,
          artistId: uuid(),
          name: 'WeirdWoman',
          bid: 24,
          rewardTier: 'Gold',
        },
        {
          id: uuid(),
          aucionId: selectedAuction.id,
          artistId: uuid(),
          name: 'TopBidder',
          bid: 13.5,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: selectedAuction.id,
          artistId: uuid(),
          name: 'Weird Man',
          bid: 23,
          rewardTier: 'Gold',
        },
        {
          id: uuid(),
          aucionId: selectedAuction.id,
          artistId: uuid(),
          name: 'Weird Man',
          bid: 20,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: selectedAuction.id,
          artistId: uuid(),
          name: 'Weird Man',
          bid: 40,
          rewardTier: 'Platinum',
        },
        {
          id: uuid(),
          aucionId: selectedAuction.id,
          artistId: uuid(),
          name: 'WeirdWoman',
          bid: 5,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: selectedAuction.id,
          artistId: uuid(),
          name: 'TopBidder',
          bid: 9,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: selectedAuction.id,
          artistId: uuid(),
          name: 'Warden',
          bid: 17,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: selectedAuction.id,
          artistId: uuid(),
          name: 'Weird Man',
          bid: 6.8,
          rewardTier: 'Silver',
        },
      ]);
    }
    return () => {
      document.title = 'Universe Minting';
    };
  }, [selectedAuction]);

  return selectedAuction ? (
    <div className="auction__landing__page">
      <AuctionDetails onAuction={selectedAuction} bidders={bidders} setBidders={setBidders} />
      <UniverseAuctionDetails />
      <RewardTiers auction={selectedAuction} />
      <AuctionOwnerDetails artist={artist} />
      <PlaceBid auction={selectedAuction} bidders={bidders} setBidders={setBidders} />
      {artist && artist.personalLogo ? (
        <div className="artist__personal__logo">
          <div>
            <img src={URL.createObjectURL(artist.personalLogo)} alt="Artist personal logo" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <NotFound />
  );
};

export default AuctionLandingPage;
