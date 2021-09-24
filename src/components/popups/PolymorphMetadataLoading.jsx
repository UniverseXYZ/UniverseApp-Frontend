import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import './PopupStyle.scss';
import closeIcon from '../../assets/images/cross.svg';

const PolymorphMetadataLoading = ({ onClose }) => (
  <div className="loading-div popup-div" id="metadata-loading-popup-div">
    <div className="loading-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
    <button type="button" className="popup-close" onClick={onClose}>
      <img src={closeIcon} alt="" />
    </button>
    <div className="loading-text">
      <p>
        <span>Your new polymorph is being assembled... </span>
        <span>You will see it&apos;s new morphed look in a few moments.</span>
        <span>Be prepared!</span>
      </p>
    </div>
    <div className="loading-btns">
      <Button onClick={onClose} className="light-border-button">
        Close
      </Button>
    </div>
  </div>
);

PolymorphMetadataLoading.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PolymorphMetadataLoading;
