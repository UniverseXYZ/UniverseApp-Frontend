import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import './AuctionLandingPage.scss';
import Popup from 'reactjs-popup';
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
import PlaceBidPopup from '../../components/popups/PlaceBidPopup';
import LoadingPopup from '../../components/popups/LoadingPopup';
import { getEthPriceCoingecko } from '../../utils/api/etherscan';
import { useAuthContext } from '../../contexts/AuthContext';
import { LandingPageLoader } from '../../components/auctionLandingPage/LandingPageLoader';

const AuctionLandingPage = () => {
  // const { auction } = useAuctionContext();
  // const { setDarkMode } = useThemeContext();
  // const artist = selectedAuction?.artist;
  // const selectedAuction = auction || null;

  const locationState = useLocation().state;
  // TODO: Disable bidding buttons until the auction is started or is canceled
  const { artistUsername, auctionName } = useParams();
  const { address } = useAuthContext();
  const [auction, setAuction] = useState(null);
  const [bidders, setBidders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBidPopup, setShowBidPopup] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [rewardTiersSlots, setRewardTiersSlots] = useState([]);
  const [ethPrice, setEthPrice] = useState(0);
  const [currentBid, setCurrentBid] = useState(null);

  useEffect(() => {
    if (bidders) {
      const currBidder = bidders.find((bidder) => bidder.address === address);
      if (currBidder) {
        setCurrentBid(currBidder);
        console.log('Current bid:');
        console.log(currentBid);
      }
      console.log('Bidders:');
      console.log(bidders);
    }
  }, [bidders, address]);

  const getAuctionData = async () => {
    const auctionInfo =
      locationState?.auctionData || (await getAuctionLandingPage(artistUsername, auctionName));
    if (!auctionInfo.error) {
      console.log(auctionInfo);

      const tierSlots = [];
      auctionInfo.rewardTiers.forEach((rewardTiers) => {
        for (let i = 0; i < rewardTiers.numberOfWinners; i += 1) {
          tierSlots.push(rewardTiers);
        }
      });
      setBidders(auctionInfo.bidders);
      setRewardTiersSlots(tierSlots);
      setAuction(auctionInfo);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getEthPrice = async () => {
    const price = await getEthPriceCoingecko();
    setEthPrice(price?.market_data?.current_price?.usd);
  };

  useEffect(() => {
    getAuctionData();
    getEthPrice();
  }, [artistUsername, auctionName]);

  return auction ? (
    <div className="auction__landing__page">
      <AuctionDetails
        onAuction={auction}
        bidders={bidders}
        setBidders={setBidders}
        setShowBidPopup={setShowBidPopup}
        rewardTiersSlots={rewardTiersSlots}
        ethPrice={ethPrice}
        currentBid={currentBid}
        setCurrentBid={setCurrentBid}
        loading={loading}
      />
      <UniverseAuctionDetails />
      <RewardTiers auction={auction} />
      <AuctionOwnerDetails artist={auction.artist} />
      <PlaceBid
        auction={auction}
        bidders={bidders}
        setBidders={setBidders}
        setShowBidPopup={setShowBidPopup}
      />
      {auction.artist && auction.artist.personalLogo ? (
        <div className="artist__personal__logo">
          <div>
            <img src={auction.artist.personalLogo} alt="Artist personal logo" />
          </div>
        </div>
      ) : (
        <></>
      )}
      <Popup open={showBidPopup} closeOnDocumentClick={false}>
        <PlaceBidPopup
          onClose={() => setShowBidPopup(false)}
          setShowLoading={setShowLoading}
          auction={auction.auction}
          rewardTiers={auction.rewardTiers}
          artistName={auction.artist?.displayName}
          onBidders={bidders}
          onSetBidders={setBidders}
          currentBid={currentBid}
          setCurrentBid={setCurrentBid}
        />
      </Popup>
      <Popup open={showLoading} closeOnDocumentClick={false}>
        <LoadingPopup
          text="The transaction is in progress. Keep this window opened. Navigating away from the page will reset the curent progress."
          onClose={() => setShowLoading(false)}
          contractInteraction
        />
      </Popup>
    </div>
  ) : loading ? (
    <LandingPageLoader />
  ) : (
    <NotFound />
  );
};

export default AuctionLandingPage;
