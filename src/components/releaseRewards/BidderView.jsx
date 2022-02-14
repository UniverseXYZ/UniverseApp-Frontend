import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';
import { getRewardTierSpanStyles } from '../../utils/helpers';
import arrowDown from '../../assets/images/arrow-down.svg';
import warningIcon from '../../assets/images/Exclamation.svg';

const BidderView = ({
  auctionData,
  showSlots,
  singleCaptureRevenueTxs,
  handleCaptureRevenue,
  winningSlot,
  myBid,
  rewardTierSlots,
}) => (
  <>
    {showSlots && <h3>Your slot</h3>}
    <div className="slots__list">
      <div className="slot">
        <div className="slot__content">
          <div className="slot__left__part">
            <div className="dropdown" aria-hidden="true" onClick={() => handleShowMyNFTs()}>
              <img src={arrowDown} alt="Arrow" />
            </div>
            <span>1.</span>
            <p>{winningSlot.name}</p>
            <div style={getRewardTierSpanStyles(winningSlot)} className="slot__type">
              {winningSlot.name}
            </div>
          </div>
          <div className="slot__right__part">
            <p>
              NFTs: <b>{winningSlot.nftsQuantity}</b>
            </p>

            {winningSlot.completed ? (
              <Button className="light-border-button" disabled>
                Completed <img src={completedCheckmark} alt="completed" />
              </Button>
            ) : (
              <Button
                className="light-button"
                disabled={!auctionData.auction.finalised}
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
            <div className="dropdown" aria-hidden="true" onClick={handleShowMyNFTs}>
              <img src={arrowDown} alt="Arrow" />
            </div>

            {winningSlot.completed ? (
              <Button className="light-border-button" disabled>
                Completed <img src={completedCheckmark} alt="completed" />
              </Button>
            ) : (
              <Button className="light-button" onClick={() => handleCaptureRevenue()}>
                Proceed
              </Button>
            )}
          </div>
        </div>
        {winningSlot.open && (
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
);
BidderView.propTypes = {
  showSlots: PropTypes.func.isRequired,
  singleCaptureRevenueTxs: PropTypes.oneOfType([PropTypes.array]).isRequired,
  handleCaptureRevenue: PropTypes.func.isRequired,
  winningSlot: PropTypes.PropTypes.oneOfType([PropTypes.object]).isRequired,
  myBid: PropTypes.PropTypes.oneOfType([PropTypes.object]).isRequired,
  auctionData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  rewardTierSlots: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default BidderView;
