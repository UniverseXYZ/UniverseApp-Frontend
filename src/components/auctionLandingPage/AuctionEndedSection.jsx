import React, { useState, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { utils } from 'ethers';
import Popup from 'reactjs-popup';
import warningIcon from '../../assets/images/Exclamation.svg';
import smallCongratsIcon from '../../assets/images/congrats-small.png';
import { useAuthContext } from '../../contexts/AuthContext';
import Button from '../button/Button';
import LoadingPopup from '../popups/LoadingPopup';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';

const AuctionEndedSection = ({
  currentBid,
  bidders,
  numberOfWinners,
  rewardTiersSlots,
  setShowBidRankings,
  onAuction,
  winningSlot,
}) => {
  const { address, universeAuctionHouseContract, yourBalance, setYourBalance } = useAuthContext();
  const { setActiveTxHashes } = useMyNftsContext();

  const [winning, setWinning] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(async () => {
    if (universeAuctionHouseContract) {
      const winners = await universeAuctionHouseContract.getTopBidders(
        onAuction.auction.onChainId,
        numberOfWinners
      );
      const checkSumAddress = utils.getAddress(address);
      if (winners.indexOf(checkSumAddress) >= 0) {
        setWinning(true);
      }
    }
  }, [universeAuctionHouseContract]);

  const withdrawBid = async () => {
    try {
      let bidTx = null;
      if (onAuction.auction.tokenSymbol === 'ETH') {
        bidTx = await universeAuctionHouseContract.withdrawEthBid(onAuction.auction.onChainId);
      } else {
        bidTx = await universeAuctionHouseContract.withdrawERC20Bid(onAuction.auction.onChainId);
      }
      setShowLoading(true);
      setActiveTxHashes([bidTx.hash]);
      const txReceipt = await bidTx.wait();
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

  const history = useHistory();
  return !winning ? (
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
      <Popup open={showLoading} closeOnDocumentClick={false}>
        <LoadingPopup
          text="The transaction is in progress. Keep this window opened. Navigating away from the page will reset the curent progress."
          onClose={() => setShowLoading(false)}
          contractInteraction
        />
      </Popup>
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
        <div className="footer">
          <Button
            className="light-button"
            onClick={() =>
              history.push('/release-rewards', {
                auctionData: onAuction,
                myBid: currentBid,
                // view: address === onAuction.artist.address ? 'Auctioneer' : 'Bidder',
                view: 'Bidder',
                bidders,
                rewardTiersSlots,
                winningSlot,
              })
            }
          >
            Release rewards
          </Button>
          <Button className="light-button" disabled>
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
};
export default AuctionEndedSection;
