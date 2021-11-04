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
}) => {
  const history = useHistory();

  const { address, universeAuctionHouseContract, yourBalance, setYourBalance } = useAuthContext();
  const { setActiveTxHashes } = useMyNftsContext();

  const [mySlot, setMySlot] = useState(null);
  const [mySlotIndex, setMySlotIndex] = useState(-1);
  const [isAuctionner, setIsAuctioneer] = useState(address === onAuction.artist.address);

  const [claimableFunds, setClaimableFunds] = useState(0);
  const [unreleasedFunds, setUnreleasedFunds] = useState(0);

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
      const revenue = await universeAuctionHouseContract.auctionsRevenue(
        onAuction.auction.onChainId
      );

      const totalBids = Object.values(slotsInfo).reduce(
        (acc, slot) => acc.add(slot.winningBidAmount),
        BigNumber.from('0')
      );

      console.log('available funds to claim:');
      console.log(utils.formatEther(revenue));
      setClaimableFunds(utils.formatEther(revenue));

      console.log('unreleased funds:');
      console.log(utils.formatEther(totalBids.sub(revenue)));
      setUnreleasedFunds(utils.formatEther(totalBids.sub(revenue)));
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
        <div>Avalable balance: {claimableFunds}</div>
        <div>Unreleased funds: {unreleasedFunds}</div>
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
                })
              }
            >
              Release rewards
            </Button>
          ) : (
            <></>
          )}
          {isAuctionner ? (
            <Button className="light-button" disabled={!+claimableFunds} onClick={handleClaimFunds}>
              Claim funds
            </Button>
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
};
export default AuctionEndedSection;
