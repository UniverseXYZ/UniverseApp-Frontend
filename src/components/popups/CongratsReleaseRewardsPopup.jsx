import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Button from '../button/Button';
import closeIcon from '../../assets/images/cross.svg';
import congratsIcon from '../../assets/images/congrats.png';

const CongratsReleaseRewardsPopup = ({ onClose }) => {
  const history = useHistory();

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
      <div className="popup-text">
        <p>
          The rewards for the auction <span style={{ color: 'black' }}>Auction name</span> were
          successfully released. Now the auctioneer is able to collect his winnings and the bidders
          are able to claim their NFTs.
        </p>
      </div>
      <div className="popup-btns">
        <Button className="light-button" onClick={() => history.push('/my-auctions')}>
          Visit landing page
        </Button>
      </div>
    </div>
  );
};

CongratsReleaseRewardsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CongratsReleaseRewardsPopup;
