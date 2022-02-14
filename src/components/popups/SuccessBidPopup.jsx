/* eslint-disable no-unreachable */
import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import bidSubmittedIcon from '../../assets/images/bid-submitted.png';
import Button from '../button/Button.jsx';

const SuccessBidPopup = ({ onClose, auctionHeadline, artistName }) => (
  <div className="place__bid__popup">
    <Animated animationIn="zoomIn">
      <div className="congrats__icon">
        <img src={bidSubmittedIcon} alt="Bid Submitted" />
      </div>
      <h1 className="congrats__title">Congratulations!</h1>
      <p className="congrats__desc">
        Your bid for <b>{auctionHeadline}</b> by <b>{artistName}</b> was successfully submitted
      </p>
      <div className="congrats__close">
        <Button className="light-button" onClick={onClose}>
          Close
        </Button>
      </div>
    </Animated>
  </div>
);

SuccessBidPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  artistName: PropTypes.string.isRequired,
  auctionHeadline: PropTypes.string.isRequired,
};

export default SuccessBidPopup;
