import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import { utils } from 'ethers';
import closeIcon from '../../assets/images/close-menu.svg';
import currencyIcon from '../../assets/images/currency-eth.svg';
import infoIcon from '../../assets/images/icon.svg';
import bidSubmittedIcon from '../../assets/images/bid-submitted.png';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import { useAuthContext } from '../../contexts/AuthContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { placeAuctionBid } from '../../utils/api/auctions';

const PlaceBidPopup = ({
  onClose,
  auction,
  artistName,
  onBidders,
  onSetBidders,
  rewardTiers,
  setShowLoading,
  currentBid,
  setCurrentBid,
}) => {
  const floatNumberRegex = /([0-9]*[.])?[0-9]+/;
  const { yourBalance, setYourBalance, universeAuctionHouseContract, address, loggedInArtist } =
    useAuthContext();
  const { setActiveTxHashes } = useMyNftsContext();
  console.log(loggedInArtist);
  const [yourBid, setYourBid] = useState('');
  const [showServiceFeeInfo, setShowServiceFeeInfo] = useState(false);
  const [showTotalBidAmountInfo, setShowTotalBidAmountInfo] = useState(false);
  const [showBidEligibleInfo, setShowBidEligibleInfo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rewardTier, setRewardTier] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (val) => {
    setYourBid(val);
    if (val && !val.match(floatNumberRegex)) {
      setError('Invalid bid');
    } else {
      setError('');
      // TODO: Compute eligible reward tier based on other bids
      const rankedBids = [...onBidders, { amount: +val }]
        .map((bid) => bid.amount)
        .sort((a, b) => b - a);
      console.log(rankedBids);
      const myBidIndex = rankedBids.indexOf(+val);
      console.log(myBidIndex);
      console.log(rewardTiers);

      let rewardSlotCounter = 0;
      let hasFound = false;
      rewardTiers.forEach((tier) => {
        rewardSlotCounter += tier.numberOfWinners;
        if (myBidIndex <= rewardSlotCounter) {
          setRewardTier(tier);
          hasFound = true;
        }
      });

      if (!hasFound) {
        setRewardTier(null);
      }
    }
  };

  const saveBidToBE = async () => {
    setShowLoading(true);

    const placeBidResult = await placeAuctionBid({
      auctionId: auction.id,
      amount: parseFloat(yourBid),
    });

    console.log(placeBidResult);
    setShowLoading(false);
    setShowSuccess(true);
  };

  const updateBids = () => {
    const newBidders = [...onBidders];
    const existingBidderIndex = newBidders.map((bidder) => bidder.address).indexOf(address);
    if (existingBidderIndex >= 0) {
      newBidders[existingBidderIndex].amount = +newBidders[existingBidderIndex].amount + +yourBid;
    } else {
      newBidders.push({
        id: loggedInArtist.id,
        amount: +yourBid,
        displayName: loggedInArtist.name,
        address,
      });
    }
    newBidders.sort((a, b) => b.amount - a.amount);
    onSetBidders(newBidders);
  };

  const handlePlaceBidClick = async () => {
    if (!yourBid) {
      setError('"Your bid" field is required.');
      return;
    }

    if (Number.isNaN(+yourBid)) {
      setError('Incorrect bid amount.');
      return;
    }

    if (parseFloat(yourBid) > yourBalance) {
      setError('Not enough funds');
      return;
    }

    if (parseFloat(yourBid) < parseFloat(auction.startingBid)) {
      setError('Bid must be greater or equal to the starting bid');
      return;
    }
    setError('');

    // TODO: Check if bid is winning any slot
    try {
      let bidTx = null;
      if (auction.tokenSymbol === 'ETH') {
        bidTx = await universeAuctionHouseContract.ethBid(auction.onChainId, {
          value: utils.parseEther(yourBid),
        });
      } else {
        bidTx = await universeAuctionHouseContract.erc20Bid(
          auction.onChainId,
          utils.parseEther(yourBid)
        );
      }
      setShowLoading(true);
      setActiveTxHashes([bidTx.hash]);
      const txReceipt = await bidTx.wait();
      if (txReceipt.status === 1) {
        // This is temp until the scraper handles bids
        await saveBidToBE();
        updateBids();
        setShowSuccess(true);
        setYourBalance(parseFloat(yourBalance) - parseFloat(yourBid));
        setShowLoading(false);
        setActiveTxHashes([]);
      }
      // await saveBidToBE();
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);
      console.log(err);
      setError(err.error?.message);
    }
  };

  return (
    <div className="place__bid__popup">
      <img
        className="close__popup"
        onClick={onClose}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      {!showSuccess ? (
        <>
          <h1 className="title">Place a bid</h1>
          <p className="desc">
            You are about to place a bid <br /> for <b>{auction.headline}</b> by <b>{artistName}</b>
          </p>
          <div className="bid__form">
            <span>Your bid</span>
            <Input
              id="your-bid"
              type="text"
              placeholder="Enter your bid amount"
              value={yourBid}
              onChange={(e) => handleInputChange(e.target.value)}
              hoverBoxShadowGradient
            />
            <div className="currency">
              <img src={currencyIcon} alt="Currency ETH" />
              <span>ETH</span>
            </div>
          </div>
          {rewardTier ? (
            <div
              className="info"
              onMouseEnter={() => setShowBidEligibleInfo(true)}
              onMouseLeave={() => setShowBidEligibleInfo(false)}
            >
              Your bid is eligible to win a{' '}
              <span
                style={{
                  color: rewardTier.color ? rewardTier.color : '#80CCDF',
                }}
              >
                {rewardTier.name}
              </span>
              <div className="bid__eligible">
                <img src={infoIcon} alt="Info" />
                {showBidEligibleInfo ? (
                  <Animated animationIn="zoomIn" style={{ position: 'relative', zIndex: 111 }}>
                    <div className="bid__eligible__info">
                      This is just an estimate that is made based on the current bids and does not
                      guarantee you are going to win
                    </div>
                  </Animated>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="total">
            <div className="total_row">
              <div className="label">Your balance</div>
              <div className="value">{`${yourBalance.toString().substring(0, 5)} ETH`}</div>
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
                  {showServiceFeeInfo ? (
                    <Animated animationIn="zoomIn" style={{ position: 'relative', zIndex: 111 }}>
                      <div className="service__fee__info">
                        We are decentralization maxis and our goal is to empower the creators and
                        community to create, buy and sell digital art in a feeless way.
                      </div>
                    </Animated>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="value">No fees, boom!</div>
            </div>
            <div className="total_row">
              <div
                className="label"
                onMouseEnter={() => setShowTotalBidAmountInfo(true)}
                onMouseLeave={() => setShowTotalBidAmountInfo(false)}
              >
                <span>Final bid amount</span>
                <div className="total__bid__amount">
                  <img src={infoIcon} alt="Info" />
                  {showTotalBidAmountInfo ? (
                    <Animated animationIn="zoomIn" style={{ position: 'relative', zIndex: 111 }}>
                      <div className="total__bid__amount__info">
                        Keep in mind that your funds will be used only if your bid wins a certain
                        tier. If you don&apos;t win, you will be able to withdraw your funds by
                        clicking the withdraw button that will become active after the auction ends.
                      </div>
                    </Animated>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="value">{`${yourBid || 0} ETH`}</div>
            </div>
            <div className="total_row">
              <div className="label">
                <span>Total bid</span>
              </div>
              <div className="value">{`${+yourBid + (+currentBid?.amount || 0)} ETH`}</div>
            </div>
          </div>
          <div className="place__bid__btn">
            <Button className="light-button w-100" onClick={handlePlaceBidClick} disabled={!!error}>
              Place a bid
            </Button>
          </div>
          {error ? (
            <Animated animationIn="fadeInUp">
              <p className="errors">{error}</p>
            </Animated>
          ) : (
            <></>
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
              Your bid for <b>{auction.headline}</b> by <b>{artistName}</b> was successfully
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
  artistName: PropTypes.string.isRequired,
  onBidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  rewardTiers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onSetBidders: PropTypes.func.isRequired,
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setShowLoading: PropTypes.func.isRequired,
  currentBid: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setCurrentBid: PropTypes.func.isRequired,
};

export default PlaceBidPopup;
