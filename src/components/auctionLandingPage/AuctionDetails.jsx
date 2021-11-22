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
import { useAuthContext } from '../../contexts/AuthContext';
import { useAuctionContext } from '../../contexts/AuctionContext';
import leftArrow from '../../assets/images/arrow.svg';
import darkCopyIcon from '../../assets/images/copy.svg';
import lightCopyIcon from '../../assets/images/copy2.svg';
import currencyETHIcon from '../../assets/images/currency-eth.svg';
import smallCongratsIcon from '../../assets/images/congrats-small.png';
import frankie from '../../assets/images/frankie.png';
import { useLocation, useWindowSize } from 'react-use';

const AuctionDetails = ({ onAuction, bidders, setBidders }) => {
  const { myAuctions } = useAuctionContext();
  const { loggedInArtist } = useAuthContext();
  const getAllAuctionsForCurrentArtist = myAuctions;
  const [selectedAuction, setSelectedAuction] = useState(onAuction);
  const location = useLocation();

  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [currentBid, setCurrentBid] = useState(null);
  const [countdown, setCountdown] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });
  const [selectedAuctionEnded, setSelectedAuctionEnded] = useState(false);
  const history = useHistory();
  const windowSize = useWindowSize();

  const convertDate = (date) => {
    const dLeft = (new Date(date) - Date.now()) / 1000;
    const daysLeft = Math.floor(dLeft / 86400);
    const hoursLeft = Math.floor(dLeft / 3600) % 24;
    const minutesLeft = Math.floor(dLeft / 60) % 60;
    const secondsLeft = dLeft % 60;
    return daysLeft >= 0
      ? `Ends in ${parseInt(daysLeft, 10)}d : ${parseInt(hoursLeft, 10)}h : ${parseInt(
          minutesLeft,
          10
        )}m : ${parseInt(secondsLeft, 10)}s`
      : false;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const d = (new Date(selectedAuction.endDate) - Date.now()) / 1000;
      const days = Math.floor(d / 86400);
      const hours = Math.floor(d / 3600) % 24;
      const minutes = Math.floor(d / 60) % 60;
      const seconds = d % 60;
      if (days < 0) {
        clearInterval(interval);
        setSelectedAuctionEnded(true);
      } else {
        setSelectedAuctionEnded(false);
        setCountdown({
          days: parseInt(days, 10),
          hours: parseInt(hours, 10),
          minutes: parseInt(minutes, 10),
          seconds: parseInt(seconds, 10),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedAuction]);

  useEffect(() => {
    const res = bidders.filter((bidder) => bidder.artistId === loggedInArtist.id);
    if (res.length) {
      setCurrentBid(res[res.length - 1]);
    }
    bidders.sort((a, b) => b.bid - a.bid);
  }, [bidders]);

  useEffect(() => {
    // Here need to get Auction details
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  useEffect(() => {
    if (windowSize.width < 1200) {
      setSliderSettings({ ...sliderSettings, slidesToShow: 3 });
    }
    if (windowSize.width < 993) {
      setSliderSettings({ ...sliderSettings, slidesToShow: 2 });
    }
    if (windowSize.width < 576) {
      setSliderSettings({ ...sliderSettings, slidesToShow: 1 });
    }
  }, [windowSize]);

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

  return (
    <div
      className={`auction__details__section ${
        selectedAuction.backgroundImage ? 'has--background' : ''
      }`}
    >
      <div className="bg">
        {selectedAuction.backgroundImage && (
          <img
            src={URL.createObjectURL(selectedAuction.backgroundImage)}
            alt={selectedAuction.name}
            style={{ filter: selectedAuction.hasBlur ? 'blur(10px)' : 'blur(0px)' }}
          />
        )}
      </div>
      {selectedAuction.backgroundImage && <div className="overlay" />}
      <div className="auction__details__section__container">
        {getAllAuctionsForCurrentArtist.length ? (
          <Slider {...sliderSettings}>
            {getAllAuctionsForCurrentArtist.map((act) => (
              <div
                key={act.id}
                className={`carousel__auction__container ${
                  selectedAuction.id === act.id ? 'selected' : ''
                }`}
                onClick={() => {
                  setSelectedAuction(act);
                  setLoading(true);
                  history.push(`/${act.link.split('/')[1]}/${act.link.split('/')[2]}`, {
                    auction: act,
                  });
                }}
                aria-hidden="true"
                style={{ width: 278 }}
              >
                <div className="carousel__auction">
                  <div
                    className={`carousel__auction__image ${act.promoImage ? '' : 'show__avatar'}`}
                  >
                    {act.promoImage ? (
                      <img className="original" src={act.promoImage} alt={act.name} />
                    ) : (
                      // TODO:: here should display Artist avatar
                      <img className="artist__image" src={frankie} alt={act.name} />
                    )}
                  </div>
                  <div className="carousel__auction__info">
                    <h4 title={act.name}>
                      {act.name.length > 20 ? `${act.name.substring(0, 20)}...` : act.name}
                    </h4>
                    <p>
                      {!convertDate(act.endDate) ? (
                        <span>Auction has ended</span>
                      ) : (
                        convertDate(act.endDate)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <></>
        )}
        {!loading ? (
          <Animated animationIn="zoomIn" key={selectedAuction.id}>
            <div className="auction__details__box">
              <div
                className={`auction__details__box__image ${
                  selectedAuction.promoImage ? '' : 'show__avatar'
                }`}
              >
                {selectedAuction.promoImage ? (
                  <img
                    className="original"
                    src={URL.createObjectURL(selectedAuction.promoImage)}
                    alt={selectedAuction.name}
                  />
                ) : (
                  // TODO:: we should display auction artist avatar here
                  <img className="artist__image" src={frankie} alt="Frankie" />
                )}
              </div>
              <div className="auction__details__box__info">
                <h1 className="title">{selectedAuction.name}</h1>
                <div className="artist__details">
                  {/* // TODO:: we should display auction artist avatar here */}
                  <img src={frankie} alt="Frankie" />
                  <span>by</span>
                  {/* // TODO:: we should push auction artist name here */}
                  <button
                    type="button"
                    onClick={() =>
                      history.push(`/${'selectedAuction.artist.name'.split(' ')[0]}`, {
                        id: 'selectedAuction.artist.id',
                      })
                    }
                  >
                    selectedAuction.artist.name
                  </button>
                </div>
                <div className="auction__ends__in">
                  {!selectedAuctionEnded ? (
                    <div className="auction__ends__in__label">
                      <span>Auction ends in:&nbsp;</span>
                      <div className="time">
                        <div className="days">{`${countdown.days}d`}</div>
                        <span>:</span>
                        <div className="hours">{`${countdown.hours}h`}</div>
                        <span>:</span>
                        <div className="minutes">{`${countdown.minutes}m`}</div>
                        <span>:</span>
                        <div className="seconds">{`${countdown.seconds}s`}</div>
                      </div>
                    </div>
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
                        text={location.href}
                        onCopy={() => {
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 1000);
                        }}
                      >
                        <span>
                          {selectedAuction.backgroundImage ? (
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
                    <Popup
                      trigger={
                        <button type="button" className="view__all__bids">
                          View all bids
                        </button>
                      }
                    >
                      {(close) => <BidRankingsPopup onClose={close} onBidders={bidders} />}
                    </Popup>
                  </div>
                  <div className="auction__details__box__top__bidders__content">
                    <div className="five__bidders">
                      {bidders.map(
                        (bidder, index) =>
                          index < 5 && (
                            <div className="bidder" key={bidder.id}>
                              <div className="name">
                                <b>{`${index + 1}.`}</b>
                                {bidder.name}
                                <span className={bidder.rewardTier.toLocaleLowerCase()}>
                                  {bidder.rewardTier}
                                </span>
                              </div>
                              <div className="bid">
                                <img src={currencyETHIcon} alt="Currency" />
                                <b>{bidder.bid}</b>
                                <span>~$48,580</span>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                  <div className="auction__details__box__top__bidders__footer">
                    <div className="your__bid">
                      {currentBid && currentBid.aucionId === selectedAuction.id ? (
                        <span className="your__current__bid">
                          <b>
                            Your bid:
                            <img src={currencyETHIcon} alt="Currency" />
                            {currentBid.bid}
                          </b>
                          {`(#${
                            bidders.findIndex(
                              (x) => x.artistId === currentBid.artistId && x.bid === currentBid.bid
                            ) + 1
                          } in the list)`}
                        </span>
                      ) : (
                        <span className="no__bids">You haven’t any bids yet</span>
                      )}
                    </div>
                    <div className="place__bid">
                      <Popup
                        trigger={
                          <button type="button" className="light-button">
                            Place a bid
                          </button>
                        }
                      >
                        {(close) => (
                          <PlaceBidPopup
                            onClose={close}
                            onAuctionId={selectedAuction.id}
                            onAuctionTitle={selectedAuction.name}
                            onArtistName="selectedAuction.artist.name"
                            onBidders={bidders}
                            onSetBidders={setBidders}
                          />
                        )}
                      </Popup>
                    </div>
                  </div>
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
                        <Popup trigger={<button type="button">View rankings</button>}>
                          {(close) => <BidRankingsPopup onClose={close} onBidders={bidders} />}
                        </Popup>
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
                        Your bid won the <b>{currentBid.rewardTier}</b> tier. You can claim your
                        NFTs by clicking the button below
                      </p>
                      <div className="view__rankings">
                        <Popup trigger={<button type="button">View rankings</button>}>
                          {(close) => <BidRankingsPopup onClose={close} onBidders={bidders} />}
                        </Popup>
                      </div>
                    </div>
                    <div className="footer">
                      <Button className="light-button">Claim</Button>
                    </div>
                  </div>
                </Animated>
              )}
            </div>
          </Animated>
        ) : (
          <div className="auction__details__box">
            <div className="auction__details__box__image">
              <Skeleton height={windowSize.width > 768 ? 445 : 335} />
            </div>
            <div className="auction__details__box__info">
              <h1 className="title">
                <Skeleton width={200} />
              </h1>
              <div className="artist__details">
                <Skeleton width={30} height={30} circle />
                <Skeleton width={150} />
              </div>
              <div className="auction__ends__in">
                <div className="auction__ends__in__label">
                  <Skeleton width={200} />
                </div>
                <Skeleton width={100} />
              </div>
            </div>
            <div className="auction__details__box__top__bidders">
              <div className="auction__details__box__top__bidders__header">
                <h2 className="title">
                  <Skeleton width={100} />
                </h2>
                <button type="button" className="view__all__bids">
                  <Skeleton width={100} />
                </button>
              </div>
              <div className="auction__details__box__top__bidders__content">
                <div className="ten__bidders__left">
                  {bidders.map(
                    (bidder, index) =>
                      index < 5 && (
                        <div className="bidder" key={bidder.id}>
                          <div className="name">
                            <Skeleton width={90} />
                          </div>
                          <div className="bid">
                            <Skeleton width={40} />
                          </div>
                        </div>
                      )
                  )}
                </div>
                <div className="ten__bidders__right">
                  {bidders.map(
                    (bidder, index) =>
                      index >= 5 &&
                      index < 10 && (
                        <div className="bidder" key={bidder.id}>
                          <div className="name">
                            <Skeleton width={90} />
                          </div>
                          <div className="bid">
                            <Skeleton width={40} />
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
              <div className="auction__details__box__top__bidders__footer">
                <div className="your__bid">
                  <Skeleton width={windowSize.width > 576 && 100} />
                </div>
                <div className="place__bid">
                  <Skeleton width={windowSize.width > 576 && 100} height={40} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AuctionDetails.propTypes = {
  onAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  bidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setBidders: PropTypes.func.isRequired,
};

export default AuctionDetails;
