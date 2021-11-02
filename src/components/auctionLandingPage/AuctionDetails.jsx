import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Animated } from 'react-animated-css';
import Skeleton from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Slider from 'react-slick';
import BidRankingsPopup from '../popups/BidRankingsPopup.jsx';
import PlaceBidPopup from '../popups/PlaceBidPopup.jsx';
import Button from '../button/Button.jsx';
import leftArrow from '../../assets/images/arrow.svg';
import darkCopyIcon from '../../assets/images/copy.svg';
import lightCopyIcon from '../../assets/images/copy2.svg';
import infoIcon from '../../assets/images/icon.svg';
import currencyETHIcon from '../../assets/images/currency-eth.svg';
import cancelIcon from '../../assets/images/activity-icons/cancel-bid.svg';
import { shortenEthereumAddress } from '../../utils/helpers/format.js';
import AuctionCountdown from './AuctionCountdown.jsx';
import { LandingPageLoader } from './LandingPageLoader.jsx';
import ActiveAuctions from './ActiveAuctions.jsx';
import TopBidders from './TopBidders.jsx';
import AuctionEndedSection from './AuctionEndedSection.jsx';

const AuctionDetails = ({
  onAuction,
  bidders,
  setBidders,
  setShowBidPopup,
  rewardTiersSlots,
  ethPrice,
  currentBid,
  setCurrentBid,
  loading,
}) => {
  const history = useHistory();
  const [selectedAuctionEnded, setSelectedAuctionEnded] = useState(false);
  const [copied, setCopied] = useState(false);
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
            <div
              className={`auction__details__box__image ${
                onAuction.auction.promoImageUrl ? '' : 'show__avatar'
              }`}
            >
              {onAuction.auction.promoImageUrl ? (
                <img
                  className="original"
                  src={onAuction.auction.promoImageUrl}
                  alt={onAuction.auction.headline}
                />
              ) : (
                <img
                  className="artist__image"
                  src={onAuction.artist.profileImageUrl}
                  alt={onAuction.artist.displayName}
                />
              )}
            </div>
            <div className="auction__details__box__info">
              <h1 className="title">{onAuction.auction.headline}</h1>
              <div className="artist__details">
                <img src={onAuction.artist.profileImageUrl} alt={onAuction.artist.displayName} />
                <span>by</span>
                <button
                  type="button"
                  onClick={() => history.push(`/${onAuction.artist.displayName}`)}
                >
                  {onAuction.artist.displayName}
                </button>
              </div>
              <div className="auction__ends__in">
                {!selectedAuctionEnded ? (
                  <AuctionCountdown
                    startDate={onAuction.auction.startDate}
                    endDate={onAuction.auction.endDate}
                    setSelectedAuctionEnded={setSelectedAuctionEnded}
                    hasAuctionStarted={hasAuctionStarted}
                    setHasAuctionStarted={setHasAuctionStarted}
                  />
                ) : (
                  <Animated animationIn="zoomIn">
                    <div className="auction__ended">Auction has ended</div>
                  </Animated>
                )}
                <div className="copy-div">
                  <div className="copy" title="Copy to clipboard">
                    <div className="copied-div" hidden={!copied}>
                      URL copied!
                      <span />
                    </div>
                    <CopyToClipboard
                      text={window.location.href}
                      onCopy={() => {
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 1000);
                      }}
                    >
                      <span>
                        {onAuction.auction.backgroundImageUrl ? (
                          <img
                            src={lightCopyIcon}
                            alt="Copy to clipboard icon"
                            className="copyImg"
                          />
                        ) : (
                          <img
                            src={darkCopyIcon}
                            alt="Copy to clipboard icon"
                            className="copyImg"
                          />
                        )}
                        Copy URL
                      </span>
                    </CopyToClipboard>
                  </div>
                  {view === 'Auctioneer' && (
                    <div className="funds__and__balance">
                      <div className="funds">
                        <div className="funds__header">
                          <h4
                            onMouseEnter={() => setHideUnreleasedInfo(true)}
                            onMouseLeave={() => setHideUnreleasedInfo(false)}
                          >
                            Unreleased funds <img src={infoIcon} alt="Info" />
                          </h4>
                          {hideUnreleasedInfo && (
                            <div className="info-text">
                              <p>
                                The number of copies that can be minted sglkdj gj pejfpf w d or pwr
                                wr hihsfhuhdf dgsio osiod gh sdldf.
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="bids">
                          <img src={currencyETHIcon} alt="ETH" />
                          <p>120.42 </p>
                          <span>~$41,594</span>
                        </div>
                        <Button
                          className="light-button"
                          onClick={() => history.push('/release-rewards', { view: 'Auctioneer' })}
                        >
                          Release rewards
                        </Button>
                      </div>
                      <div className="funds">
                        <div className="funds__header">
                          <h4
                            onMouseEnter={() => setHideAvailableInfo(true)}
                            onMouseLeave={() => setHideAvailableInfo(false)}
                          >
                            Available funds <img src={infoIcon} alt="Info" />
                          </h4>
                          {hideAvailableInfo && (
                            <div className="info-text">
                              <p>
                                The number of copies that can be minted sglkdj gj pejfpf w d or pwr
                                wr hihsfhuhdf dgsio osiod gh sdldf.
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="bids">
                          <img src={currencyETHIcon} alt="ETH" />
                          <p>14.24</p>
                          <span>~$41,594</span>
                        </div>
                        <Button className="light-button">Claim funds</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!selectedAuctionEnded || (selectedAuctionEnded && !currentBid) ? (
              <TopBidders
                auctionId={onAuction.auction.id}
                selectedAuctionEnded={selectedAuctionEnded}
                rewardTiersSlots={rewardTiersSlots}
                bidders={bidders}
                currentBid={currentBid}
                setCurrentBid={setCurrentBid}
                setShowBidPopup={setShowBidPopup}
                setShowBidRankings={setShowBidRankings}
                canPlaceBids={hasAuctionStarted && onAuction.auction.depositedNfts}
              />
            ) : (
              <AuctionEndedSection
                currentBid={currentBid}
                numberOfWinners={rewardTiersSlots.length}
                setShowBidRankings={setShowBidRankings}
                onAuction={onAuction}
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
  currentBid: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setCurrentBid: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AuctionDetails;
