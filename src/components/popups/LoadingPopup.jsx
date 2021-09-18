import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import './PopupStyle.scss';
import closeIcon from '../../assets/images/cross.svg';

const LoadingPopup = ({ onClose, text }) => (
  <div className="loading-div popup-div" id="loading-popup-div">
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
      {text ? (
        <p>{text}</p>
      ) : (
        <p>
          <span>Loading... do not click refresh or leave this page. </span>
          <span>Just kidding, you can do whatever you want. </span>
          <span>This is Ethereum!</span>
        </p>
      )}
    </div>
    <div className="loading-btns">
      <Button onClick={onClose} className="light-border-button">
        Close
      </Button>
    </div>
  </div>
);

LoadingPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  text: PropTypes.string,
};

LoadingPopup.defaultProps = {
  text: '',
};

export default LoadingPopup;
