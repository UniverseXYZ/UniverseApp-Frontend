import React, { useState, useEffect } from 'react';
import './ReleaseRewards.scss';
import { useHistory, useLocation } from 'react-router';
import Popup from 'reactjs-popup';
import { utils, BigNumber } from 'ethers';
import Button from '../button/Button.jsx';
import arrow from '../../assets/images/arrow.svg';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';
import doneIcon from '../../assets/images/Completed.svg';
import emptyMark from '../../assets/images/emptyMark.svg';
import infoIcon from '../../assets/images/icon.svg';
import CongratsReleaseRewardsPopup from '../popups/CongratsReleaseRewardsPopup';
import { useAuthContext } from '../../contexts/AuthContext';
import {
  createBatchCaptureRevenueTxsFinalised,
  createBatchCaptureRevenueTxsNotFinalised,
  createSingleCaptureRevenueTxs,
} from '../../utils/auctionCaptureRevenue';
import AuctioneerView from './AuctioneerView';
import BidderView from './BidderView';
import LoadingPopup from '../popups/LoadingPopup';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import {
  disconnectAuctionSocket,
  initiateAuctionSocket,
  subscribeToAuctionFinalised,
  subscribeToBidMatched,
  subscribeToSlotCaptured,
  subscribeToERC721Claimed,
  removeAllListeners,
} from '../../utils/websockets/auctionEvents';

const ReleaseRewards = () => {
  const defaultLoadingText = 'The transaction is being processed.';
  const verificationLoadingText =
    'The transaction is being verified. This will take a few seconds.';

  const { view, auctionData, bidders, rewardTiersSlots, myBid, winningSlot, backButtonText } =
    useLocation().state;

  const history = useHistory();
  const { setActiveTxHashes } = useMyNftsContext();

  const [hideInfo, setHideInfo] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const { universeAuctionHouseContract, address, auctionSDK } = useAuthContext();
  const [showCongratsPopup, setShowCongratsPopup] = useState(false);
  const [auction, setAuction] = useState(auctionData);
  const [batchCaptureRevenueTxs, setBatchCaptureRevenueTxs] = useState([]);
  const [singleCaptureRevenueTxs, setSingleCaptureRevenueTxs] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [bids, setBids] = useState(bidders);
  const [loadingText, setLoadingText] = useState(defaultLoadingText);
  const [mySlot, setMySlot] = useState(null);
  const [mySlotIndex, setMySlotIndex] = useState(-1);
  const [slotsInfo, setSlotsInfo] = useState({});

  const setupPage = async (slotsData) => {
    let batchCaptureTxs = [];
    if (auction.auction.finalised) {
      batchCaptureTxs = createBatchCaptureRevenueTxsFinalised(rewardTiersSlots, bids, slotsData);
    } else {
      batchCaptureTxs = createBatchCaptureRevenueTxsNotFinalised(rewardTiersSlots);
    }
    const singleCaptureTxs = createSingleCaptureRevenueTxs(rewardTiersSlots, bids, slotsData);
    setBatchCaptureRevenueTxs(batchCaptureTxs);
    setSingleCaptureRevenueTxs(singleCaptureTxs);
  };

  const handleSlotCapturedEvent = async (err, { sender, slotIndex }) => {
    if (err) return;

    let updatedBids = [];
    setBids((upToDate) => {
      updatedBids = upToDate;
      return upToDate;
    });

    const newSlotsInfo = await auctionSDK.getAuctionSlotsInfo(auction?.auction?.onChainId);
    const newSingleTxs = createSingleCaptureRevenueTxs(rewardTiersSlots, updatedBids, newSlotsInfo);

    const newBatchTxs = createBatchCaptureRevenueTxsFinalised(
      rewardTiersSlots,
      updatedBids,
      newSlotsInfo
    );

    setBatchCaptureRevenueTxs(newBatchTxs);
    setSingleCaptureRevenueTxs(newSingleTxs);

    const bidderAddress = newSlotsInfo[slotIndex].winner || '';

    const isYourEvent = bidderAddress.toLowerCase() === address.toLowerCase();
    const isYourTransaction = sender.toLowerCase() === address.toLowerCase();

    if (isYourTransaction) {
      // Hide Loading modal
      setShowLoading(false);
    }

    if (isYourEvent) {
      // Show Congrats modal
      setShowCongratsPopup(true);
    }
  };

  const handleBidMatchedEvent = async (err, { bids: bidsData, finalised }) => {
    if (err) return;
    setBids(bidsData);
    if (finalised) {
      setAuction((upToDate) => ({ ...upToDate, auction: { ...upToDate.auction, finalised } }));
    }
    const newSlotsInfo = await auctionSDK.getAuctionSlotsInfo(auction?.auction?.onChainId);
    const newBatchTxs = createBatchCaptureRevenueTxsFinalised(
      rewardTiersSlots,
      bidsData,
      newSlotsInfo
    );
    setBatchCaptureRevenueTxs(newBatchTxs);
  };

  const handleERC721ClaimedEvent = (err, { claimer, slotIndex }) => {
    const isYourEvent = claimer.toLowerCase() === address.toLowerCase();

    if (isYourEvent) {
      setMySlot({ ...mySlot, totalWithdrawnNfts: mySlot.totalDepositedNfts });
      setShowLoading(false);
      setActiveTxHashes([]);
    }
  };

  const handleCaptureRevenue = async (captureConfig, configIndex, singleSlot) => {
    try {
      let tx = null;
      if (captureConfig.startSlot === captureConfig.endSlot) {
        tx = await universeAuctionHouseContract.captureSlotRevenue(
          auction.auction.onChainId,
          captureConfig.startSlot
        );
      } else {
        tx = await universeAuctionHouseContract.captureSlotRevenueRange(
          auction.auction.onChainId,
          captureConfig.startSlot,
          captureConfig.endSlot
        );
      }
      setLoadingText(defaultLoadingText);
      setShowLoading(true);
      setActiveTxHashes([tx.hash]);
      const txReceipt = await tx.wait();

      if (txReceipt.status === 1) {
        setLoadingText(verificationLoadingText);
      }
    } catch (err) {
      setActiveTxHashes([]);
      setShowLoading(false);
      console.log(err);
    }
  };

  const handleFinaliseAuction = async () => {
    try {
      const tx = await universeAuctionHouseContract.finalizeAuction(auction.auction.onChainId);
      setLoadingText(defaultLoadingText);
      setShowLoading(true);
      setActiveTxHashes([tx.hash]);
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        setLoadingText(verificationLoadingText);
      }
    } catch (err) {
      setActiveTxHashes([]);
      setShowLoading(false);
      console.log(err);
    }
  };

  /**
   * Upon Claim NFTs Button click, this method will kick in a SC transaction
   */
  const handleClaimNfts = async () => {
    try {
      setShowCongratsPopup(false);
      setLoadingText(defaultLoadingText);
      setShowLoading(true);
      const tx = await auctionSDK.handleClaimNfts({
        auctionChainId: auction.auction.onChainId,
        slotIndex: +mySlotIndex,
        amount: mySlot.totalDepositedNfts,
      });
      setActiveTxHashes([tx.hash]);
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        setLoadingText(verificationLoadingText);
        // This modal will be closed upon recieving notifyERC721Claimed event
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);
    }
  };

  /**
   * Initialise and Attach Socket events
   */
  useEffect(async () => {
    initiateAuctionSocket();
  }, []);

  useEffect(async () => {
    if (auctionSDK && auction?.auction?.onChainId) {
      const info = await auctionSDK.getAuctionSlotsInfo(auction?.auction?.onChainId);
      setSlotsInfo(info);
      setupPage(info);

      removeAllListeners(auction.auction.id);
      subscribeToSlotCaptured(auction.auction.id, handleSlotCapturedEvent);
      subscribeToBidMatched(auction.auction.id, handleBidMatchedEvent);
      subscribeToERC721Claimed(auction.auction.id, handleERC721ClaimedEvent);

      subscribeToAuctionFinalised(auction.auction.id, async (err) => {
        if (err) return;
        setAuction((upToDate) => ({
          ...upToDate,
          auction: { ...upToDate.auction, finalised: true },
        }));

        setShowLoading(false);
      });
    }

    return () => {
      removeAllListeners(auction.auction.id);
      disconnectAuctionSocket();
    };
  }, [auctionSDK, auction?.auction?.onChainId]);

  useEffect(async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [slotIndex, slotInfo] of Object.entries(slotsInfo)) {
      if (slotInfo.winner === utils.getAddress(address)) {
        setMySlot(slotInfo);
        setMySlotIndex(slotIndex);
        break;
      }
    }
  }, [slotsInfo]);

  return (
    <div className="release__rewards">
      <div className="release container">
        <div
          className="back-rew"
          aria-hidden="true"
          onClick={() => {
            history.goBack();
          }}
        >
          <img src={arrow} alt="back" />
          <span>{backButtonText}</span>
          <h1 className="set-text">Release rewards</h1>
        </div>
        <p className="description">
          Without this step, the auctioneer will not be able to collect his winnings and the bidders
          will not be able to claim their NFTs
        </p>
        <div className="release__rewards__body">
          <div className="release__finalize__auction">
            <div className="step">
              <div className="circle">
                {auction.auction.finalised ? (
                  <img src={doneIcon} alt="Done" />
                ) : (
                  <img src={emptyMark} alt="Empty mark" />
                )}
              </div>
              <div className={`line ${auction.auction.finalised ? 'colored' : ''}`} />
            </div>
            <div className="release__auction__body">
              <h2>Finalize auction</h2>
              <p className="auction__description">
                This function will check which slots have been won, assign the winners and the bid
                ammounts
              </p>
              <div className="proceed__button">
                {auction.auction.finalised ? (
                  <Button className="light-border-button" disabled>
                    Completed <img src={completedCheckmark} alt="completed" />
                  </Button>
                ) : (
                  <Button className="light-button" onClick={handleFinaliseAuction}>
                    Proceed
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="release__finalize__auction">
            <div className="step">
              <div className="circle">
                {!auction.auction.finalised || batchCaptureRevenueTxs.length ? (
                  <img src={emptyMark} alt="Empty mark" />
                ) : (
                  <img src={doneIcon} alt="Done" />
                )}
              </div>
            </div>
            <div className="release__auction__body">
              <div className="capture__slot__revenue">
                <h2>Capture slot revenue</h2>
                <div
                  className="show__all__slots"
                  onMouseEnter={() => setHideInfo(true)}
                  onMouseLeave={() => setHideInfo(false)}
                >
                  <p>Show all slots</p>
                  <img src={infoIcon} alt="Info" />
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={showSlots}
                      onChange={(e) => setShowSlots(e.target.checked)}
                    />
                    <span className="slider round" />
                  </label>
                  {hideInfo && (
                    <div className="info-text">
                      <p>
                        Use this toggle if you want to pay gas fees for the specific user separately
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <p className="auction__description">
                Once the auction is finalized, the revenue for each slot should be captured.
              </p>
              {view === 'Auctioneer' ? (
                <AuctioneerView
                  auctionData={auction}
                  showSlots={showSlots}
                  batchCaptureRevenueTxs={batchCaptureRevenueTxs}
                  singleCaptureRevenueTxs={singleCaptureRevenueTxs}
                  handleCaptureRevenue={handleCaptureRevenue}
                  rewardTiersSlots={rewardTiersSlots}
                />
              ) : (
                <BidderView
                  auctionData={auction}
                  showSlots={showSlots}
                  singleCaptureRevenueTxs={singleCaptureRevenueTxs}
                  handleCaptureRevenue={handleCaptureRevenue}
                  winningSlot={winningSlot}
                  myBid={myBid}
                  rewardTiersSlots={rewardTiersSlots}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Popup closeOnDocumentClick={false} open={showCongratsPopup}>
        <CongratsReleaseRewardsPopup
          onClose={() => setShowCongratsPopup(false)}
          auctionName={auction?.auction?.name}
          isAuctioneer={view === 'Auctioneer'}
          handleClaimNfts={handleClaimNfts}
        />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showLoading}>
        <LoadingPopup text={loadingText} onClose={() => setShowLoading(false)} />
      </Popup>
    </div>
  );
};

export default ReleaseRewards;
