import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import arrowDown from '../../assets/images/arrow-down.svg';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';
import { getRewardTierSpanStyles } from '../../utils/helpers';

const AuctioneerView = ({
  auctionData,
  showSlots,
  batchCaptureRevenueTxs,
  singleCaptureRevenueTxs,
  handleCaptureRevenue,
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

  return !showSlots ? (
    batchCaptureRevenueTxs.map((transaction, txIndex) => (
      <div className="transaction">
        <div className="transaction__header">
          <h3>Transaction {txIndex + 1}</h3>
          <div className="transaction__proceed">
            <p className="total">
              Total NFTs: <b>{transaction.totalNfts}</b>
            </p>
            {transaction.completed ? (
              <Button className="light-border-button" disabled>
                Completed <img src={completedCheckmark} alt="completed" />
              </Button>
            ) : (
              <Button className="light-button" onClick={() => handleCaptureRevenue(txIndex)}>
                Proceed
              </Button>
            )}
          </div>
        </div>
        {transaction.tiers.map((tier) => (
          <div className="transaction__tier">
            <div className="tier__head">
              <h4>{tier.name}</h4>
              <p>
                Slots: <b>{tier.numberOfWinners}</b>
              </p>
              <p>
                NFTs: <b>{tier.nfts.length}</b>
              </p>
            </div>
            <div className="tier__body">
              {tier.nfts.map((nft) => (
                <div className="tier__nft__box">
                  <img src={nft.optimized_url} alt="NFT" />
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
              disabled={!auctionData.auction.finalised}
              onClick={() => handleCaptureRevenue(txIndex)}
            >
              Proceed
            </Button>
          )}
        </div>
      </div>
    ))
  ) : (
    <div className="slots__list">
      {singleCaptureRevenueTxs.map((tx, txIndex) => (
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
                      ? { transform: 'rotate(180deg)' }
                      : { transform: 'rotate(0deg)' }
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
                NFTs: <b>{tx.tier.nfts.length}</b>
              </p>
              {tx.completed ? (
                <Button className="light-border-button" disabled>
                  Completed <img src={completedCheckmark} alt="completed" />
                </Button>
              ) : (
                <Button
                  className="light-button"
                  onClick={() => handleCaptureRevenue(txIndex)}
                  disabled={!auctionData.auction.finalised}
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
              {tx.completed ? (
                <Button className="light-border-button" disabled>
                  Completed <img src={completedCheckmark} alt="completed" />
                </Button>
              ) : (
                <Button
                  className="light-button"
                  onClick={() => handleCaptureRevenue(txIndex)}
                  disabled={!auctionData.auction.finalised}
                >
                  Proceed
                </Button>
              )}
              <div className="proceed__button__mobile">
                {tx.completed ? (
                  <Button className="light-border-button" disabled>
                    Completed <img src={completedCheckmark} alt="completed" />
                  </Button>
                ) : (
                  <Button
                    className="light-button"
                    disabled={!auctionData.auction.finalised}
                    onClick={() => handleCaptureRevenue(txIndex)}
                  >
                    Proceed
                  </Button>
                )}
              </div>
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
};
AuctioneerView.propTypes = {
  showSlots: PropTypes.func.isRequired,
  batchCaptureRevenueTxs: PropTypes.oneOfType([PropTypes.array]).isRequired,
  singleCaptureRevenueTxs: PropTypes.oneOfType([PropTypes.array]).isRequired,
  rewardTiersSlots: PropTypes.oneOfType([PropTypes.array]).isRequired,
  handleCaptureRevenue: PropTypes.func.isRequired,
  auctionData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default AuctioneerView;
