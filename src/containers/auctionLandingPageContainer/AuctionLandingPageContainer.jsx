import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../utils/fixtures/ActiveAuctionsDummyData';
import './AuctionLandingPage.scss';
import AuctionDetails from '../../components/auctionLandngPage/AuctionDetails';
import UniverseAuctionDetails from '../../components/auctionLandngPage/UniverseAuctionDetails';
import RewardTiers from '../../components/auctionLandngPage/RewardTiers';
import AuctionOwnerDetails from '../../components/auctionLandngPage/AuctionOwnerDetails';
import PlaceBid from '../../components/auctionLandngPage/PlaceBid';
import { PLACEHOLDER_ARTISTS } from '../../utils/fixtures/ArtistDummyData';
import uuid from 'react-uuid';

const AuctionLandingPageContainer = () => {
    const location = useLocation();
    const auction = PLACEHOLDER_ACTIVE_AUCTIONS.filter(auction => auction.id === location.state.id)[0];
    const artist = PLACEHOLDER_ARTISTS.filter(artist => artist.id === auction.artist.id)[0];
    const [bidders, setBidders] = useState([
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
    
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Universe Minting - Auction - ' + auction.title;
        return () => { document.title = 'Universe Minting' };
    }, [auction])

    return (
        <div className='auction__landing__page'>
            <AuctionDetails auction={auction} bidders={bidders} setBidders={setBidders} />
            <UniverseAuctionDetails />
            <RewardTiers auction={auction} />
            <AuctionOwnerDetails artist={artist} />
            <PlaceBid auction={auction} bidders={bidders} setBidders={setBidders} />
        </div>
    )
}

export default AuctionLandingPageContainer;