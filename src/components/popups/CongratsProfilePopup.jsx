import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import successImg from '../../assets/images/bid-submitted.png';
import { useAuthContext } from '../../contexts/AuthContext.jsx';

const CongratsProfilePopup = ({ onClose }) => {
  const { loggedInArtist } = useAuthContext();
  const history = useHistory();
  return (
    <div className="popup-div congrats-popup">
      <button type="button" className="popup-close" onClick={onClose}>
        <img src={closeIcon} alt="" />
      </button>
      <div className="congrats--icon">
        <img src={successImg} alt="Success" />
      </div>
      <div className="popup-title">
        <h4>Success!</h4>
      </div>
      <div className="popup-text">
        <p>Your profile was successfully set up.</p>
      </div>
      <div className="popup-btns">
        <Button
          className="light-button"
          onClick={() => {
            history.push(`/${loggedInArtist.universePageAddress}`, { id: loggedInArtist.id });
          }}
        >
          Go to my profile
        </Button>
      </div>
    </div>
  );
};

CongratsProfilePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CongratsProfilePopup;
