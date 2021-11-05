import React from 'react';
import PropTypes from 'prop-types';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import { getRewardTierSpanStyles } from '../../utils/helpers';
import Button from '../button/Button';

const SingleCaptureRevenueTxs = ({
  openSlots,
  handleShowSlotNfts,
  auction,
  singleCaptureRevenueTxs,
  handleCaptureRevenue,
  rewardTiersSlots,
}) => (
  <div className="slots__list">
    {singleCaptureRevenueTxs.length &&
      singleCaptureRevenueTxs.map((tx, txIndex) => (
        <div className="slot">
          <div className="slot__content">
            <div className="slot__left__part">
              <div
                className="dropdown"
                aria-hidden="true"
                onClick={() => handleShowSlotNfts(txIndex)}
              >
                <img
                  src={arrowDown}
                  alt="Arrow"
                  style={
                    openSlots.indexOf(txIndex) >= 0
                      ? {
                          transform: 'rotate(180deg)',
                        }
                      : {
                          transform: 'rotate(0deg)',
                        }
                  }
                />
              </div>
              <span>{txIndex + 1}.</span>
              <p>{tx.bidder.user.displayName || tx.bidder.user.address}</p>
              <div
                style={getRewardTierSpanStyles(rewardTiersSlots[txIndex])}
                className="slot__type"
              >
                {rewardTiersSlots[txIndex].name}
              </div>
            </div>
            <div className="slot__right__part">
              <p>
                NFTs: <b>{tx.slotInfo.totalDepositedNfts.toNumber()}</b>
              </p>
              {tx.slotInfo.revenueCaptured ? (
                <Button className="light-border-button" disabled>
                  Completed <img src={completedCheckmark} alt="completed" />
                </Button>
              ) : (
                <Button
                  className="light-button"
                  onClick={() => handleCaptureRevenue(tx, txIndex, true)}
                  disabled={!auction.finalised}
                >
                  Proceed
                </Button>
              )}
            </div>
          </div>
          <div className="slot__content__mobile">
            <div className="slot__first__part">
              <div className="main">
                <span>{txIndex + 1}.</span>
                <p>{tx.bidder.user.displayName || tx.bidder.user.address}</p>
                <div className={`slot__type ${tx.type}`}>{tx.type}</div>
              </div>
              <p>
                NFTs: <b>{tx.tier.nfts.length}</b>
              </p>
            </div>
            <div className="slot__second__part">
              <div
                className="dropdown"
                aria-hidden="true"
                onClick={() => handleShowSlotNfts(txIndex)}
              >
                <img src={arrowDown} alt="Arrow" />
              </div>
              {tx.slotInfo.revenueCaptured ? (
                <Button className="light-border-button" disabled>
                  Completed <img src={completedCheckmark} alt="completed" />
                </Button>
              ) : (
                <Button
                  className="light-button"
                  onClick={() => handleCaptureRevenue(tx, txIndex, true)}
                  disabled={!auction.finalised}
                >
                  Proceed
                </Button>
              )}
            </div>
          </div>
          {openSlots.indexOf(txIndex) >= 0 && (
            <div className="slot__body">
              {tx.tier.nfts.map((nft) => (
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
      ))}
  </div>
);
SingleCaptureRevenueTxs.propTypes = {
  openSlots: PropTypes.func.isRequired,
  handleShowSlotNfts: PropTypes.func.isRequired,
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  singleCaptureRevenueTxs: PropTypes.oneOfType([PropTypes.array]).isRequired,
  handleCaptureRevenue: PropTypes.func.isRequired,
  rewardTiersSlots: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
export default SingleCaptureRevenueTxs;
