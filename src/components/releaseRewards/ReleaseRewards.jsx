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
import { ReleaseRewardsData, SlotsRewardData } from '../../utils/fixtures/ReleaseRewardsDummyData';
import CongratsReleaseRewardsPopup from '../popups/CongratsReleaseRewardsPopup';
import { useAuthContext } from '../../contexts/AuthContext';
import { changeAuctionStatus } from '../../utils/api/auctions';
import {
  createBatchCaptureRevenueTxs,
  createSingleCaptureRevenueTxs,
} from '../../utils/auctionCaptureRevenue';
import AuctioneerView from './AuctioneerView';
import BidderView from './BidderView';

const ReleaseRewards = () => {
  const history = useHistory();
  const [slotData, setSlotData] = useState([...SlotsRewardData]);
  const [hideInfo, setHideInfo] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  // const view = 'Auctioneer';
  const { view, auctionData, bidders, rewardTiersSlots, myBid, winningSlot } = useLocation().state;

  const [yourSlot, setYourSlot] = useState({
    number: 3,
    name: '0x2ef8...0d8c',
    type: 'platinum',
    nftsQuantity: 4,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft1,
        editions: 2,
      },
      {
        id: uuid(),
        image: nft1,
        editions: 1,
      },
      {
        id: uuid(),
        image: nft1,
        editions: 1,
      },
    ],
  });

  const [auctionProceed, setAuctionProceed] = useState(false);
  const { universeAuctionHouseContract } = useAuthContext();
  const [data, setData] = useState([...ReleaseRewardsData]);
  const [showSuccesPopup, setShowSuccessPopup] = useState(false);
  const [auction, setAuction] = useState(auctionData);
  const [batchCaptureRevenueTxs, setBatchCaptureRevenueTxs] = useState([]);
  const [singleCaptureRevenueTxs, setSingleCaptureRevenueTxs] = useState([]);
  const [auctionSlots, setAuctionSlots] = useState(0);
  const [capturedSlots, setCapturedSlots] = useState([]);

  const setupPage = async () => {
    if (universeAuctionHouseContract) {
      // TODO: query smart contract to check for captured slots
      const onChainAuction = await universeAuctionHouseContract.auctions(
        auctionData.auction.onChainId
      );

      // TODO: We need to add bool if slot is captured in the algorithm
      const batchCaptureTxs = createBatchCaptureRevenueTxs(auctionData.rewardTiers);
      const singleCaptureTxs = createSingleCaptureRevenueTxs(rewardTiersSlots, bidders);
      console.log(`batchCapture Txs:`);
      console.log(batchCaptureTxs);
      setBatchCaptureRevenueTxs(batchCaptureTxs);

      console.log(`singleCapture Txs:`);
      console.log(singleCaptureTxs);

      setSingleCaptureRevenueTxs(singleCaptureTxs);
    }
  };

  useEffect(() => {
    setupPage();
  }, [universeAuctionHouseContract]);

  const handleCaptureRevenue = async (id) => {
    const captureConfig = batchCaptureRevenueTxs[id];
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

    const txReceipt = await tx.wait();

    if (txReceipt.status === 1) {
      console.log('success');
    }
  };

  console.log(`auctionData:`);
  console.log(auction);
  const handleFinaliseAuction = async () => {
    try {
      const tx = await universeAuctionHouseContract.finalizeAuction(auction.auction.onChainId);
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        const auctionClone = { ...auction };
        auctionClone.auction.finalised = true;
        setAuction(auctionClone);
        const result = await changeAuctionStatus({
          auctionId: auction.auction.id,
          statuses: [
            {
              name: 'finalised',
              value: true,
            },
          ],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSlotComplete = (id) => {
    const newSlotData = [...slotData];
    newSlotData.forEach((slot) => {
      if (slot.id === id) {
        slot.completed = true;
      }
    });
    setSlotData(newSlotData);
    if (slotData.filter((slot) => slot.completed === true).length === slotData.length) {
      setShowSuccessPopup(true);
    }
  };

  const handleMySlotComplete = () => {
    setYourSlot((prevYourSlot) => ({ ...prevYourSlot, completed: true }));
    setShowSuccessPopup(true);
  };

  const handleShowMyNFTs = () => {
    setYourSlot((prevYourSlot) => ({ ...prevYourSlot, open: !prevYourSlot.open }));
  };

  return (
    <div className="release__rewards">
      <div className="release container">
        <div
          className="back-rew"
          aria-hidden="true"
          onClick={() => {
            history.push(`./${auction.artist.displayName}/${auction.auction.link}`, {
              auction,
            });
          }}
        >
          <img src={arrow} alt="back" />
          <span>{auction?.auction?.headline}</span>
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
                  auctionData={auctionData}
                  showSlots={showSlots}
                  batchCaptureRevenueTxs={batchCaptureRevenueTxs}
                  singleCaptureRevenueTxs={singleCaptureRevenueTxs}
                  handleCaptureRevenue={handleCaptureRevenue}
                  rewardTiersSlots={rewardTiersSlots}
                />
              ) : (
                <BidderView
                  auctionData={auctionData}
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
    </div>
  );
};

export default ReleaseRewards;
