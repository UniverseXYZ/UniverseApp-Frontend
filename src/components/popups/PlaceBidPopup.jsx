import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import { BigNumber, utils } from 'ethers';
import { BigNumber as bigNumber } from 'bignumber.js';
import closeIcon from '../../assets/images/close-menu.svg';
import currencyIcon from '../../assets/images/currency-eth.svg';
import infoIcon from '../../assets/images/icon.svg';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import { useAuthContext } from '../../contexts/AuthContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { getERC20Contract } from '../../utils/helpers/pureFunctions/auctions';

const PlaceBidPopup = ({
  onClose,
  auction,
  artistName,
  onBidders,
  rewardTiers,
  setShowLoading,
  currentBid,
  setLoadingText,
}) => {
  const floatNumberRegex = /([0-9]*[.])?[0-9]+/;
  const verifyBidLoadingText = 'Your bid tx is being verified. This will take a few seconds.';
  const { yourBalance, universeAuctionHouseContract, address, loggedInArtist, signer } =
    useAuthContext();
  const { setActiveTxHashes } = useMyNftsContext();
  const [yourBid, setYourBid] = useState('');
  const [showServiceFeeInfo, setShowServiceFeeInfo] = useState(false);
  const [showTotalBidAmountInfo, setShowTotalBidAmountInfo] = useState(false);
  const [showBidEligibleInfo, setShowBidEligibleInfo] = useState(false);
  const [rewardTier, setRewardTier] = useState(null);
  const [minBid, setMinBid] = useState(0);
  const [myBidSlotIndex, setMyBidSlotIndex] = useState(-1);
  const [error, setError] = useState('');
  const [allowance, setAllowance] = useState(0);
  const [balance, setBalance] = useState(0);

  const setERC20Info = async () => {
    if (
      auction.tokenSymbol.toLowerCase() !== 'eth' &&
      signer &&
      universeAuctionHouseContract &&
      address
    ) {
      const erc20Contract = getERC20Contract(auction.tokenAddress, signer);
      const erc20Allowance = await erc20Contract.allowance(
        address,
        universeAuctionHouseContract.address
      );
      const erc20Balance = await erc20Contract.balanceOf(address);

      setAllowance(+utils.formatEther(erc20Allowance));
      setBalance(+utils.formatEther(erc20Balance));
    } else {
      setBalance(yourBalance);
      setAllowance(yourBalance);
    }
  };
  useEffect(() => {
    setERC20Info();
  }, [signer, universeAuctionHouseContract, address]);

  /**
   *
   * @param {*} val -> string
   * @returns void
   */
  const handleInputChange = (val) => {
    // return if value is less than 1 wei as on opensea
    const safeVal = bigNumber(val).toFixed();
    const maxCharsLength = 20;
    if (safeVal.length > maxCharsLength) return;
    setYourBid(safeVal);
    if (safeVal && !safeVal.match(floatNumberRegex)) {
      setError('Invalid bid');
    } else {
      setError('');
      // TODO: Compute eligible reward tier based on other bids
      const rankedBids = [...onBidders, { amount: safeVal }]
        .map((bid) => bid.amount.toString())
        .sort((a, b) => {
          const safeA = bigNumber(a);
          const safeB = bigNumber(b);
          return safeB.minus(safeA);
        });

      const myBidIdx = rankedBids.indexOf(safeVal);

      let rewardSlotCounter = 0;
      let hasFound = false;
      rewardTiers.forEach((tier) => {
        rewardSlotCounter += tier.numberOfWinners;
        if (myBidIdx < rewardSlotCounter && !hasFound) {
          setRewardTier(tier);
          const slot = tier.slots.find((s) => s.index === myBidIdx + 1);
          setMyBidSlotIndex(myBidIdx + 1);
          setMinBid(slot?.minimumBid);
          hasFound = true;
        }
      });

      if (!hasFound) {
        setRewardTier(null);
      }
    }
  };

  const handlePlaceBid = async () => {
    if (!yourBid) {
      setError('"Your bid" field is required.');
      return;
    }

    if (Number.isNaN(+yourBid)) {
      setError('Incorrect bid amount.');
      return;
    }

    if (parseFloat(yourBid) > balance) {
      setError('Not enough funds');
      return;
    }

    if (parseFloat(yourBid) < minBid) {
      setError(`Bid must be greater or equal to the reserve value for the slot: ${minBid}`);
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
        setLoadingText(verifyBidLoadingText);
        setBalance(parseFloat(balance) - parseFloat(yourBid));
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);
      console.log(err);
      setError(err.error?.message);
    }
  };

  const handleIncreaseAllowance = async () => {
    try {
      const erc20Contract = getERC20Contract(auction.tokenAddress, signer);
      const approveTx = await erc20Contract.approve(
        universeAuctionHouseContract.address,
        BigNumber.from(utils.parseEther(yourBid))
      );

      setShowLoading(true);
      setActiveTxHashes([approveTx.hash]);
      const approveTxReceipt = await approveTx.wait();

      if (approveTxReceipt.status === 1) {
        setAllowance(+yourBid);
        setShowLoading(true);
        setActiveTxHashes([]);
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);
      console.log(err);
      setError(err.error?.message);
    }
  };

  const yourBidSafe = bigNumber(yourBid || '0');
  const currentBidAmmountSafe = bigNumber(currentBid?.amount || '0');
  const totalBid = yourBidSafe.plus(currentBidAmmountSafe);

  return (
    <div className="place__bid__popup">
      <img
        className="close__popup"
        onClick={onClose}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
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
            Your bid is eligible to win slot {myBidSlotIndex} of{' '}
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
            <div className="value">{`${balance.toString().substring(0, 5)} ${
              auction.tokenSymbol
            }`}</div>
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
            <div className="value">{`${yourBid || 0} ${auction.tokenSymbol}`}</div>
          </div>
          <div className="total_row">
            <div className="label">Total bid</div>
            <div className="value">{`${totalBid} ${auction.tokenSymbol}`}</div>
          </div>
        </div>
        <div className="place__bid__btn">
          {auction.tokenSymbol.toLowerCase() !== 'eth' ? (
            <Button
              style={{ marginBottom: 20 }}
              className="light-button w-100"
              onClick={handleIncreaseAllowance}
              disabled={+yourBid <= allowance}
            >
              Approve {auction.tokenSymbol}
            </Button>
          ) : (
            <></>
          )}

          <Button
            className="light-button w-100"
            onClick={handlePlaceBid}
            disabled={+yourBid > allowance || !+yourBid || !!error}
          >
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
    </div>
  );
};

PlaceBidPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  artistName: PropTypes.string.isRequired,
  onBidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  rewardTiers: PropTypes.oneOfType([PropTypes.array]).isRequired,
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setShowLoading: PropTypes.func.isRequired,
  currentBid: PropTypes.oneOfType([PropTypes.object]),
  setLoadingText: PropTypes.func.isRequired,
};

PlaceBidPopup.defaultProps = {
  currentBid: null,
};

export default PlaceBidPopup;
