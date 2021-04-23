import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import './PopupStyle.scss';
import closeIcon from '../../assets/images/cross.svg';

const LoadingPopup = ({ onClose }) => (
  <div className="loading-div popup-div">
    <div className="loading-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
    <button className="popup-close" onClick={onClose}>
      <img src={closeIcon} alt="" />
    </button>
    <div className="loading-text">
      <p>
        Loading... do not click refresh or leave this page.
        <br />
        Just kidding, you can do whatever you want.
        <br />
        This is Ethereum!
      </p>
    </div>
    <div className="loading-btns">
      <Button onClick={onClose} className="light-border-button">
        Close
      </Button>
    </div>
  </div>
);

LoadingPopup.propTypes = {
  onClose: PropTypes.func,
};

export default LoadingPopup;
