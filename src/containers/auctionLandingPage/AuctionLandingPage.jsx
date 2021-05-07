import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../utils/fixtures/ActiveAuctionsDummyData';
import './AuctionLandingPage.scss';
import AuctionDetails from '../../components/auctionLandingPage/AuctionDetails';
import UniverseAuctionDetails from '../../components/auctionLandingPage/UniverseAuctionDetails';
import RewardTiers from '../../components/auctionLandingPage/RewardTiers';
import AuctionOwnerDetails from '../../components/auctionLandingPage/AuctionOwnerDetails';
import PlaceBid from '../../components/auctionLandingPage/PlaceBid';
import { PLACEHOLDER_ARTISTS } from '../../utils/fixtures/ArtistDummyData';

const AuctionLandingPage = () => {
  const location = useLocation();
  const selectedAuction = location.state ? location.state.auction : null;
  const artist = selectedAuction?.artist;

  const [bidders, setBidders] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Universe Minting - Auction - ${selectedAuction?.name}`;
    console.log('selectedAuction', selectedAuction);
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
      {/* <RewardTiers auction={selectedAuction} /> */}
      <AuctionOwnerDetails artist={artist} />
      {/* <PlaceBid auction={selectedAuction} bidders={bidders} setBidders={setBidders} /> */}
      <div className="artist__personal__logo">
        <img src={URL.createObjectURL(artist.personalLogo)} alt="Artist personal logo" />
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default AuctionLandingPage;
