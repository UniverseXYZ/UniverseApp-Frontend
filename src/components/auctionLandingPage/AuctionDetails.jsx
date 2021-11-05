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
import ethIcon from '../../assets/images/bid_icon.svg';
import daiIcon from '../../assets/images/dai_icon.svg';
import usdcIcon from '../../assets/images/usdc_icon.svg';
import bondIcon from '../../assets/images/bond_icon.svg';
import snxIcon from '../../assets/images/snx.svg';
import wethIcon from '../../assets/images/WETH 20x20.svg';
import wbtcIcon from '../../assets/images/WBTC 20x20.svg';
import aaveIcon from '../../assets/images/aave 20x20.png';
import compIcon from '../../assets/images/COMP 20x20.svg';
import ilvIcon from '../../assets/images/ILV 20x20.png';
import linkIcon from '../../assets/images/LINK 20x20.svg';
import sushiIcon from '../../assets/images/sushi 20x20.png';
import xyzIcon from '../../assets/images/XYZ 20x20.png';

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
    const bidtype = onAuction.auction.tokenSymbol;

    if (bidtype === 'ETH') {
      setCurrencyIcon(ethIcon);
    }
    if (bidtype === 'DAI') {
      setCurrencyIcon(daiIcon);
    }
    if (bidtype === 'USDC') {
      setCurrencyIcon(usdcIcon);
    }
    if (bidtype === 'BOND') {
      setCurrencyIcon(bondIcon);
    }
    if (bidtype === 'SNX') {
      setCurrencyIcon(snxIcon);
    }
    if (bidtype === 'WETH') {
      setCurrencyIcon(wethIcon);
    }
    if (bidtype === 'WBTC') {
      setCurrencyIcon(wbtcIcon);
    }
    if (bidtype === 'AAVE') {
      setCurrencyIcon(aaveIcon);
    }
    if (bidtype === 'LINK') {
      setCurrencyIcon(linkIcon);
    }
    if (bidtype === 'COMP') {
      setCurrencyIcon(compIcon);
    }
    if (bidtype === 'ILV') {
      setCurrencyIcon(ilvIcon);
    }
    if (bidtype === 'SUSHI') {
      setCurrencyIcon(sushiIcon);
    }
    if (bidtype === 'XYZ') {
      setCurrencyIcon(xyzIcon);
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
                currencyIcon={currencyIcon}
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
          currencyIcon={currencyIcon}
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
