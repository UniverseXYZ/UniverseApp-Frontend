import React, { useState } from 'react';
import PropTypes from 'prop-types';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';
import SingleCaptureRevenueTxs from './SingleCaptureRevenueTxs';
import Button from '../button/Button';

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
    batchCaptureRevenueTxs.map((tx, txIndex) => (
      <div className="transaction">
        <div className="transaction__header">
          <h3>Transaction {txIndex + 1}</h3>
          <div className="transaction__proceed">
            <p className="total">
              Total NFTs: <b>{tx.totalNfts}</b>
            </p>
            {tx.revenueCaptured ? (
              <Button className="light-border-button" disabled>
                Completed <img src={completedCheckmark} alt="completed" />
              </Button>
            ) : (
              <Button
                className="light-button"
                disabled={!auctionData.auction.finalised}
                onClick={() => handleCaptureRevenue(tx, txIndex, false)}
              >
                Proceed
              </Button>
            )}
            <div className="proceed__button__mobile">
              {tx.revenueCaptured ? (
                <Button className="light-border-button" disabled>
                  Completed <img src={completedCheckmark} alt="completed" />
                </Button>
              ) : (
                <Button
                  className="light-button"
                  disabled={!auctionData.auction.finalised}
                  onClick={() => handleCaptureRevenue(tx, txIndex, false)}
                >
                  Proceed
                </Button>
              )}
            </div>
          </div>
        </div>
        {tx.tiers.map((tier) => (
          <div className="transaction__tier">
            <div className="tier__head">
              <h4>{tier.name}</h4>
              <p>
                Slots: <b>{+tx.endSlot - +tx.startSlot + 1}</b>
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
      </div>
    ))
  ) : (
    <SingleCaptureRevenueTxs
      openSlots={openSlots}
      handleShowSlotNfts={handleShowSlotNfts}
      auction={auctionData.auction}
      singleCaptureRevenueTxs={singleCaptureRevenueTxs}
      handleCaptureRevenue={handleCaptureRevenue}
      rewardTiersSlots={rewardTiersSlots}
    />
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
