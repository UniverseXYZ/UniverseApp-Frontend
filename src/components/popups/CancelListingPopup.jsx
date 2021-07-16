import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/close-menu.svg';

const CancelListingPopup = ({ close }) => (
  <div className="leave__popup">
    <img className="close" src={closeIcon} alt="Close" onClick={close} aria-hidden="true" />
    <h1>Are you sure you want to cancel your listing?</h1>
    <p>
      Canceling your listing will unpublish this sale from Universe and requires a transaction to
      make sure it will never be fulfilable.
    </p>
    <div className="button__div">
      <Button className="light-button">Cancel listing</Button>
      <Button className="light-border-button" onClick={close}>
        Go back
      </Button>
    </div>
  </div>
);

CancelListingPopup.propTypes = {
  close: PropTypes.func.isRequired,
};

export default CancelListingPopup;
