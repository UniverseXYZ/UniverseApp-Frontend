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
import arrowDown from '../../assets/images/arrow-down.svg';
import warningIcon from '../../assets/images/Exclamation.svg';
import { ReleaseRewardsData, SlotsRewardData } from '../../utils/fixtures/ReleaseRewardsDummyData';
import CongratsReleaseRewardsPopup from '../popups/CongratsReleaseRewardsPopup';
import { useAuthContext } from '../../contexts/AuthContext';
import { changeAuctionStatus } from '../../utils/api/auctions';
import { createCaptureRevenueTxs } from '../../utils/auctionCaptureRevenue';

const ReleaseRewards = () => {
  const history = useHistory();
  const location = useLocation();
  const [slotData, setSlotData] = useState([...SlotsRewardData]);
  const [hideInfo, setHideInfo] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  // const view = 'Auctioneer';
  const { view } = location.state;
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
  const { auctionData } = useLocation().state;
  const { universeAuctionHouseContract } = useAuthContext();
  const [data, setData] = useState([...ReleaseRewardsData]);
  const [showSuccesPopup, setShowSuccessPopup] = useState(false);
  const [auction, setAuction] = useState(auctionData);
  const [captureRevenueTxs, setCaptureRevenueTxs] = useState([]);
  const [isBatchView, setIsBatchView] = useState(true);
  const [auctionSlots, setAuctionSlots] = useState(0);
  const [capturedSlots, setCapturedSlots] = useState([]);

  const setupPage = async () => {
    if (universeAuctionHouseContract) {
      // TODO: query smart contract to check for captured slots
      const onChainAuction = await universeAuctionHouseContract.auctions(
        auctionData.auction.onChainId
      );
      const captureTxs = createCaptureRevenueTxs(auctionData.rewardTiers);
      console.log(`capture Txs:`);
      console.log(captureTxs);
      setCaptureRevenueTxs(captureTxs);
    }
  };

  useEffect(() => {
    setupPage();
  }, [universeAuctionHouseContract]);

  const handleCaptureRevenue = async (id) => {
    const captureConfig = captureRevenueTxs[id];
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
    setSlotData(newSlotData);
    if (slotData.filter((slot) => slot.completed === true).length === slotData.length) {
      setShowSuccessPopup(true);
    }
  };

  const handleShowNFTs = (id) => {
    const newSlotData = [...slotData];
    newSlotData.forEach((slot) => {
      if (slot.id === id) {
        slot.open = !slot.open;
      }
    });
    setSlotData(newSlotData);
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
              {!showSlots &&
                view === 'Auctioneer' &&
                data.map((transaction) => (
                  <div className="transaction">
                    <div className="transaction__header">
                      <h3>{transaction.name}</h3>
                      <div className="transaction__proceed">
                        <p className="total">
                          Total NFTs: <b>{transaction.totalNFTs}</b>
                        </p>
                        {transaction.completed ? (
                          <Button className="light-border-button" disabled>
                            Completed <img src={completedCheckmark} alt="completed" />
                          </Button>
                        ) : (
                          <Button
                            className="light-button"
                            disabled={!auctionProceed}
                            onClick={() => handleComplete(transaction.id)}
                          >
                            Proceed
                          </Button>
                        )}
                      </div>
                    </div>
                    {transaction.tiers.map((tier) => (
                      <div className="transaction__tier">
                        <div className="tier__head">
                          <h4>{tier.type}</h4>
                          <p>
                            Slots: <b>{tier.slots}</b>
                          </p>
                          <p>
                            NFTs: <b>{tier.nftQuantity}</b>
                          </p>
                        </div>
                        <div className="tier__body">
                          {tier.nfts.map((nft) => (
                            <div className="tier__nft__box">
                              <img src={nft.image} alt="NFT" />
                              <div className="tier__nft__box__highlight__one" />
                              <div className="tier__nft__box__highlight__two" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="proceed__button__mobile">
                      {transaction.completed ? (
                        <Button className="light-border-button" disabled>
                          Completed <img src={completedCheckmark} alt="completed" />
                        </Button>
                      ) : (
                        <Button
                          className="light-button"
                          disabled={!auction.auction.finalised}
                          onClick={() => handleCaptureRevenue(index)}
                        >
                          Capture Revenue
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              {view === 'Bidders' && (
                <>
                  {showSlots && <h3>Your slot</h3>}
                  <div className="slots__list">
                    <div className="slot">
                      <div className="slot__content">
                        <div className="slot__left__part">
                          <div
                            className="dropdown"
                            aria-hidden="true"
                            onClick={() => handleShowMyNFTs()}
                          >
                            <img src={arrowDown} alt="Arrow" />
                          </div>
                          <span>{yourSlot.number}.</span>
                          <p>{yourSlot.name}</p>
                          <div className={`slot__type ${yourSlot.type}`}>{yourSlot.type}</div>
                        </div>
                        <div className="slot__right__part">
                          <p>
                            NFTs: <b>{yourSlot.nftsQuantity}</b>
                          </p>

                          {yourSlot.completed ? (
                            <Button className="light-border-button" disabled>
                              Completed <img src={completedCheckmark} alt="completed" />
                            </Button>
                          ) : (
                            <Button
                              className="light-button"
                              disabled={!auctionProceed}
                              onClick={() => handleMySlotComplete()}
                            >
                              Proceed
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="slot__content__mobile">
                        <div className="slot__first__part">
                          <div className="main">
                            <span>{yourSlot.number}.</span>
                            <p>{yourSlot.name}</p>
                            <div className={`slot__type ${yourSlot.type}`}>{yourSlot.type}</div>
                          </div>
                          <p>
                            NFTs: <b>{yourSlot.nftsQuantity}</b>
                          </p>
                        </div>
                        <div className="slot__second__part">
                          <div
                            className="dropdown"
                            aria-hidden="true"
                            onClick={() => handleShowMyNFTs()}
                          >
                            <img src={arrowDown} alt="Arrow" />
                          </div>

                          {yourSlot.completed ? (
                            <Button className="light-border-button" disabled>
                              Completed <img src={completedCheckmark} alt="completed" />
                            </Button>
                          ) : (
                            <Button
                              className="light-button"
                              disabled={!auctionProceed}
                              onClick={() => handleMySlotComplete()}
                            >
                              Proceed
                            </Button>
                          )}
                        </div>
                      </div>
                      {yourSlot.open && (
                        <div className="slot__body">
                          {yourSlot.nfts.map((nft) => (
                            <div className="slot__nft__box">
                              <img src={nft.image} alt="NFT" />
                              {nft.editions > 1 && (
                                <>
                                  <div className="slot__nft__box__highlight__one" />
                                  <div className="slot__nft__box__highlight__two" />
                                  <div className="editions__number">{nft.editions}</div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {showSlots && (
                    <>
                      <h3 style={{ marginTop: '40px' }}>Other slots</h3>
                      <div className="warning-div">
                        <img src={warningIcon} alt="Icon" />
                        <p>You don’t need to proceed with the other slots to claim your NFTs. </p>
                      </div>
                    </>
                  )}
                </>
              )}
              {showSlots && (
                <div className="slots__list">
                  {slotData.map((slot) => (
                    <div className="slot">
                      <div className="slot__content">
                        <div className="slot__left__part">
                          <div
                            className="dropdown"
                            aria-hidden="true"
                            onClick={() => handleShowNFTs(slot.id)}
                          >
                            <img
                              src={arrowDown}
                              alt="Arrow"
                              style={
                                slot.open
                                  ? { transform: 'rotate(180deg)' }
                                  : { transform: 'rotate(0deg)' }
                              }
                            />
                          </div>
                          <span>{slot.number}.</span>
                          <p>{slot.name}</p>
                          <div className={`slot__type ${slot.type}`}>{slot.type}</div>
                        </div>
                        <div className="slot__right__part">
                          <p>
                            NFTs: <b>{slot.nftsQuantity}</b>
                          </p>
                          {slot.completed ? (
                            <Button className="light-border-button" disabled>
                              Completed <img src={completedCheckmark} alt="completed" />
                            </Button>
                          ) : (
                            <Button
                              className={
                                view === 'Auctioneer' ? 'light-button' : 'light-border-button'
                              }
                              onClick={() => handleSlotComplete(slot.id)}
                              disabled={!auctionProceed}
                            >
                              Proceed
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="slot__content__mobile">
                        <div className="slot__first__part">
                          <div className="main">
                            <span>{slot.number}.</span>
                            <p>{slot.name}</p>
                            <div className={`slot__type ${slot.type}`}>{slot.type}</div>
                          </div>
                          <p>
                            NFTs: <b>{slot.nftsQuantity}</b>
                          </p>
                        </div>
                        <div className="slot__second__part">
                          <div
                            className="dropdown"
                            aria-hidden="true"
                            onClick={() => handleShowNFTs(slot.id)}
                          >
                            <img src={arrowDown} alt="Arrow" />
                          </div>
                          {slot.completed ? (
                            <Button className="light-border-button" disabled>
                              Completed <img src={completedCheckmark} alt="completed" />
                            </Button>
                          ) : (
                            <Button
                              className="light-button"
                              onClick={() => handleSlotComplete(slot.id)}
                              disabled={!auctionProceed}
                            >
                              Proceed
                            </Button>
                          )}
                        </div>
                      </div>
                      {slot.open && (
                        <div className="slot__body">
                          {slot.nfts.map((nft) => (
                            <div className="slot__nft__box">
                              <img src={nft.image} alt="NFT" />
                              {nft.editions > 1 && (
                                <>
                                  <div className="slot__nft__box__highlight__one" />
                                  <div className="slot__nft__box__highlight__two" />
                                  <div className="editions__number">{nft.editions}</div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="proceed__button__mobile">
                    {transaction.completed ? (
                      <Button className="light-border-button" disabled>
                        Completed <img src={completedCheckmark} alt="completed" />
                      </Button>
                    ) : (
                      <Button className="light-button" disabled={!auction.auction.finalised}>
                        Capture Revenue
                      </Button>
                    )}
                  </div>
                </div>
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
