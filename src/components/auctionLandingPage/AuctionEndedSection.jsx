import React, { useState, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { utils, BigNumber } from 'ethers';
import warningIcon from '../../assets/images/Exclamation.svg';
import smallCongratsIcon from '../../assets/images/congrats-small.png';
import { useAuthContext } from '../../contexts/AuthContext';
import Button from '../button/Button';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import infoIcon from '../../assets/images/icon.svg';
import bidIcon from '../../assets/images/bid_icon.svg';
import { claimAuctionFunds } from '../../utils/api/auctions';
import { shortenEthereumAddress } from '../../utils/helpers/format';
import { getRewardTierSpanStyles } from '../../utils/helpers';

const AuctionEndedSection = ({
  currentBid,
  bidders,
  numberOfWinners,
  rewardTiersSlots,
  setShowBidRankings,
  onAuction,
  winningSlot,
  slotsInfo,
  setShowLoading,
  ethPrice,
  currencyIcon,
  isWinningBid,
}) => {
  const history = useHistory();

  const { address, universeAuctionHouseContract, yourBalance, setYourBalance } = useAuthContext();
  const { setActiveTxHashes, activeTxHashes } = useMyNftsContext();

  const [mySlot, setMySlot] = useState(null);
  const [mySlotIndex, setMySlotIndex] = useState(-1);
  const [isAuctionner, setIsAuctioneer] = useState(address === onAuction.artist.address);

  const [claimableFunds, setClaimableFunds] = useState(0);
  const [unreleasedFunds, setUnreleasedFunds] = useState(0);
  const [showUnreleasedFundsTooltip, setShowUnreleasedFundsTooltip] = useState(false);
  const [showClaimableFundsTooltip, setShowClaimableFundsTooltip] = useState(false);
  const [slotsToWithdraw, setSlotsToWithdraw] = useState([]);

  useEffect(async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [slotIndex, slotInfo] of Object.entries(slotsInfo)) {
      if (slotInfo.winner === utils.getAddress(address)) {
        setMySlot(slotInfo);
        setMySlotIndex(slotIndex);
        break;
      } else if (
        slotInfo.winner === '0x0000000000000000000000000000000000000000' &&
        slotInfo.revenueCaptured &&
        slotInfo.totalWithdrawnNfts.toNumber() !== slotInfo.totalDepositedNfts.toNumber()
      ) {
        setSlotsToWithdraw([...slotsToWithdraw, +slotIndex]);
      }
    }
  }, [slotsInfo]);

  const getAuctionRevenue = async () => {
    if (universeAuctionHouseContract && Object.values(slotsInfo).length) {
      const revenueToClaim = await universeAuctionHouseContract.auctionsRevenue(
        onAuction.auction.onChainId
      );

      const totalBids = Object.values(slotsInfo).reduce(
        (acc, slot) => acc.add(slot.winningBidAmount),
        BigNumber.from('0')
      );

      const toClaim = utils.formatEther(revenueToClaim);
      setClaimableFunds(toClaim);
      console.log('available funds to claim:');
      console.log(toClaim);

      const unreleased =
        utils.formatEther(totalBids.sub(revenueToClaim)) - Number(onAuction.auction.revenueClaimed);

      setUnreleasedFunds(unreleased);
      console.log('unreleased funds:');
      console.log(unreleased);
    }
  };

  useEffect(() => {
    getAuctionRevenue();
  }, [universeAuctionHouseContract, slotsInfo]);

  const withdrawBid = async () => {
    try {
      let tx = null;
      if (onAuction.auction.tokenSymbol === 'ETH') {
        tx = await universeAuctionHouseContract.withdrawEthBid(onAuction.auction.onChainId);
      } else {
        tx = await universeAuctionHouseContract.withdrawERC20Bid(onAuction.auction.onChainId);
      }
      setShowLoading(true);
      setActiveTxHashes([tx.hash]);
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        // This is temp until the scraper handles bids
        setShowLoading(false);
        setActiveTxHashes([]);
        setYourBalance(parseFloat(yourBalance) + parseFloat(currentBid.amount));
        setCurrentBid(null);
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);
      console.log(err);
    }
  };

  const handleClaimNfts = async () => {
    try {
      const tx = await universeAuctionHouseContract.claimERC721Rewards(
        onAuction.auction.onChainId,
        +mySlotIndex,
        mySlot.totalDepositedNfts
      );
      setShowLoading(true);
      setActiveTxHashes([tx.hash]);

      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        // This modal will be closed upon recieving notifyERC721Claimed event
        setMySlot({ ...mySlot, totalWithdrawnNfts: mySlot.totalDepositedNfts });
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);
    }
  };

  const handleClaimFunds = async () => {
    try {
      const tx = await universeAuctionHouseContract.distributeCapturedAuctionRevenue(
        onAuction.auction.onChainId
      );
      setShowLoading(true);
      setActiveTxHashes([tx.hash]);

      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        // This modal will be closed upon receiving Auction revenue claimed event handleAuctionWithdrawnRevenueEvent
        setClaimableFunds(0);
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);

      console.log(err);
    }
  };

  const handleWithdrawNfts = async () => {
    try {
      const txs = [...slotsToWithdraw];
      const txCalls = txs.map(async (slotIndex) => {
        const slot = slotsInfo[slotIndex];
        const tx = await universeAuctionHouseContract.withdrawERC721FromNonWinningSlot(
          onAuction.auction.onChainId,
          slotIndex,
          slot.totalDepositedNfts
        );
        setShowLoading(true);
        setActiveTxHashes([...activeTxHashes, tx.hash]);
        // eslint-disable-next-line no-await-in-loop
        const txReceipt = await tx.wait();
        return txReceipt.status;
      });
      const txReceipts = await Promise.all(txCalls);
      const hasFailedTransaction = txReceipts.includes(0);

      if (!hasFailedTransaction) {
        setSlotsToWithdraw([]);
      }
      setShowLoading(false);
      setActiveTxHashes([]);
    } catch (err) {
      console.log(err);
      setActiveTxHashes([]);
      setShowLoading(false);
    }
  };

  return isAuctionner ? (
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
      <div className="footer">
        <div className="funds-and-balance">
          <div className="unreleased-funds" style={{ borderRight: '1px solid rgba(0,0,0,10%)' }}>
            <div className="head">
              <span>Unreleased funds</span>
              <span
                onMouseOver={() => setShowUnreleasedFundsTooltip(true)}
                onFocus={() => setShowUnreleasedFundsTooltip(true)}
                onMouseLeave={() => setShowUnreleasedFundsTooltip(false)}
                onBlur={() => setShowUnreleasedFundsTooltip(false)}
              >
                <img src={infoIcon} alt="Info Icon" />
              </span>
              {showUnreleasedFundsTooltip && (
                <div className="info-text1">
                  <p>
                    For the auctioneer to be able to collect their winnings and for the users to be
                    able to claim their NFTs the rewards need to be released first.
                  </p>
                </div>
              )}
            </div>
            <div className="balance-body">
              <span className="value-section">
                <img src={bidIcon} alt="unreleased funds" />
                <span className="value">
                  {unreleasedFunds}
                  <span className="dollar-val">~${Math.round(unreleasedFunds * ethPrice)}</span>
                </span>
              </span>
              <Button
                disabled={!Object.values(slotsInfo).some((slot) => !slot.revenueCaptured)}
                style={{ width: 180 }}
                className="light-button"
                onClick={() =>
                  history.push('/release-rewards', {
                    auctionData: onAuction,
                    myBid: currentBid,
                    view: isAuctionner ? 'Auctioneer' : 'Bidder',
                    bidders,
                    rewardTiersSlots,
                    winningSlot,
                    slotsInfo,
                    mySlot,
                    mySlotIndex,
                    backButtonText: onAuction.auction.headline,
                  })
                }
              >
                Release rewards
              </Button>
            </div>
          </div>
          <div className="available-balance" style={{ marginLeft: 50 }}>
            <div className="head">
              <span>Available balance</span>
              <span
                onMouseOver={() => setShowClaimableFundsTooltip(true)}
                onFocus={() => setShowClaimableFundsTooltip(true)}
                onMouseLeave={() => setShowClaimableFundsTooltip(false)}
                onBlur={() => setShowClaimableFundsTooltip(false)}
              >
                <img src={infoIcon} alt="Info Icon" />
              </span>
              {showClaimableFundsTooltip && (
                <div className="info-text2">
                  <p>This is the released reward amount availble for claiming</p>
                </div>
              )}
            </div>
            <div className="balance-body">
              <span className="value-section">
                <img src={bidIcon} alt="unreleased funds" />
                <span className="value">
                  {claimableFunds}
                  <span className="dollar-val">~${Math.round(claimableFunds * ethPrice)}</span>
                </span>
              </span>
              <Button
                className="light-button"
                disabled={!+claimableFunds}
                onClick={handleClaimFunds}
              >
                Claim funds
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : !isWinningBid ? (
    <Animated animationIn="zoomIn">
      <div className="ended__result">
        <div className="content">
          <h2 className="title">Unfortunately, your bid didn’t win</h2>
          <p className="desc">
            You are able to withdraw your funds by clicking the Withdraw button below. You can still
            buy individual NFTs from other sellers on NFT marketplaces.
          </p>
          <div className="view__rankings">
            <button type="button" onClick={() => setShowBidRankings(true)}>
              View rankings
            </button>
          </div>
        </div>
        <div className="footer">
          <Button disabled={!currentBid} onClick={withdrawBid} className="light-button">
            Withdraw
          </Button>
        </div>
      </div>
    </Animated>
  ) : (
    <Animated animationIn="zoomIn">
      <div className="ended__result">
        <div className="content">
          <div className="icon">
            <img src={smallCongratsIcon} alt="Congrats" />
          </div>
          <h2 className="title">Congratulations!</h2>
          <p className="desc">
            Your bid won the <b>{winningSlot?.name}</b> tier. You can claim your NFTs by clicking
            the button below
          </p>
          <div className="view__rankings">
            <button type="button" onClick={() => setShowBidRankings(true)}>
              View rankings
            </button>
          </div>
          {!mySlot ? (
            <div className="warning__div">
              <img src={warningIcon} alt="" />
              <p>
                The auctions rewards need to be released first. Without this step, the auctioneer
                will not be able to collect his earnings and the bidders will not be able to claim
                their NFTs.
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="footer">
          {Object.values(slotsInfo).some((slot) => !slot.revenueCaptured) ? (
            <Button
              className="light-button"
              onClick={() =>
                history.push('/release-rewards', {
                  auctionData: onAuction,
                  myBid: currentBid,
                  view: isAuctionner ? 'Auctioneer' : 'Bidder',
                  bidders,
                  rewardTiersSlots,
                  winningSlot,
                  slotsInfo,
                  mySlot,
                  mySlotIndex,
                  backButtonText: onAuction.auction.headline,
                })
              }
            >
              Release rewards
            </Button>
          ) : (
            <></>
          )}

          <Button
            className="light-button"
            disabled={
              !mySlot ||
              !mySlot.revenueCaptured ||
              mySlot.totalDepositedNfts.toNumber() === mySlot.totalWithdrawnNfts.toNumber()
            }
            onClick={handleClaimNfts}
          >
            Claim NFTs
          </Button>
        </div>
      </div>
    </Animated>
  );
};
AuctionEndedSection.propTypes = {
  currentBid: PropTypes.oneOfType([PropTypes.object]).isRequired,
  numberOfWinners: PropTypes.number.isRequired,
  setShowBidRankings: PropTypes.func.isRequired,
  onAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  winningSlot: PropTypes.number.isRequired,
  bidders: PropTypes.oneOfType([PropTypes.array]).isRequired,
  rewardTiersSlots: PropTypes.oneOfType([PropTypes.array]).isRequired,
  slotsInfo: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setShowLoading: PropTypes.func.isRequired,
  ethPrice: PropTypes.number.isRequired,
  currencyIcon: PropTypes.string,
  isWinningBid: PropTypes.bool.isRequired,
};

AuctionEndedSection.defaultProps = {
  currencyIcon: '',
};
export default AuctionEndedSection;
