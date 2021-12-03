import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import { useAuctionContext } from '../../contexts/AuctionContext';
import closeIcon from '../../assets/images/cross.svg';
import congratsicon from '../../assets/images/congrats.png';

const CongratsAuctionPopup = ({ onClose }) => {
  const history = useHistory();
  const { setSelectedTabIndex } = useAuctionContext();

  return (
    <div className="popup-div congrats-popup">
      <button
        type="button"
        className="popup-close"
        onClick={async () => {
          await onClose();
          history.push('/my-auctions');
        }}
      >
        <img src={closeIcon} alt="" />
      </button>
      <div className="congrats--icon">
        <img src={congratsicon} alt="congrats" />
      </div>
      <div className="popup-title">
        <h4>Congratulations!</h4>
      </div>
      <div className="popup-text">
        <p>
          Your auction was successfully set up. Now it’s time to set up your landing page, and
          launch!
        </p>
      </div>
      <div className="popup-btns">
        <Button
          className="light-button"
          onClick={async () => {
            const draftAuctionsTabIndex = 2; // 2 is the tab index of "Draft auctions"
            setSelectedTabIndex(draftAuctionsTabIndex);
            await onClose();
            history.push('/my-auctions');
          }}
        >
          Go to auctions
        </Button>
      </div>
    </div>
  );
};

CongratsAuctionPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CongratsAuctionPopup;
