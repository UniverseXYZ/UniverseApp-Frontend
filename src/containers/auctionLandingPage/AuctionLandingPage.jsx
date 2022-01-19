import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './AuctionLandingPage.scss';
import Popup from 'reactjs-popup';
import BigNumber from 'bignumber.js';
import { BigNumber as EBigNumber, utils } from 'ethers';
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
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { useSocketContext } from '../../contexts/SocketContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { LandingPageLoader } from '../../components/auctionLandingPage/LandingPageLoader';
import SuccessBidPopup from '../../components/popups/SuccessBidPopup';
import { createRewardsTiersSlots } from '../../utils/helpers';
import { isBeforeNow } from '../../utils/dates';

const AuctionLandingPage = () => {
  const defaultLoadingText =
    'The transaction is in progress. Keep this window opened. Navigating away from the page will reset the curent progress.';
  const locationState = useLocation().state;
  const { setActiveTxHashes, activeTxHashes } = useMyNftsContext();
  const { myAuctions } = useAuctionContext();
  const { auctionEvents, subscribeTo, unsubscribeFrom } = useSocketContext();
  const { universeAuctionHouseContract, yourBalance, setYourBalance } = useAuthContext();
  // TODO: Disable bidding buttons until the auction is started or is canceled
  const { artistUsername, auctionName } = useParams();
  const { loggedInArtist, setLoggedInArtist, address } = useAuthContext();
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
  const [selectedAuctionEnded, setSelectedAuctionEnded] = useState(false);

  // Auction ended section
  const [mySlot, setMySlot] = useState(null);
  const [mySlotIndex, setMySlotIndex] = useState(-1);
  const [slotsToWithdraw, setSlotsToWithdraw] = useState([]);
  const [claimableFunds, setClaimableFunds] = useState(0);
  const [unreleasedFunds, setUnreleasedFunds] = useState(0);

  // useRef is used to access latest state inside socket event callbacks
  // More info why this is used here (https://github.com/facebook/react/issues/16975)
  // Start of useRef section

  const addressRef = useRef(address);
  const biddersRef = useRef(bidders);
  const auctionRef = useRef(auction);
  const yourBalanceRef = useRef(yourBalance);

  useEffect(() => {
    addressRef.current = address;
  }, [address]);

  useEffect(() => {
    biddersRef.current = bidders;
  }, [bidders]);

  useEffect(() => {
    auctionRef.current = auction;
  }, [auction]);

  useEffect(() => {
    yourBalanceRef.current = yourBalance;
  }, [yourBalance]);

  // End of useRef section

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
    } else {
      // We need to reset the currentBid, upon updating the bidders even though there might not be any
      setCurrentBid(null);
      setIsWinningBid(false);
      setWinningSlot(-1);
    }
  }, [bidders, address, rewardTiersSlots]);

  useEffect(async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [slotIndex, slotInfo] of Object.entries(slotsInfo)) {
      if (slotInfo.winner === utils.getAddress(address)) {
        setMySlot(slotInfo);
        setMySlotIndex(slotIndex);
        break;
      } else if (
        slotInfo.winner === '0x0000000000000000000000000000000000000000' &&
        slotInfo.revenueCaptured &&
        slotInfo.totalWithdrawnNfts.toNumber() !== slotInfo.totalDepositedNfts.toNumber()
      ) {
        setSlotsToWithdraw([...slotsToWithdraw, +slotIndex]);
      }
    }
  }, [slotsInfo]);

  const getAuctionRevenue = async () => {
    const revenueToClaim = await universeAuctionHouseContract.auctionsRevenue(
      auction.auction.onChainId
    );

    const totalBids = Object.values(slotsInfo).reduce(
      (acc, slot) => acc.add(slot.winningBidAmount),
      EBigNumber.from('0')
    );

    const toClaim = utils.formatEther(revenueToClaim);
    setClaimableFunds(toClaim);

    const unreleased =
      utils.formatEther(totalBids.sub(revenueToClaim)) - Number(auction.auction.revenueClaimed);

    setUnreleasedFunds(unreleased);
  };

  useEffect(() => {
    if (
      universeAuctionHouseContract &&
      Object.values(slotsInfo).length &&
      address === auction.artist.address
    ) {
      getAuctionRevenue();
    }
  }, [universeAuctionHouseContract, slotsInfo, address]);

  const handleBidSubmittedEvent = (err, { user, amount, userProfile, bids }) => {
    if (err) return;
    const isYourEvent = user.toLowerCase() === addressRef.current.toLowerCase();

    // 1. Update bidders
    const newBidders = [...biddersRef.current];
    const existingBidderIndex = newBidders
      .map((bidder) => bidder.user.address.toLowerCase())
      .indexOf(user.toLowerCase());

    if (existingBidderIndex >= 0) {
      newBidders[existingBidderIndex].amount = amount;
    } else {
      newBidders.push({
        amount,
        user: {
          ...userProfile,
          address: user,
        },
      });
    }

    newBidders.sort((a, b) => new BigNumber(b.amount).minus(a.amount).toNumber());
    setBidders(newBidders);

    // 2. Update user's balance
    const shouldUpdateBalance =
      isYourEvent && auctionRef.current.auction.tokenSymbol.toLowerCase() === 'eth';

    if (shouldUpdateBalance) {
      const newBalance = new BigNumber(yourBalanceRef.current).minus(amount);
      setYourBalance(newBalance);
    }

    // 3. Update reward tier slots
    const tierSlots = createRewardsTiersSlots(auctionRef.current.rewardTiers, newBidders);
    setRewardTiersSlots(tierSlots);

    // 4. Update isWinningBid
    const currBidderIndex = newBidders
      .map((bidder) => bidder.user.address)
      .indexOf(addressRef.current);

    const hasWin = currBidderIndex <= rewardTiersSlots.length - 1;
    if (hasWin) {
      setIsWinningBid(true);
      setWinningSlot(currBidderIndex);
    } else {
      setIsWinningBid(false);
      setWinningSlot(-1);
    }

    // 5. Close loading and show success modal
    if (isYourEvent) {
      setShowLoading(false);
      setLoadingText(defaultLoadingText);
      setShowBidPopup(false);
      setShowSuccessfulBid(true);
    }
  };

  const handleBidWithdrawnEvent = (err, { user, amount, userProfile, withdrawn }) => {
    const isYourEvent = user.toLowerCase() === addressRef.current.toLowerCase();

    // 1. Update bidders
    const newBidders = [...biddersRef.current];
    const existingBidderIndex = newBidders.map((bidder) => bidder.user.address).indexOf(user);
    if (existingBidderIndex >= 0) {
      newBidders.splice(existingBidderIndex, 1);
      newBidders.sort((a, b) => new BigNumber(b.amount).minus(a.amount).toNumber());
      setBidders(newBidders);
    }

    // 2. Update balance
    const shouldUpdateBalance =
      isYourEvent && auctionRef.current.auction.tokenSymbol.toLowerCase() === 'eth';
    if (shouldUpdateBalance) {
      const newBalance = parseFloat(yourBalance) + parseFloat(amount);
      setYourBalance(newBalance);
    }

    // 3. Update current bid
    if (isYourEvent) {
      if (withdrawn) {
        setCurrentBid((currBid) => ({ ...currBid, withdrawn }));
      } else {
        setCurrentBid(null);
      }
      setShowLoading(false);
      setShowCancelBidPopup(false);
    }
  };

  const handleERC721ClaimedEvent = (err, { claimer, slotIndex }) => {
    const isYourEvent = claimer.toLowerCase() === addressRef.current.toLowerCase();

    if (isYourEvent) {
      setMySlot({ ...mySlot, totalWithdrawnNfts: mySlot.totalDepositedNfts });
      setShowLoading(false);
      setActiveTxHashes([]);
    }
  };

  const handleAuctionWithdrawnRevenueEvent = (err, { totalRevenue, recipient }) => {
    const isYourEvent = recipient.toLowerCase() === addressRef.current.toLowerCase();

    if (isYourEvent) {
      setClaimableFunds(0);
      setShowLoading(false);
      setActiveTxHashes([]);
    }
  };

  const handeAuctionExtendedEvent = (err, { endDate }) => {
    if (err) return;

    setAuction((upToDate) => ({
      ...upToDate,
      auction: { ...upToDate.auction, endDate },
    }));
  };

  useEffect(() => {
    if (auction?.auction?.id) {
      // Ready & Tested
      subscribeTo({
        auctionId: auction.auction.id,
        eventName: auctionEvents.BID_SUBMITTED,
        cb: handleBidSubmittedEvent,
      });

      // Ready & Tested
      subscribeTo({
        auctionId: auction.auction.id,
        eventName: auctionEvents.BID_WITHDRAWN,
        cb: handleBidWithdrawnEvent,
      });

      // Ready & Tested
      subscribeTo({
        auctionId: auction.auction.id,
        eventName: auctionEvents.CLAIMED_NFT,
        cb: handleERC721ClaimedEvent,
      });

      // Ready & Tested
      subscribeTo({
        auctionId: auction.auction.id,
        eventName: auctionEvents.WITHDRAWN_REVENUE,
        cb: handleAuctionWithdrawnRevenueEvent,
      });

      subscribeTo({
        auctionId: auction.auction.id,
        eventName: auctionEvents.EXTENDED,
        cb: handeAuctionExtendedEvent,
      });
    }
  }, [auction?.auction?.id]);

  const mockAuctionPreviewData = (auctionData) => {
    const { name, avatar, universePageAddress } = loggedInArtist;
    const updatedLoggedInArtist = {
      ...loggedInArtist,
      displayName: name,
      profileImageUrl: avatar,
      universePageUrl: universePageAddress,
    };
    setLoggedInArtist(updatedLoggedInArtist);
    auctionData.bidders = [];

    const auctionMockedData = {
      auction: auctionData,
      rewardTiers: auctionData.rewardTiers,
      collections: auctionData.collections,
      artist: updatedLoggedInArtist,
      bidders: [],
    };

    return auctionMockedData;
  };

  const getAuctionData = async () => {
    const auctionPreview = myAuctions.filter((auc) => auc.link === auctionName)[0];
    let auctionInfo = null;
    if (auctionPreview) {
      auctionInfo = mockAuctionPreviewData(auctionPreview);
    } else {
      try {
        auctionInfo = await getAuctionLandingPage(artistUsername, auctionName);
      } catch (error) {
        console.error(error);
      }
    }

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
    try {
      const price = await getEthPriceCoingecko();
      setEthPrice(price?.market_data?.current_price?.usd || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // We need socket initialization to happens first
    getAuctionData();
    getEthPrice();
  }, [artistUsername, auctionName]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (auction?.auction?.id) {
      return () => {
        unsubscribeFrom({
          auctionId: auction.auction.id,
        });
      };
    }
  }, [auction?.auction?.id]);

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

  const bidsHidden = isBeforeNow(auction?.auction?.endDate);

  return auction ? (
    <div className="auction__landing__page">
      <AuctionDetails
        onAuction={auction}
        bidders={bidders}
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
        setLoadingText={setLoadingText}
        showCancelBidPopup={showCancelBidPopup}
        setShowCancelBidPopup={setShowCancelBidPopup}
        selectedAuctionEnded={selectedAuctionEnded}
        setSelectedAuctionEnded={setSelectedAuctionEnded}
        mySlot={mySlot}
        setMySlot={setMySlot}
        mySlotIndex={mySlotIndex}
        setMySlotIndex={setMySlotIndex}
        slotsToWithdraw={slotsToWithdraw}
        setSlotsToWithdraw={setSlotsToWithdraw}
        claimableFunds={claimableFunds}
        unreleasedFunds={unreleasedFunds}
      />
      <UniverseAuctionDetails auction={auction} />
      <RewardTiers auction={auction} />
      <AuctionOwnerDetails artist={auction.artist} />
      {!bidsHidden && (
        <PlaceBid
          auction={auction}
          bidders={bidders}
          setBidders={setBidders}
          setShowBidPopup={setShowBidPopup}
        />
      )}
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
