import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import CancelBidPopup from '../popups/CancelBidPopup';
import cancelIcon from '../../assets/images/activity-icons/cancel-bid.svg';
import { shortenEthereumAddress } from '../../utils/helpers/format.js';

const TopBidders = ({
  bidders,
  currentBid,
  setCurrentBid,
  auction,
  selectedAuctionEnded,
  rewardTiersSlots,
  setShowBidPopup,
  setShowBidRankings,
  canPlaceBids,
  getRewardTierSpanStyles,
  ethPrice,
  isWinningBid,
  currencyIcon,
  setBidders,
}) => {
  const [showCancelBidPopup, setShowCancelBidPopup] = useState(false);
  return (
    <div className="auction__details__box__top__bidders">
      <div className="auction__details__box__top__bidders__header">
        <h2 className="title">Top 5 bidders</h2>
        <button type="button" className="view__all__bids" onClick={() => setShowBidRankings(true)}>
          View all bids
        </button>
      </div>
      <div className="auction__details__box__top__bidders__content">
        <div className="five__bidders">
          {bidders.slice(0, 5).map((bidder, index) => (
            <div className="bidder" key={bidder.id}>
              <div className="name">
                <b>{`${index + 1}.`}</b>
                {bidder.user.displayName
                  ? bidder.user.displayName
                  : shortenEthereumAddress(bidder.user.address)}

                {rewardTiersSlots[index] ? (
                  <span style={getRewardTierSpanStyles(rewardTiersSlots[index])}>
                    {rewardTiersSlots[index].name}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div className="bid">
                <img src={currencyIcon} alt="Currency" />
                <b>{bidder.amount}</b>
                <span>~${Math.round(bidder.amount * ethPrice)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedAuctionEnded ? (
        <></>
      ) : (
        <div className="auction__details__box__top__bidders__footer">
          <div className="your__bid">
            {currentBid ? (
              <span className="your__current__bid">
                <b>
                  Your bid:
                  <img src={currencyIcon} alt="Currency" />
                  {currentBid.amount}
                </b>
                {`(#${bidders.findIndex((x) => x.userId === currentBid.userId) + 1} in the list)`}
              </span>
            ) : (
              <span className="no__bids">You haven&apos;t placed any bids</span>
            )}
          </div>
          {canPlaceBids ? (
            <div className="place__bid">
              <button onClick={() => setShowBidPopup(true)} type="button" className="light-button">
                Place a bid
              </button>
              {currentBid && !isWinningBid ? ( // TODO: add is winning bid //
                <div className="cacnel__bid">
                  <button
                    type="button"
                    className="cancel--button"
                    onClick={() => setShowCancelBidPopup(true)}
                  >
                    <span className="tooltiptext">Cancel my bid</span>
                    <img src={cancelIcon} alt="cancel" />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}

      <Popup open={showCancelBidPopup} closeOnDocumentClick={false}>
        <CancelBidPopup
          close={() => setShowCancelBidPopup(false)}
          setCurrentBid={setCurrentBid}
          myBid={currentBid?.amount}
          auction={auction}
          bidders={bidders}
          setBidders={setBidders}
        />
      </Popup>
    </div>
  );
};

TopBidders.propTypes = {
  bidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  rewardTiersSlots: PropTypes.oneOfType([PropTypes.array]).isRequired,
  currentBid: PropTypes.oneOfType([PropTypes.object]),
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setCurrentBid: PropTypes.func.isRequired,
  setShowBidPopup: PropTypes.func.isRequired,
  setShowBidRankings: PropTypes.func.isRequired,
  getRewardTierSpanStyles: PropTypes.func.isRequired,
  selectedAuctionEnded: PropTypes.bool.isRequired,
  canPlaceBids: PropTypes.bool.isRequired,
  ethPrice: PropTypes.number.isRequired,
  isWinningBid: PropTypes.bool.isRequired,
  currencyIcon: PropTypes.string.isRequired,
  setBidders: PropTypes.func.isRequired,
};
TopBidders.defaultProps = {
  currentBid: null,
};
export default TopBidders;
