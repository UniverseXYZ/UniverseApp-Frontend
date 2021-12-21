import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './AuctionLandingPage.scss';
import Popup from 'reactjs-popup';
import AuctionDetails from '../../components/auctionLandingPage/AuctionDetails.jsx';
import UniverseAuctionDetails from '../../components/auctionLandingPage/UniverseAuctionDetails.jsx';
import RewardTiers from '../../components/auctionLandingPage/RewardTiers.jsx';
import AuctionOwnerDetails from '../../components/auctionLandingPage/AuctionOwnerDetails.jsx';
import PlaceBid from '../../components/auctionLandingPage/PlaceBid.jsx';
import NotFound from '../../components/notFound/NotFound.jsx';
import { getAuctionLandingPage } from '../../utils/api/auctions';
import PlaceBidPopup from '../../components/popups/PlaceBidPopup';
import LoadingPopup from '../../components/popups/LoadingPopup';
import { getEthPriceCoingecko } from '../../utils/api/etherscan';
import { useAuthContext } from '../../contexts/AuthContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { LandingPageLoader } from '../../components/auctionLandingPage/LandingPageLoader';
import {
  disconnectAuctionSocket,
  initiateAuctionSocket,
  removeAllListeners,
  subscribeToBidSubmitted,
  subscribeToBidWithdrawn,
  subscribeToAuctionExtended,
  subscribeToERC721Claimed,
  subscribeToAuctionWithdrawnRevenue,
} from '../../utils/websockets/auctionEvents';
import SuccessBidPopup from '../../components/popups/SuccessBidPopup';
import { createRewardsTiersSlots } from '../../utils/helpers';

const AuctionLandingPage = () => {
  const defaultLoadingText =
    'The transaction is in progress. Keep this window opened. Navigating away from the page will reset the curent progress.';
  const locationState = useLocation().state;
  const { setActiveTxHashes, activeTxHashes } = useMyNftsContext();
  const { universeAuctionHouseContract, yourBalance, setYourBalance } = useAuthContext();
  // TODO: Disable bidding buttons until the auction is started or is canceled
  const { artistUsername, auctionName } = useParams();
  const { address } = useAuthContext();
  const [auction, setAuction] = useState(null);
  const [bidders, setBidders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBidPopup, setShowBidPopup] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [rewardTiersSlots, setRewardTiersSlots] = useState([]);
  const [ethPrice, setEthPrice] = useState(0);
  const [currentBid, setCurrentBid] = useState(null);
  const [isWinningBid, setIsWinningBid] = useState(false);
  const [winningSlot, setWinningSlot] = useState(-1);
  const [slotsInfo, setSlotsInfo] = useState({});
  const [loadingText, setLoadingText] = useState(defaultLoadingText);
  const [showSuccessfulBid, setShowSuccessfulBid] = useState(false);
  const [showCancelBidPopup, setShowCancelBidPopup] = useState(false);

  useEffect(() => {
    if (bidders.length) {
      const currBidder = bidders.find(
        (bidder) => bidder?.user?.address?.toLowerCase() === address.toLowerCase()
      );
      if (currBidder) {
        setCurrentBid(currBidder);

        const currBidderIndex = bidders
          .map((bidder) => bidder.user.address.toLowerCase())
          .indexOf(address.toLowerCase());
        if (currBidderIndex <= rewardTiersSlots.length - 1) {
          setIsWinningBid(true);
          setWinningSlot(currBidderIndex);
        }
      }
    }
  }, [bidders, address, rewardTiersSlots]);

  const calculateRewardTierSlots = (rewardTiers, biddersInfo) => {
    const tierSlots = [];
    let slotIndexCounter = 1;
    rewardTiers
      .sort((a, b) => a.tierPosition - b.tierPosition)
      .forEach((rewardTier) => {
        for (let i = 0; i < rewardTier.numberOfWinners; i += 1) {
          // eslint-disable-next-line no-loop-func
          const nfts = rewardTier.nfts.filter((t) => t.slot === slotIndexCounter);
          tierSlots.push({
            ...rewardTier,
            nfts,
            winner: biddersInfo[i]?.user?.address,
            slotIndex: slotIndexCounter,
            // eslint-disable-next-line no-loop-func
            minimumBid: rewardTier.slots.find((s) => s.index === slotIndexCounter)?.minimumBid,
          });
          slotIndexCounter += 1;
        }
      });
    setRewardTiersSlots(tierSlots);
  };

  const handleBidSubmittedEvent = (err, user, amount, userProfile) => {
    // We need to use the latest state using setState(upToDateState)
    // as we don't have access to the latest state when using a callback

    if (err) return;
    const isYourEvent = user.toLowerCase() === address.toLowerCase();

    // Update the Bidders
    let newBidderScope = [];
    setBidders((upToDateBidders) => {
      const newBidders = [...upToDateBidders];
      const existingBidderIndex = newBidders.map((bidder) => bidder.user.address).indexOf(user);

      if (existingBidderIndex >= 0) {
        newBidders[existingBidderIndex].amount = parseFloat(amount);
      } else {
        newBidders.push({
          amount: parseFloat(amount),
          user: {
            ...userProfile,
            address: user,
          },
        });
      }

      newBidders.sort((a, b) => b.amount - a.amount);
      newBidderScope = newBidders;
      return newBidders;
    });

    // Update user balance
    setYourBalance((upToDateBalance) => {
      if (isYourEvent && auction.auction.tokenSymbol.toLowerCase() === 'eth') {
        return parseFloat(upToDateBalance) - parseFloat(amount);
      }

      return upToDateBalance;
    });

    const tierSlots = createRewardsTiersSlots(auction.rewardTiers, newBidderScope);
    setRewardTiersSlots(tierSlots);

    // Update isWinningBid
    const currBidderIndex = newBidderScope.map((bidder) => bidder.user.address).indexOf(address);
    const hasWin = currBidderIndex <= rewardTiersSlots.length - 1;
    if (hasWin) {
      setIsWinningBid(true);
      setWinningSlot(currBidderIndex);
    } else {
      setIsWinningBid(false);
      setWinningSlot(-1);
    }

    if (isYourEvent) {
      setShowLoading(false);
      setLoadingText(defaultLoadingText);
      setShowBidPopup(false);
      setShowSuccessfulBid(true);
    }
  };

  const handleBidWithdrawnEvent = (err, user, amount) => {
    const isYourEvent = user.toLowerCase() === address.toLowerCase();
    const newBidders = [...bidders];
    const existingBidderIndex = newBidders.map((bidder) => bidder.user.address).indexOf(user);
    if (existingBidderIndex >= 0) {
      newBidders.splice(existingBidderIndex, 1);
      newBidders.sort((a, b) => b.amount - a.amount);
      setBidders(newBidders);
    }

    const updateBalance = isYourEvent && auction.auction.tokenSymbol.toLowerCase() === 'eth';
    if (updateBalance) {
      const newBalance = parseFloat(yourBalance) + parseFloat(amount);
      setYourBalance(newBalance);
    }

    setCurrentBid(null);
    setShowCancelBidPopup(false);
  };

  const handleERC721ClaimedEvent = (err, claimer, slotIndex) => {
    const isYourEvent = claimer.toLowerCase() === address.toLowerCase();

    if (isYourEvent) {
      setShowLoading(false);
      setActiveTxHashes([]);
    }
  };

  const handleAuctionWithdrawnRevenueEvent = (err, totalRevenue, recipient) => {
    const isYourEvent = recipient.toLowerCase() === address.toLowerCase();

    if (isYourEvent) {
      setShowLoading(false);
      setActiveTxHashes([]);
    }
  };

  useEffect(() => {
    // We need to update the callback function every time the state used inside it changes
    // Otherwise we will get old state in the callback
    if (auction) {
      removeAllListeners(auction.auction.id);

      subscribeToBidSubmitted(auction.auction.id, (err, { user, amount, userProfile }) => {
        handleBidSubmittedEvent(err, user, amount, userProfile);
      });

      subscribeToBidWithdrawn(auction.auction.id, (err, { user, amount }) => {
        handleBidWithdrawnEvent(err, user, amount);
      });

      subscribeToERC721Claimed(auction.auction.id, (err, { claimer, slotIndex }) => {
        handleERC721ClaimedEvent(err, claimer, slotIndex);
      });

      subscribeToAuctionWithdrawnRevenue(auction.auction.id, (err, { totalRevenue, recipient }) => {
        handleAuctionWithdrawnRevenueEvent(err, totalRevenue, recipient);
      });

      subscribeToAuctionExtended(auction.auction.id, (err, { endDate }) => {
        setAuction((upToDate) => ({
          ...upToDate,
          auction: { ...upToDate.auction, endDate },
        }));
      });
    }
  }, [auction, bidders, yourBalance]);

  const getAuctionData = async () => {
    const auctionInfo = await getAuctionLandingPage(artistUsername, auctionName);
    if (!auctionInfo.error) {
      const tierSlots = createRewardsTiersSlots(auctionInfo.rewardTiers, auctionInfo.bidders);
      setRewardTiersSlots(tierSlots);

      // Parse Bidders amount to float
      const newBidders = auctionInfo?.bidders?.map((b) => {
        const updated = { ...b };
        updated.amount = parseFloat(updated.amount);
        return updated;
      });
      setBidders(newBidders);
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
    // We need socket initialization to happens first
    initiateAuctionSocket();
    getAuctionData();
    getEthPrice();
  }, [artistUsername, auctionName]);

  useEffect(
    () => () => {
      // removeAllListeners(aId);
      disconnectAuctionSocket();
    },
    []
  );

  const getAuctionSlotsInfo = async () => {
    if (universeAuctionHouseContract && auction && auction.auction?.onChainId) {
      // TODO: query smart contract to check for captured slots
      const onChainAuction = await universeAuctionHouseContract.auctions(auction.auction.onChainId);

      const auctionSlotsInfo = {};
      for (let i = 1; i <= onChainAuction.numberOfSlots; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const slotInfo = await universeAuctionHouseContract.getSlotInfo(
          auction.auction.onChainId,
          i
        );
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
        setShowBidPopup={setShowBidPopup}
        rewardTiersSlots={rewardTiersSlots}
        ethPrice={ethPrice}
        currentBid={currentBid}
        loading={loading}
        isWinningBid={isWinningBid}
        winningSlot={rewardTiersSlots[winningSlot]}
        slotsInfo={slotsInfo}
        setShowLoading={setShowLoading}
        showCancelBidPopup={showCancelBidPopup}
        setShowCancelBidPopup={setShowCancelBidPopup}
      />
      <UniverseAuctionDetails auction={auction} />
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
          setLoadingText={setLoadingText}
        />
      </Popup>
      <Popup open={showLoading} closeOnDocumentClick={false}>
        <LoadingPopup
          text={loadingText}
          onClose={() => setShowLoading(false)}
          contractInteraction
        />
      </Popup>
      <Popup open={showSuccessfulBid} closeOnDocumentClick={false}>
        <SuccessBidPopup
          onClose={() => setShowSuccessfulBid(false)}
          auctionHeadline={auction.headline || ''}
          artistName={auction.artist?.displayName}
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
