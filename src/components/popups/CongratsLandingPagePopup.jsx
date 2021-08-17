import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Button from '../button/Button';
import closeIcon from '../../assets/images/cross.svg';
import congratsIcon from '../../assets/images/congrats.png';

const CongratsLandingPagePopup = ({ onClose }) => {
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
        <p>The landing page was successfully set up.</p>
      </div>
      <div className="popup-btns">
        <Button className="light-button" onClick={() => history.push('/my-auctions')}>
          Go to my auctions
        </Button>
      </div>
    </div>
  );
};

CongratsLandingPagePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CongratsLandingPagePopup;
