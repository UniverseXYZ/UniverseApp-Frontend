import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { utils } from 'ethers';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/close-menu.svg';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadingPopup from './LoadingPopup.jsx';
import { useMyNftsContext } from '../../contexts/MyNFTsContext.jsx';
import { useAuctionContext } from '../../contexts/AuctionContext.jsx';

const CancelBidPopup = ({ auction, close, setCurrentBid, myBid }) => {
  const { yourBalance, setYourBalance } = useAuthContext();
  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setshowSuccess] = useState(false);

  const { setActiveTxHashes } = useMyNftsContext();
  const { universeAuctionHouseContract } = useAuthContext();

  const cancelBidOnBE = async () => {
    setShowLoading(true);

    const placeBidResult = await cancelAuctionBid(auction.id);

    console.log(placeBidResult);
    setShowLoading(false);
    setShowSuccess(true);
  };

  const updateBids = () => {
    let newBidders = [...onBidders];
    const existingBidderIndex = newBidders.map((bidder) => bidder.user.address).indexOf(address);
    if (existingBidderIndex >= 0) {
      newBidders = newBidders.splice(existingBidderIndex, 1);
      newBidders.sort((a, b) => b.amount - a.amount);
      onSetBidders(newBidders);
    }
  };

  const handleCancelBidClick = async () => {
    try {
      let bidTx = null;
      if (auction.tokenSymbol === 'ETH') {
        bidTx = await universeAuctionHouseContract.withdrawEthBid(auction.onChainId);
      } else {
        bidTx = await universeAuctionHouseContract.withdrawERC20Bid(auction.onChainId);
      }
      setShowLoading(true);
      setActiveTxHashes([bidTx.hash]);
      const txReceipt = await bidTx.wait();
      if (txReceipt.status === 1) {
        // This is temp until the scraper handles bids
        await cancelBidOnBE();
        updateBids();
        setShowSuccess(true);
        setYourBalance(parseFloat(yourBalance) - parseFloat(myBid));
        setShowLoading(false);
        setActiveTxHashes([]);
        setYourBalance(parseFloat(yourBalance) + parseFloat(myBid.bid));
        setCurrentBid(null);
        close();
      }
      // await saveBidToBE();
    } catch (err) {
      setShowLoading(false);
      setActiveTxHashes([]);
      console.log(err);
      // setError(err.error?.message);
    }
  };

  return (
    <div className="leave__popup">
      <img className="close" src={closeIcon} alt="Close" onClick={close} aria-hidden="true" />
      <h1>Are you sure you want to cancel your bid?</h1>
      <p>
        Your bid will be cancelled and the funds returned to your wallet. If you change your mind,
        you will be able to bid on the auction again as long as it is still open.
      </p>
      <div className="button__div">
        <Button className="light-button" onClick={handleCancelBidClick}>
          Yes, cancel
        </Button>
        <Button className="light-border-button" onClick={close}>
          No, keep it
        </Button>
      </div>
      <Popup open={showLoading} closeOnDocumentClick={false}>
        <LoadingPopup
          text="The transaction is in progress. Keep this window opened. Navigating away from the page will reset the curent progress."
          onClose={() => setShowLoading(false)}
          contractInteraction
        />
      </Popup>
    </div>
  );
};

CancelBidPopup.propTypes = {
  close: PropTypes.func.isRequired,
  setCurrentBid: PropTypes.func.isRequired,
  myBid: PropTypes.string.isRequired,
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CancelBidPopup;
