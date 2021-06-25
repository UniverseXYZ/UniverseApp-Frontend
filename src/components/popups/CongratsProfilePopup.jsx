import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import AppContext from '../../ContextAPI.js';

const CongratsProfilePopup = ({ onClose }) => {
  const { loggedInArtist } = useContext(AppContext);
  const history = useHistory();
  return (
    <div className="popup-div congrats-popup">
      <button type="button" className="popup-close" onClick={onClose}>
        <img src={closeIcon} alt="" />
      </button>
      <div className="popup-title">
        <h4>Congratulations!</h4>
      </div>
      <div className="popup-text">
        <p>Your profile was successfully set up.</p>
      </div>
      <div className="popup-btns">
        <Button
          className="light-border-button"
          onClick={() => {
            history.push(`/${loggedInArtist.universePageAddress}`, { id: loggedInArtist.id });
          }}
        >
          Go to your Universe page
        </Button>
      </div>
    </div>
  );
};

CongratsProfilePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CongratsProfilePopup;
