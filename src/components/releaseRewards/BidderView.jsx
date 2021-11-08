import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';
import { getRewardTierSpanStyles } from '../../utils/helpers';
import arrowDown from '../../assets/images/arrow-down.svg';
import warningIcon from '../../assets/images/Exclamation.svg';
import SingleCaptureRevenueTxs from './SingleCaptureRevenueTxs';

const BidderView = ({
  auctionData,
  showSlots,
  singleCaptureRevenueTxs,
  handleCaptureRevenue,
  winningSlot,
  myBid,
  rewardTiersSlots,
}) => {
  const [openSlots, setOpenSlots] = useState([]);

  const handleShowSlotNfts = (id) => {
    const newOpenSlots = [...openSlots];
    const slotIndex = newOpenSlots.indexOf(id);
    if (slotIndex >= 0) {
      newOpenSlots.splice(slotIndex, 1);
    } else {
      newOpenSlots.push(id);
    }

    setOpenSlots(newOpenSlots);
  };
  const myTxIndex = singleCaptureRevenueTxs
    .map((tx) => tx.bidder?.user?.address)
    .indexOf(myBid.user.address);
  const myTx = singleCaptureRevenueTxs[myTxIndex];
  console.log('My tx:');
  console.log(myTx);
  return (
    <>
      {!showSlots && <h3>Your slot</h3>}
      {!showSlots && myTx && (
        <div className="slots__list">
          <div className="slot">
            <div className="slot__content">
              <div className="slot__left__part">
                <div
                  className="dropdown"
                  aria-hidden="true"
                  onClick={() => handleShowSlotNfts(myTxIndex)}
                >
                  <img src={arrowDown} alt="Arrow" />
                </div>
                <span>1.</span>
                <p>{myTx.bidder?.user?.displayName || myTx?.bidder?.user?.address}</p>
                <div style={getRewardTierSpanStyles(winningSlot)} className="slot__type">
                  {winningSlot.name}
                </div>
              </div>
              <div className="slot__right__part">
                <p>
                  NFTs:{' '}
                  <b>
                    {myTx?.slotInfo?.totalDepositedNfts
                      ? myTx.slotInfo.totalDepositedNfts.toNumber()
                      : 0}
                  </b>
                </p>

                {myTx.slotInfo?.revenueCaptured ? (
                  <Button className="light-border-button" disabled>
                    Completed <img src={completedCheckmark} alt="completed" />
                  </Button>
                ) : (
                  <Button
                    className="light-button"
                    disabled={!auctionData.auction.finalised}
                    onClick={() => handleCaptureRevenue(myTx, myTxIndex, true)}
                  >
                    Proceed
                  </Button>
                )}
              </div>
            </div>
            <div className="slot__content__mobile">
              <div className="slot__first__part">
                <div className="main">
                  <span>1.</span>
                  <p>{myBid.user.displayName || myBid.user.address}</p>
                  <div style={getRewardTierSpanStyles(winningSlot)} className="slot__type">
                    {winningSlot.name}
                  </div>
                </div>
                <p>
                  NFTs: <b>{winningSlot.nfts.length}</b>
                </p>
              </div>
              <div className="slot__second__part">
                <div
                  className="dropdown"
                  aria-hidden="true"
                  onClick={() => handleShowSlotNfts(myTxIndex)}
                >
                  <img src={arrowDown} alt="Arrow" />
                </div>

                {myTx.slotInfo?.revenueCaptured ? (
                  <Button className="light-border-button" disabled>
                    Completed <img src={completedCheckmark} alt="completed" />
                  </Button>
                ) : (
                  <Button
                    className="light-button"
                    onClick={() => handleCaptureRevenue(myTx, myTxIndex, true)}
                  >
                    Proceed
                  </Button>
                )}
              </div>
            </div>
            {openSlots.indexOf(myTxIndex) >= 0 && (
              <div className="slot__body">
                {winningSlot.nfts.map((nft) => (
                  <div className="slot__nft__box">
                    <img src={nft.optimized_url} alt="NFT" />
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
      )}
      {showSlots && (
        <SingleCaptureRevenueTxs
          openSlots={openSlots}
          handleShowSlotNfts={handleShowSlotNfts}
          auction={auctionData.auction}
          singleCaptureRevenueTxs={singleCaptureRevenueTxs}
          handleCaptureRevenue={handleCaptureRevenue}
          rewardTiersSlots={rewardTiersSlots}
        />
      )}
    </>
  );
};
BidderView.propTypes = {
  showSlots: PropTypes.func.isRequired,
  singleCaptureRevenueTxs: PropTypes.oneOfType([PropTypes.array]).isRequired,
  handleCaptureRevenue: PropTypes.func.isRequired,
  winningSlot: PropTypes.PropTypes.oneOfType([PropTypes.object]).isRequired,
  myBid: PropTypes.PropTypes.oneOfType([PropTypes.object]).isRequired,
  auctionData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  rewardTiersSlots: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default BidderView;
