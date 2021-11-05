import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import BidRankingsPopup from '../popups/BidRankingsPopup.jsx';
import leftArrow from '../../assets/images/arrow.svg';
import AuctionCountdown from './AuctionCountdown.jsx';
import ActiveAuctions from './ActiveAuctions.jsx';
import TopBidders from './TopBidders.jsx';
import AuctionEndedSection from './AuctionEndedSection.jsx';
import AuctionHeader from './AuctionHeader.jsx';

const AuctionDetails = ({
  onAuction,
  bidders,
  setBidders,
  setShowBidPopup,
  rewardTiersSlots,
  ethPrice,
  currentBid,
  setCurrentBid,
  isWinningBid,
  winningSlot,
  slotsInfo,
  setShowLoading,
}) => {
  const history = useHistory();
  const [selectedAuctionEnded, setSelectedAuctionEnded] = useState(false);
  const [showBidRankings, setShowBidRankings] = useState(false);
  const [hasAuctionStarted, setHasAuctionStarted] = useState(
    new Date() > new Date(onAuction.auction.startDate)
  );
  useEffect(() => {
    // Prev Icon
    const prev = document.querySelector('.slick-prev');
    if (prev) {
      const prevIcon = document.createElement('img');
      prevIcon.src = leftArrow;
      prev.innerHTML = '';
      prev.appendChild(prevIcon);
    }

    // Next icon
    const next = document.querySelector('.slick-next');
    if (next) {
      const nextIcon = document.createElement('img');
      nextIcon.src = leftArrow;
      next.innerHTML = '';
      next.appendChild(nextIcon);
    }
  }, []);

  const getRewardTierSpanStyles = (rewardTier) => {
    if (rewardTier.color) {
      return {
        color: rewardTier.color,
        border: `1px solid ${rewardTier.color}`,
      };
    }
    // TODO: Discuss default colors
    return {
      color: '#bcbcbc',
      border: '1px solid #bcbcbc',
    };
  };
  console.log('Current bid:');
  console.log(currentBid);
  return (
    <div
      className={`auction__details__section ${
        onAuction.auction.backgroundImageUrl ? 'has--background' : ''
      }`}
    >
      <div className="bg">
        {onAuction.auction.backgroundImageUrl && (
          <img
            src={onAuction.auction.backgroundImageUrl}
            alt={onAuction.auction.headline}
            style={{
              filter: onAuction.auction.backgroundImageBlur ? 'blur(10px)' : 'blur(0px)',
            }}
          />
        )}
      </div>
      {onAuction.auction.backgroundImageUrl ? <div className="overlay" /> : <></>}
      <div className="auction__details__section__container">
        <ActiveAuctions mainAuction={onAuction} />
        <Animated animationIn="zoomIn" key={onAuction.auction.id}>
          <div className="auction__details__box">
            <AuctionHeader
              onAuction={onAuction}
              setSelectedAuctionEnded={setSelectedAuctionEnded}
              hasAuctionStarted={hasAuctionStarted}
              setHasAuctionStarted={setHasAuctionStarted}
              selectedAuctionEnded={selectedAuctionEnded}
            />
            {!selectedAuctionEnded || (selectedAuctionEnded && !currentBid) ? (
              <TopBidders
                auction={onAuction.auction}
                selectedAuctionEnded={selectedAuctionEnded}
                rewardTiersSlots={rewardTiersSlots}
                bidders={bidders}
                currentBid={currentBid}
                setCurrentBid={setCurrentBid}
                setShowBidPopup={setShowBidPopup}
                setShowBidRankings={setShowBidRankings}
                canPlaceBids={hasAuctionStarted && onAuction.auction.depositedNfts}
                getRewardTierSpanStyles={getRewardTierSpanStyles}
                ethPrice={ethPrice}
                isWinningBid={isWinningBid}
              />
            ) : (
              <AuctionEndedSection
                currentBid={currentBid}
                bidders={bidders}
                rewardTiersSlots={rewardTiersSlots}
                numberOfWinners={rewardTiersSlots.length}
                setShowBidRankings={setShowBidRankings}
                onAuction={onAuction}
                winningSlot={winningSlot}
                slotsInfo={slotsInfo}
                setShowLoading={setShowLoading}
                ethPrice={ethPrice}
              />
            )}
          </div>
        </Animated>
      </div>
      <Popup open={showBidRankings} closeOnDocumentClick={false}>
        <BidRankingsPopup
          onClose={() => setShowBidRankings(false)}
          onBidders={bidders}
          rewardTiers={onAuction.rewardTiers}
          rewardTiersSlots={rewardTiersSlots}
          getRewardTierSpanStyles={getRewardTierSpanStyles}
          ethPrice={ethPrice}
        />
      </Popup>
    </div>
  );
};

AuctionDetails.propTypes = {
  onAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  bidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setBidders: PropTypes.func.isRequired,
  setShowBidPopup: PropTypes.func.isRequired,
  rewardTiersSlots: PropTypes.oneOfType([PropTypes.array]).isRequired,
  ethPrice: PropTypes.number.isRequired,
  currentBid: PropTypes.oneOfType([PropTypes.object]),
  setCurrentBid: PropTypes.func.isRequired,
  isWinningBid: PropTypes.bool.isRequired,
  winningSlot: PropTypes.number.isRequired,
  slotsInfo: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setShowLoading: PropTypes.func.isRequired,
};

AuctionDetails.defaultProps = {
  currentBid: null,
};

export default AuctionDetails;
