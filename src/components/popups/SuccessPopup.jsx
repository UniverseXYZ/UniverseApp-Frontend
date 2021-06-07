import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import submitted from '../../assets/images/bid-submitted.png';

const SuccessPopup = ({ onClose }) => (
  <div className="success__popup">
    <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
    <img className="submitted" src={submitted} alt="Submitted" />
    <h1>Success</h1>
    <p>
      Your auction <span>Auction name</span> was successfully created and scheduled for lounch on
      <span> May 16th 2020</span>
    </p>
    <div className="button__div">
      <Button className="light-button">Go to my auctions</Button>
      <Button className="light-border-button">Visit landing page</Button>
    </div>
  </div>
);

SuccessPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default SuccessPopup;
