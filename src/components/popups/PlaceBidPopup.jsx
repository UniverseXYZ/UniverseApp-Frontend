import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import closeIcon from '../../assets/images/close-menu.svg';
import currencyIcon from '../../assets/images/currency-eth.svg';
import infoIcon from '../../assets/images/icon.svg';
import bidSubmittedIcon from '../../assets/images/bid-submitted.png';
import Button from '../button/Button.jsx';
import AppContext from '../../ContextAPI';
import { placeETHBid } from '../../utils/api/services';

const PlaceBidPopup = ({
  onClose,
  onAuctionId,
  onAuctionTitle,
  onArtistName,
  onBidders,
  onSetBidders,
}) => {
  const { loggedInArtist, myBalance, setMyBalance } = useContext(AppContext);
  const PLACEHOLDER_SERVICE__FEE = 0.105;
  const [yourBid, setYourBid] = useState('');
  const [totalBidAmount, setTotalBidAmount] = useState(0);
  const [showServiceFeeInfo, setShowServiceFeeInfo] = useState(false);
  const [showTotalBidAmountInfo, setShowTotalBidAmountInfo] = useState(false);
  const [showBidEligibleInfo, setShowBidEligibleInfo] = useState(false);
  const [showBidSubmitted, setShowBidSubmitted] = useState(false);
  const [rewardTier, setRewardTier] = useState('');
  const [error, setError] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleInputChange = (val) => {
    setClicked(false);
    if (!val || val.match(/^\d{1,}(\.\d{0,4})?$/)) {
      setYourBid(val);
      if (!val) {
        if (PLACEHOLDER_SERVICE__FEE) {
          setTotalBidAmount(PLACEHOLDER_SERVICE__FEE);
        } else {
          setTotalBidAmount(0);
        }
      } else if (!val.endsWith('.')) {
        if (PLACEHOLDER_SERVICE__FEE) {
          setTotalBidAmount(PLACEHOLDER_SERVICE__FEE + parseFloat(val));
        } else {
          setTotalBidAmount(0 + parseFloat(val));
        }
      }
      if (val && !val.endsWith('.') && val < myBalance) {
        setError('');
      }
      // just for testing
      if (val <= 20) {
        setRewardTier('Silver');
      } else if (val > 20 && val <= 40) {
        setRewardTier('Gold');
      } else if (val > 40) {
        setRewardTier('Platinum');
      }
    }
  };

  const handlePlaceBidClick = () => {
    setClicked(true);
    if (!yourBid) {
      setError('"Your bid" field is required.');
    } else if (yourBid.endsWith('.')) {
      setError('Incorrect bid amount.');
    } else if (parseFloat(yourBid) > myBalance) {
      setError('Not enough funds');
    } else if (!loggedInArtist.name) {
      setError('Please first fill in your profile.');
    } else {
      setError('');
    }
  };

  useEffect(async () => {
    if (clicked) {
      if (!error) {
        try {
          await placeETHBid(auctionFactoryContract, onAuctionId, yourBid);

          setShowBidSubmitted(true);
          setYourBalance(parseFloat(yourBalance) - parseFloat(yourBid));
          setMyBalance(parseFloat(myBalance) - parseFloat(yourBid));
          const newBidders = [...onBidders];

          newBidders.push({
            id: uuid(),
            aucionId: onAuctionId,
            artistId: loggedInArtist.id,
            name: loggedInArtist.name,
            bid: parseFloat(yourBid),
            rewardTier,
          });
          onSetBidders(newBidders);
        } catch (e) {
          console.log(e?.error?.message);
        }
      }
    }
  }, [error, clicked]);

  useEffect(() => {
    if (PLACEHOLDER_SERVICE__FEE) {
      setTotalBidAmount(PLACEHOLDER_SERVICE__FEE);
    } else {
      setTotalBidAmount(0);
    }
  }, []);

  return (
    <div className="place__bid__popup">
      <img
        className="close__popup"
        onClick={onClose}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      {!showBidSubmitted ? (
        <>
          <h1 className="title">Place a bid</h1>
          <p className="desc">
            You are about to place a bid <br /> for <b>{onAuctionTitle}</b> by <b>{onArtistName}</b>
          </p>
          <div className="bid__form">
            <span>Your bid</span>
            <input
              id="your-bid"
              type="text"
              placeholder="Enter your bid amount"
              value={yourBid}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <div className="currency">
              <img src={currencyIcon} alt="Currency ETH" />
              <span>ETH</span>
            </div>
          </div>
          {yourBid && !yourBid.endsWith('.') && (
            <div
              className="info"
              onMouseEnter={() => setShowBidEligibleInfo(true)}
              onMouseLeave={() => setShowBidEligibleInfo(false)}
            >
              Your bid is eligible to win a{' '}
              <span
                style={{
                  color:
                    rewardTier === 'Silver'
                      ? '#BCBCBC'
                      : rewardTier === 'Gold'
                      ? '#DDBC45'
                      : '#80CCDF',
                }}
              >
                {rewardTier} tier
              </span>
              <div className="bid__eligible">
                <img src={infoIcon} alt="Info" />
                {showBidEligibleInfo && (
                  <Animated animationIn="zoomIn">
                    <div className="bid__eligible__info">
                      This is just an estimate that is made based on the current bids and does not
                      guarantee you are going to win
                    </div>
                  </Animated>
                )}
              </div>
            </div>
          )}
          <div className="total">
            <div className="total_row">
              <div className="label">Your balance</div>
              <div className="value">{`${myBalance.toString().substring(0, 5)} ETH`}</div>
            </div>
            <div className="total_row">
              <div
                className="label"
                onMouseEnter={() => setShowServiceFeeInfo(true)}
                onMouseLeave={() => setShowServiceFeeInfo(false)}
              >
                <span>Service fee</span>
                <div className="service__fee">
                  <img src={infoIcon} alt="Info" />
                  {showServiceFeeInfo && (
                    <Animated animationIn="zoomIn">
                      <div className="service__fee__info">
                        We are decentralization maxis and our goal is to empower the creators and
                        community to create, buy and sell digital art in a feeless way.
                      </div>
                    </Animated>
                  )}
                </div>
              </div>
              <div className="value">
                {PLACEHOLDER_SERVICE__FEE ? `${PLACEHOLDER_SERVICE__FEE} ETH` : 'No fees, boom!'}
              </div>
            </div>
            <div className="total_row">
              <div
                className="label"
                onMouseEnter={() => setShowTotalBidAmountInfo(true)}
                onMouseLeave={() => setShowTotalBidAmountInfo(false)}
              >
                <span>Total bid amount</span>
                <div className="total__bid__amount">
                  <img src={infoIcon} alt="Info" />
                  {showTotalBidAmountInfo && (
                    <Animated animationIn="zoomIn">
                      <div className="total__bid__amount__info">
                        Keep in mind that your funds will be used only if your bid wins a certain
                        tier. If you don&apos;t win, you will be able to withdraw your funds by
                        clicking the withdraw button that will become active after the auction ends.
                      </div>
                    </Animated>
                  )}
                </div>
              </div>
              <div className="value">{`${totalBidAmount.toString().substring(0, 5)} ETH`}</div>
            </div>
          </div>
          <div className="place__bid__btn">
            <Button className="light-button w-100" onClick={handlePlaceBidClick} disabled={!!error}>
              Place a bid
            </Button>
          </div>
          {error && (
            <Animated animationIn="fadeInUp">
              <p className="errors">{error}</p>
            </Animated>
          )}
        </>
      ) : (
        <>
          <Animated animationIn="zoomIn">
            <div className="congrats__icon">
              <img src={bidSubmittedIcon} alt="Bid Submitted" />
            </div>
            <h1 className="congrats__title">Congratulations!</h1>
            <p className="congrats__desc">
              Your bid for <b>{onAuctionTitle}</b> by <b>{onArtistName}</b> was successfully
              submitted
            </p>
            <div className="congrats__close">
              <Button className="light-button" onClick={onClose}>
                Close
              </Button>
            </div>
          </Animated>
        </>
      )}
    </div>
  );
};

PlaceBidPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAuctionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onAuctionTitle: PropTypes.string.isRequired,
  onArtistName: PropTypes.string.isRequired,
  onBidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onSetBidders: PropTypes.func.isRequired,
};

export default PlaceBidPopup;
