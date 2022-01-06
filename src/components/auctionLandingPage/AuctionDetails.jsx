import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import BidRankingsPopup from '../popups/BidRankingsPopup.jsx';
import leftArrow from '../../assets/images/arrow.svg';
import ActiveAuctions from './ActiveAuctions.jsx';
import TopBidders from './TopBidders.jsx';
import AuctionEndedSection from './AuctionEndedSection.jsx';
import AuctionHeader from './AuctionHeader.jsx';
import { getBidTypeByName } from '../../utils/fixtures/BidOptions.js';
import { useAuctionContext } from '../../contexts/AuctionContext.jsx';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import CancelBidPopup from '../popups/CancelBidPopup';

const AuctionDetails = ({
  onAuction,
  bidders,
  setShowBidPopup,
  rewardTiersSlots,
  ethPrice,
  currentBid,
  isWinningBid,
  winningSlot,
  slotsInfo,
  setShowLoading,
  setShowCancelBidPopup,
  showCancelBidPopup,
}) => {
  const history = useHistory();
  const { options } = useAuctionContext();
  const { address } = useAuthContext();
  const [selectedAuctionEnded, setSelectedAuctionEnded] = useState(false);
  const [showBidRankings, setShowBidRankings] = useState(false);
  const [currencyIcon, setCurrencyIcon] = useState(null);
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

  useEffect(() => {
    const auctionBidType = onAuction.auction.tokenSymbol;
    const bidTypeImg = getBidTypeByName(auctionBidType, options).img;

    setCurrencyIcon(bidTypeImg);
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

  return (
    <div
      className={`auction__details__section ${
        (
          onAuction.auction.backgroundImageUrl
            ? onAuction.auction.backgroundImageUrl
            : onAuction.auction.backgroundImage
            ? typeof onAuction.auction.backgroundImage !== 'string' &&
              URL.createObjectURL(onAuction.auction.backgroundImage)
            : onAuction.auction.backgroundImage
        )
          ? 'has--background'
          : ''
      }`}
    >
      <div className="bg">
        {(onAuction.auction.backgroundImageUrl
          ? onAuction.auction.backgroundImageUrl
          : onAuction.auction.backgroundImage
          ? typeof onAuction.auction.backgroundImage !== 'string' &&
            URL.createObjectURL(onAuction.auction.backgroundImage)
          : onAuction.auction.backgroundImage) && (
          <img
            src={
              onAuction.auction.backgroundImageUrl
                ? onAuction.auction.backgroundImageUrl
                : onAuction.auction.backgroundImage
                ? typeof onAuction.auction.backgroundImage !== 'string' &&
                  URL.createObjectURL(onAuction.auction.backgroundImage)
                : onAuction.auction.backgroundImage
            }
            alt={onAuction.auction.headline}
            style={{
              filter: onAuction.auction.backgroundImageBlur ? 'blur(10px)' : 'blur(0px)',
            }}
          />
        )}
      </div>
      {(
        onAuction.auction.backgroundImageUrl
          ? onAuction.auction.backgroundImageUrl
          : onAuction.auction.backgroundImage
          ? typeof onAuction.auction.backgroundImage !== 'string' &&
            URL.createObjectURL(onAuction.auction.backgroundImage)
          : onAuction.auction.backgroundImage
      ) ? (
        <div className="overlay" />
      ) : (
        <></>
      )}
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
            {!selectedAuctionEnded ||
            (selectedAuctionEnded && !currentBid && address !== onAuction.artist.address) ? (
              <TopBidders
                selectedAuctionEnded={selectedAuctionEnded}
                rewardTiersSlots={rewardTiersSlots}
                bidders={bidders}
                currentBid={currentBid}
                setShowBidPopup={setShowBidPopup}
                setShowBidRankings={setShowBidRankings}
                canPlaceBids={hasAuctionStarted && onAuction.auction.depositedNfts}
                getRewardTierSpanStyles={getRewardTierSpanStyles}
                ethPrice={ethPrice}
                isWinningBid={isWinningBid}
                currencyIcon={currencyIcon}
                collections={onAuction.collections}
                setShowCancelBidPopup={setShowCancelBidPopup}
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
                currencyIcon={currencyIcon}
                isWinningBid={isWinningBid}
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
          currencyIcon={currencyIcon}
          collections={onAuction.collections}
        />
      </Popup>

      <Popup open={showCancelBidPopup} closeOnDocumentClick={false}>
        <CancelBidPopup close={() => setShowCancelBidPopup(false)} auction={onAuction} />
      </Popup>
    </div>
  );
};

AuctionDetails.propTypes = {
  onAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  bidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setShowBidPopup: PropTypes.func.isRequired,
  rewardTiersSlots: PropTypes.oneOfType([PropTypes.array]).isRequired,
  ethPrice: PropTypes.number.isRequired,
  currentBid: PropTypes.oneOfType([PropTypes.object]),
  isWinningBid: PropTypes.bool.isRequired,
  winningSlot: PropTypes.oneOfType([PropTypes.object]),
  slotsInfo: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setShowLoading: PropTypes.func.isRequired,
  setShowCancelBidPopup: PropTypes.func.isRequired,
  showCancelBidPopup: PropTypes.bool.isRequired,
};

AuctionDetails.defaultProps = {
  currentBid: null,
  winningSlot: {},
};

export default AuctionDetails;
