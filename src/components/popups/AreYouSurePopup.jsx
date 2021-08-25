import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';

const AreYouSurePopup = ({ onClose }) => {
  const name = '';

  return (
    <div className="popup-div modal-close-popup">
      <button type="button" className="popup-close" onClick={onClose}>
        <img src={closeIcon} alt="" />
      </button>
      <div className="popup-title">
        <h4>Are you sure?</h4>
      </div>
      <div className="popup-text">
        <p>
          Are you sure you want to close this?
          <br />
          All the progress will be lost.
        </p>
      </div>
      <div className="popup-btns">
        <Button onClick={onClose} className="light-button">
          Discard and close
        </Button>
        <Button className="light-border-button" onClick={onClose}>
          Continue editing
        </Button>
      </div>
    </div>
  );
};

AreYouSurePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AreYouSurePopup;
