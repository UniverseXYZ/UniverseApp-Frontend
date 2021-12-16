import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Button from '../button/Button';
import closeIcon from '../../assets/images/cross.svg';
import congratsIcon from '../../assets/images/congrats.png';

const CongratsReleaseRewardsPopup = ({ onClose, auctionName, isAuctioneer, handleClaimNfts }) => {
  const history = useHistory();

  const modalText = isAuctioneer ? (
    <p>
      The rewards for the auction <span style={{ color: 'black' }}>{auctionName}</span> were
      successfully released. Now the auctioneer is able to collect his winnings and the bidders are
      able to claim their NFTs.
    </p>
  ) : (
    <p>
      The rewards for the auction <span style={{ color: 'black' }}>{auctionName}</span> were
      successfully released. Now you are able to claim your NFTs.
    </p>
  );

  return (
    <div className="popup-div congrats-popup">
      <button type="button" className="popup-close" onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </button>
      <div className="congrats--icon">
        <img src={congratsIcon} alt="congrats" />
      </div>
      <div className="popup-title">
        <h4>Success</h4>
      </div>
      <div className="popup-text">{modalText}</div>
      {isAuctioneer ? (
        <div className="popup-btns">
          <Button className="light-button" onClick={() => history.goBack()}>
            Visit landing page
          </Button>
          <Button className="light-border-button" onClick={onClose}>
            Close
          </Button>
        </div>
      ) : (
        <div className="popup-btns">
          <Button className="light-button" onClick={handleClaimNfts}>
            Claim NFTs
          </Button>
          <Button className="light-border-button" onClick={() => history.goBack()}>
            Go to auction
          </Button>
        </div>
      )}
    </div>
  );
};

CongratsReleaseRewardsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleClaimNfts: PropTypes.func.isRequired,
  auctionName: PropTypes.string.isRequired,
  isAuctioneer: PropTypes.bool.isRequired,
};

export default CongratsReleaseRewardsPopup;
