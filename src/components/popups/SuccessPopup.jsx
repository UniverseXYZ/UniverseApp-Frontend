import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useHistory } from 'react-router';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import submitted from '../../assets/images/bid-submitted.png';

const SuccessPopup = ({ onClose, onAuction }) => {
  const history = useHistory();

  return (
    <div className="success__popup">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <img className="submitted" src={submitted} alt="Submitted" />
      <h1>Success</h1>
      <p>
        Your auction <span>{onAuction.name}</span> was successfully created and scheduled for lounch
        on
        <span> {moment(onAuction.startDate).format('MMMM DD, YYYY')}</span>
      </p>
      <div className="button__div">
        <Button
          className="light-button"
          onClick={() => {
            history.push('/my-auctions');
          }}
        >
          Go to my auctions
        </Button>
        <Button
          className="light-border-button"
          onClick={() => {
            history.push('/customize-auction-landing-page', onAuction.id);
          }}
        >
          Visit landing page
        </Button>
      </div>
    </div>
  );
};
SuccessPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default SuccessPopup;
