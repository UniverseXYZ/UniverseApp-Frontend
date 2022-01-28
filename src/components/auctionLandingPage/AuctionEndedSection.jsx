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
}) => {
  const history = useHistory();

  const { address, universeAuctionHouseContract, yourBalance, setYourBalance } = useAuthContext();
  const { setActiveTxHashes } = useMyNftsContext();

  const [mySlot, setMySlot] = useState(null);
  const [mySlotIndex, setMySlotIndex] = useState(-1);
  const [isAuctionner, setIsAuctioneer] = useState(address === onAuction.artist.address);

  const [claimableFunds, setClaimableFunds] = useState(0);
  const [unreleasedFunds, setUnreleasedFunds] = useState(0);
  const [showUnreleasedFundsTooltip, setShowUnreleasedFundsTooltip] = useState(false);
  const [showClaimableFundsTooltip, setShowClaimableFundsTooltip] = useState(false);

  useEffect(async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [slotIndex, slotInfo] of Object.entries(slotsInfo)) {
      if (slotInfo.winner === utils.getAddress(address)) {
        setMySlot(slotInfo);
        setMySlotIndex(slotIndex);
        break;
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

      console.log('available funds to claim:');
      console.log(utils.formatEther(revenueToClaim));
      setClaimableFunds(utils.formatEther(revenueToClaim));

      console.log('unreleased funds:');
      console.log(utils.formatEther(totalBids.sub(onAuction.auction.claimedFunds)));
      setUnreleasedFunds(utils.formatEther(totalBids.sub(onAuction.auction.claimedFunds)));
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
        setShowLoading(false);
        setActiveTxHashes([]);
        setMySlot({ ...mySlot, totalWithdrawnNfts: mySlot.totalDepositedNfts });
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);

      console.log(err);
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
        const result = await claimAuctionFunds({
          auctionId: onAuction.auction.id,
          amount: claimableFunds,
        });
        setShowLoading(false);
        setActiveTxHashes([]);
        setClaimableFunds(0);
      }
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);

      console.log(err);
    }
  };

  return !mySlot ? (
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
          <div className="warning__div">
            <img src={warningIcon} alt="" />
            <p>
              The auctions rewards need to be released first. Without this step, the auctioneer will
              not be able to collect his earnings and the bidders will not be able to claim their
              NFTs.
            </p>
          </div>
        </div>
        {/* <div>Avalable balance: {claimableFunds}</div>
        <div>Unreleased funds: {unreleasedFunds}</div> */}
        <div className="funds-and-balance">
          <div className="unreleased-funds">
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
                    })
                  }
                >
                  Release rewards
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>

          {isAuctionner ? (
            <div className="available-balance">
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
          ) : (
            <Button
              className="light-button"
              disabled={
                !mySlot ||
                !mySlot.revenueCaptured ||
                mySlot.totalDepositedNfts === mySlot.totalWithdrawnNfts
              }
              onClick={handleClaimNfts}
            >
              Claim NFTs
            </Button>
          )}
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
};
export default AuctionEndedSection;
