import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../utils/fixtures/ActiveAuctionsDummyData';
import './AuctionLandingPage.scss';
import AuctionDetails from '../../components/auctionLandngPage/AuctionDetails';
import UniverseAuctionDetails from '../../components/auctionLandngPage/UniverseAuctionDetails';

const AuctionLandingPageContainer = () => {
    const location = useLocation();
    const auction = PLACEHOLDER_ACTIVE_AUCTIONS.filter(auction => auction.id === location.state.id)[0];

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Universe Minting - Auction - ' + auction.title;
        return () => { document.title = 'Universe Minting' };
    }, [])

    return (
        <div className='auction__landing__page'>
            <AuctionDetails auction={auction} />
            <UniverseAuctionDetails />
        </div>
    )
}

export default AuctionLandingPageContainer;