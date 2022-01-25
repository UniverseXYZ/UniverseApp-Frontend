import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/close-menu.svg';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadingPopup from './LoadingPopup.jsx';
import { useMyNftsContext } from '../../contexts/MyNFTsContext.jsx';

const CancelBidPopup = ({ auction, close }) => {
  const [showLoading, setShowLoading] = useState(false);

  const { setActiveTxHashes } = useMyNftsContext();
  const { universeAuctionHouseContract } = useAuthContext();

  /**
   * This method will trigger Smart Contract interaction event which will be catched by the BE and
   * emmited to the FE trough sockets. The socket event will trigger AuctionLandingPage.handleBidWithdrawnEvent() method
   */
  const handleCancelBidClick = async () => {
    try {
      let bidTx = null;
      if (auction.auction.tokenSymbol === 'ETH') {
        bidTx = await universeAuctionHouseContract.withdrawEthBid(auction.auction.onChainId);
      } else {
        bidTx = await universeAuctionHouseContract.withdrawERC20Bid(auction.auction.onChainId);
      }
      setShowLoading(true);
      setActiveTxHashes([bidTx.hash]);
      await bidTx.wait();
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
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CancelBidPopup;
