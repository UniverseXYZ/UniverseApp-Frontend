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
  const auction = location.state
    ? PLACEHOLDER_ACTIVE_AUCTIONS.filter((act) => act.id === location.state.id)[0]
    : null;
  const artist = PLACEHOLDER_ARTISTS.filter((a) => a.id === auction?.artist.id)[0];

  const [bidders, setBidders] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Universe Minting - Auction - ${auction?.title}`;
    if (auction) {
      // Fake data for testing
      setBidders([
        {
          id: uuid(),
          aucionId: auction.id,
          artistId: uuid(),
          name: 'Whaleshark',
          bid: 10,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: auction.id,
          artistId: uuid(),
          name: 'WeirdWoman',
          bid: 24,
          rewardTier: 'Gold',
        },
        {
          id: uuid(),
          aucionId: auction.id,
          artistId: uuid(),
          name: 'TopBidder',
          bid: 13.5,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: auction.id,
          artistId: uuid(),
          name: 'Weird Man',
          bid: 23,
          rewardTier: 'Gold',
        },
        {
          id: uuid(),
          aucionId: auction.id,
          artistId: uuid(),
          name: 'Weird Man',
          bid: 20,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: auction.id,
          artistId: uuid(),
          name: 'Weird Man',
          bid: 40,
          rewardTier: 'Platinum',
        },
        {
          id: uuid(),
          aucionId: auction.id,
          artistId: uuid(),
          name: 'WeirdWoman',
          bid: 5,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: auction.id,
          artistId: uuid(),
          name: 'TopBidder',
          bid: 9,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: auction.id,
          artistId: uuid(),
          name: 'Warden',
          bid: 17,
          rewardTier: 'Silver',
        },
        {
          id: uuid(),
          aucionId: auction.id,
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
  }, [auction]);

  return auction ? (
    <div className="auction__landing__page">
      <AuctionDetails onAuction={auction} bidders={bidders} setBidders={setBidders} />
      <UniverseAuctionDetails />
      <RewardTiers auction={auction} />
      <AuctionOwnerDetails artist={artist} />
      <PlaceBid auction={auction} bidders={bidders} setBidders={setBidders} />
      <div className="artist__personal__logo">
        <img src={artist.personalLogo} alt="Artist personal logo" />
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default AuctionLandingPage;
