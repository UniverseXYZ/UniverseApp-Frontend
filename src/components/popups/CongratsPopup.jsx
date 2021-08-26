import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import checkIcon from '../../assets/images/bid-submitted.png';

const CongratsPopup = ({ onClose, backButtonText, title, message }) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <div className="popup-div congrats-popup">
      <button type="button" className="popup-close" onClick={onClose}>
        <img src={closeIcon} alt="" />
      </button>
      <div className="popup-title">
        <div className="congrats--icon">
          <img src={checkIcon} alt="Congrats" />
        </div>
        <h4>{title}</h4>
      </div>
      <div className="popup-text">
        <p>{message}</p>
      </div>
      <div className="popup-btns">
        <Button
          className="light-button"
          onClick={() => {
            onClose();
            history.push(
              location.pathname === '/create-tiers/my-nfts/create' ? '/create-tiers' : '/my-nfts'
            );
          }}
        >
          {backButtonText}
        </Button>
        <Button
          className="light-border-button"
          onClick={() =>
            history.push(
              location.pathname === '/create-tiers/my-nfts/create'
                ? '/create-tiers/my-nfts/create'
                : '/my-nfts/create'
            )
          }
        >
          Create more
        </Button>
      </div>
    </div>
  );
};

CongratsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  backButtonText: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

CongratsPopup.defaultProps = {
  backButtonText: 'Go to my NFTs',
  title: 'Congratulations!',
  message: '',
};

export default CongratsPopup;
