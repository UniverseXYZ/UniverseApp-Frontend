import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import './AuctionLandingPage.scss';
import Popup from 'reactjs-popup';
import useSocketIO, { ReadyState } from 'react-use-websocket';
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
  const locationState = useLocation().state;
  const { universeAuctionHouseContract } = useAuthContext();
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
  const [isWinningBid, setIsWinningBid] = useState(false);
  const [winningSlot, setWinningSlot] = useState(-1);
  const [slotsInfo, setSlotsInfo] = useState([]);
  useEffect(() => {
    if (bidders) {
      const currBidder = bidders.find((bidder) => bidder.user.address === address);
      if (currBidder) {
        setCurrentBid(currBidder);
        console.log('Current bidder:');
        console.log(currBidder);

        const currBidderIndex = bidders.map((bidder) => bidder.user.address).indexOf(address);
        if (currBidderIndex <= rewardTiersSlots.length - 1) {
          setIsWinningBid(true);
          setWinningSlot(currBidderIndex);
        }
        console.log('is winning bid:');
        console.log(currBidderIndex <= rewardTiersSlots.length - 1);
      }
      console.log('Bidders:');
      console.log(bidders);
    }
  }, [bidders, address, rewardTiersSlots]);

  const getAuctionData = async () => {
    const auctionInfo = await getAuctionLandingPage(artistUsername, auctionName);
    if (!auctionInfo.error) {
      console.log(auctionInfo);

      const tierSlots = [];
      auctionInfo.rewardTiers.forEach((rewardTiers) => {
        for (let i = 0; i < rewardTiers.numberOfWinners; i += 1) {
          tierSlots.push({ ...rewardTiers, winner: auctionInfo.bidders[i]?.user?.address });
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
  const getAuctionSlotsInfo = async () => {
    if (universeAuctionHouseContract && auction) {
      // TODO: query smart contract to check for captured slots
      const onChainAuction = await universeAuctionHouseContract.auctions(auction.auction.onChainId);

      const auctionSlotsInfo = {};
      for (let i = 1; i <= onChainAuction.numberOfSlots; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const slotInfo = await universeAuctionHouseContract.getSlotInfo(
          auction.auction.onChainId,
          i
        );
        console.log(slotInfo);
        auctionSlotsInfo[i] = slotInfo;
      }
      setSlotsInfo(auctionSlotsInfo);
    }
  };
  useEffect(() => {
    getAuctionSlotsInfo();
  }, [universeAuctionHouseContract, auction]);

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
        isWinningBid={isWinningBid}
        winningSlot={rewardTiersSlots[winningSlot]}
        slotsInfo={slotsInfo}
        setShowLoading={setShowLoading}
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
