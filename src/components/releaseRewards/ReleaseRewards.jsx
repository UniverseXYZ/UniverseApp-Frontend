import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ReleaseRewards.scss';
import { useHistory, useLocation } from 'react-router';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import Button from '../button/Button.jsx';
import nft1 from '../../assets/images/marketplace/nfts/nft4.png';
import arrow from '../../assets/images/arrow.svg';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';
import doneIcon from '../../assets/images/Completed.svg';
import emptyMark from '../../assets/images/emptyMark.svg';
import emptyWhite from '../../assets/images/emptyWhite.svg';
import infoIcon from '../../assets/images/icon.svg';
import CongratsReleaseRewardsPopup from '../popups/CongratsReleaseRewardsPopup';
import { useAuthContext } from '../../contexts/AuthContext';
import { changeAuctionStatus } from '../../utils/api/auctions';
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
  subscribeToBidMatched,
  subscribeToSlotCaptured,
} from '../../utils/websockets/auctionEvents';

const ReleaseRewards = () => {
  const defaultLoadingText = 'The transaction is being processed.';
  const verificationLoadingText =
    'The transaction is being verified. This will take a few seconds.';

  const {
    view,
    auctionData,
    bidders,
    rewardTiersSlots,
    myBid,
    winningSlot,
    slotsInfo,
    backButtonText,
  } = useLocation().state;

  const history = useHistory();
  const { setActiveTxHashes } = useMyNftsContext();

  const [hideInfo, setHideInfo] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const { universeAuctionHouseContract } = useAuthContext();
  const [showSuccesPopup, setShowSuccessPopup] = useState(false);
  const [auction, setAuction] = useState(auctionData);
  const [batchCaptureRevenueTxs, setBatchCaptureRevenueTxs] = useState([]);
  const [singleCaptureRevenueTxs, setSingleCaptureRevenueTxs] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [bids, setBids] = useState(bidders);
  const [loadingText, setLoadingText] = useState(defaultLoadingText);
  const [capturedSlotIndices, setCapturedSlotIndices] = useState([]);

  const setupPage = async () => {
    console.log('Slots info:');
    console.log(slotsInfo);
    let batchCaptureTxs = [];
    if (auction.auction.finalised) {
      batchCaptureTxs = createBatchCaptureRevenueTxsFinalised(rewardTiersSlots, bids, slotsInfo);
    } else {
      batchCaptureTxs = createBatchCaptureRevenueTxsNotFinalised(rewardTiersSlots);
    }
    const singleCaptureTxs = createSingleCaptureRevenueTxs(rewardTiersSlots, bids, slotsInfo);
    console.log(`batchCapture Txs:`);
    console.log(batchCaptureTxs);
    setBatchCaptureRevenueTxs(batchCaptureTxs);

    console.log(`singleCapture Txs:`);
    console.log(singleCaptureTxs);

    setSingleCaptureRevenueTxs(singleCaptureTxs);

    // We need this to track and update UI correctly from captureSlotRevenueRange
    // It handles multiple slots with separate emitted events
    const capturedIdxs = [];
    singleCaptureTxs.forEach((tx) => {
      if (tx.revenueCaptured) {
        capturedIdxs.push(+tx.startSlot);
      }
    });

    setCapturedSlotIndices(capturedIdxs);
  };

  useEffect(() => {
    setupPage();
  }, [universeAuctionHouseContract]);

  const getAuctionSlotsInfo = async () => {
    const onChainAuction = await universeAuctionHouseContract.auctions(auction.auction.onChainId);

    const auctionSlotsInfo = {};
    for (let i = 1; i <= onChainAuction.numberOfSlots; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const slotInfo = await universeAuctionHouseContract.getSlotInfo(auction.auction.onChainId, i);
      console.log(slotInfo);
      auctionSlotsInfo[i] = slotInfo;
    }
    return auctionSlotsInfo;
  };

  useEffect(() => {
    initiateAuctionSocket();
    subscribeToSlotCaptured(auction.auction.id, (err, { tierId, slotIndex }) => {
      if (err) return;
      // Update single capture txs
      let updatedTxs = [];
      setSingleCaptureRevenueTxs((txs) => {
        updatedTxs = [...txs];
        updatedTxs = updatedTxs.map((tx) => {
          if (tx.startSlot.toString() === slotIndex.toString()) {
            const newObj = { ...tx };
            newObj.slotInfo = { ...tx.slotInfo, revenueCaptured: true };
            return newObj;
          }
          return tx;
        });

        return updatedTxs;
      });

      // Update captured slots indices
      let updatedIndices = [];
      setCapturedSlotIndices((indices) => {
        updatedIndices = [...indices];
        updatedIndices.push(slotIndex);
        return updatedIndices;
      });

      let updatedBids = [];
      setBids((upToDate) => {
        updatedBids = upToDate;
        return upToDate;
      });

      const batchCaptureTxs = createBatchCaptureRevenueTxsFinalised(
        rewardTiersSlots,
        updatedBids,
        updatedTxs.map((tx) => tx.slotInfo)
      );

      setBatchCaptureRevenueTxs(batchCaptureTxs);
      setShowLoading(false);
    });

    subscribeToBidMatched(auction.auction.id, async (err, { bids: bidsData, finalised }) => {
      if (err) return;
      setBids(bidsData);
      if (finalised) {
        setAuction((upToDate) => ({ ...upToDate, auction: { ...upToDate.auction, finalised } }));
      }
      const newSlotsInfo = await getAuctionSlotsInfo();
      const newBatchTxs = createBatchCaptureRevenueTxsFinalised(
        rewardTiersSlots,
        bidsData,
        newSlotsInfo
      );
      setBatchCaptureRevenueTxs(newBatchTxs);

      if (finalised) {
        setShowLoading(false);
      }
    });

    return () => {
      disconnectAuctionSocket();
    };
  }, []);

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

  console.log(`auctionData:`);
  console.log(auction);

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
                {showSuccesPopup && auction.auction.finalised ? (
                  <img src={doneIcon} alt="Done" />
                ) : auction.auction.finalised ? (
                  <img src={emptyMark} alt="Empty mark" />
                ) : (
                  <img src={emptyWhite} alt="Empty white" />
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
      <Popup closeOnDocumentClick={false} open={showSuccesPopup}>
        <CongratsReleaseRewardsPopup onClose={() => setShowSuccessPopup(false)} />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showLoading}>
        <LoadingPopup text={loadingText} onClose={() => setShowLoading(false)} />
      </Popup>
    </div>
  );
};

export default ReleaseRewards;
