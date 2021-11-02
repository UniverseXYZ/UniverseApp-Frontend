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
import CancelBidPopup from '../popups/CancelBidPopup.jsx';
import Button from '../button/Button.jsx';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAuctionContext } from '../../contexts/AuctionContext';
import leftArrow from '../../assets/images/arrow.svg';
import darkCopyIcon from '../../assets/images/copy.svg';
import lightCopyIcon from '../../assets/images/copy2.svg';
import infoIcon from '../../assets/images/icon.svg';
import currencyETHIcon from '../../assets/images/currency-eth.svg';
import smallCongratsIcon from '../../assets/images/congrats-small.png';
import frankie from '../../assets/images/frankie.png';
import cancelIcon from '../../assets/images/activity-icons/cancel-bid.svg';
import { shortenEthereumAddress } from '../../utils/helpers/format.js';
import AuctionCountdown from './AuctionCountdown.jsx';
import ActiveAuctionCard from './ActiveAuctionCard.jsx';
import { LandingPageLoader } from './LandingPageLoader.jsx';
import ActiveAuctions from './ActiveAuctions.jsx';

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
        {!loading ? (
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
                      endDate={onAuction.auction.endDate}
                      setSelectedAuctionEnded={setSelectedAuctionEnded}
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
                  </div>
                </div>
              </div>
              {!selectedAuctionEnded && (
                <div className="auction__details__box__top__bidders">
                  <div className="auction__details__box__top__bidders__header">
                    <h2 className="title">Top 5 bidders</h2>
                    <button
                      type="button"
                      className="view__all__bids"
                      onClick={() => setShowBidRankings(true)}
                    >
                      View all bids
                    </button>
                  </div>
                  <div className="auction__details__box__top__bidders__content">
                    <div className="five__bidders">
                      {bidders.slice(0, 5).map((bidder, index) => (
                        <div className="bidder" key={bidder.id}>
                          <div className="name">
                            <b>{`${index + 1}.`}</b>
                            {bidder.displayName
                              ? bidder.displayName
                              : shortenEthereumAddress(bidder.address)}

                            {rewardTiersSlots[index] ? (
                              <span style={getRewardTierSpanStyles(rewardTiersSlots[index])}>
                                {rewardTiersSlots[index].name}
                              </span>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="bid">
                            <img src={currencyETHIcon} alt="Currency" />
                            <b>{bidder.amount}</b>
                            <span>~${Math.round(bidder.amount * ethPrice)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="auction__details__box__top__bidders__footer">
                    <div className="your__bid">
                      {currentBid ? (
                        <span className="your__current__bid">
                          <b>
                            Your bid:
                            <img src={currencyETHIcon} alt="Currency" />
                            {currentBid.amount}
                          </b>
                          {`(#${
                            bidders.findIndex((x) => x.address === currentBid.address) + 1
                          } in the list)`}
                        </span>
                      ) : (
                        <span className="no__bids">You haven&apos;t placed any bids yet</span>
                      )}
                    </div>
                    <div className="place__bid">
                      <button
                        onClick={() => setShowBidPopup(true)}
                        type="button"
                        className="light-button"
                      >
                        Place a bid
                      </button>
                      {currentBid && currentBid.auctionId === onAuction.auction.id ? (
                        <div className="cacnel__bid">
                          <Popup
                            trigger={
                              <button type="button" className="cancel--button">
                                <span className="tooltiptext">Cancel my bid</span>
                                <img src={cancelIcon} alt="cancel" />
                              </button>
                            }
                          >
                            {(close) => (
                              <CancelBidPopup
                                close={close}
                                setCurrentBid={setCurrentBid}
                                myBid={currentBid}
                              />
                            )}
                          </Popup>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
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
              )}
              {selectedAuctionEnded && currentBid && currentBid.bid <= 5 && (
                <Animated animationIn="zoomIn">
                  <div className="ended__result">
                    <div className="content">
                      <h2 className="title">Unfortunately, your bid didn’t win</h2>
                      <p className="desc">
                        You are able to withdraw your funds by clicking the Withdraw button below.
                        You can still buy individual NFTs from other sellers on NFT marketplaces.
                      </p>
                      <div className="view__rankings">
                        <button type="button" onClick={() => setShowBidRankings(true)}>
                          View rankings
                        </button>
                      </div>
                    </div>
                    <div className="footer">
                      <Button className="light-button">Withdraw</Button>
                    </div>
                  </div>
                </Animated>
              )}
              {selectedAuctionEnded && currentBid && currentBid.bid > 5 && (
                <Animated animationIn="zoomIn">
                  <div className="ended__result">
                    <div className="content">
                      <div className="icon">
                        <img src={smallCongratsIcon} alt="Congrats" />
                      </div>
                      <h2 className="title">Congratulations!</h2>
                      <p className="desc">
                        Your bid won the <b>{currentBid?.rewardTier}</b> tier. You can claim your
                        NFTs by clicking the button below
                      </p>
                      <div className="view__rankings">
                        <button type="button" onClick={() => setShowBidRankings(true)}>
                          View rankings
                        </button>
                      </div>
                      <div className="warning__div">
                        <img src={warningIcon} alt="" />
                        <p>
                          The auctions rewards need to be released first. Without this step, the
                          auctioneer will not be able to collect his warnings and the bidders will
                          not be able to claim their NFTs.
                        </p>
                      </div>
                    </div>
                    <div className="footer">
                      <Button
                        className="light-button"
                        onClick={() => history.push('/release-rewards', { view: 'Bidders' })}
                      >
                        Release rewards
                      </Button>
                      <Button className="light-button" disabled>
                        Claim NFTs
                      </Button>
                    </div>
                    {/* <div className="footer">
                    <Button className="light-button">Claim</Button>
                  </div> */}
                  </div>
                </Animated>
              )}
            </div>
          </Animated>
        ) : (
          <LandingPageLoader />
        )}
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
