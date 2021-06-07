import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';

const LeavePopup = ({ onClose }) => (
  <div className="leave__popup">
    <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
    <h1>Are you sure you want to leave?</h1>
    <p>
      All the current progress will be saved but make sure you complete all the transactions before
      the launch date so the auction can start successfully.
    </p>
    <div className="button__div">
      <Button className="light-button">Yes, leave</Button>
      <Button className="light-border-button" onClick={onClose}>
        Cancel
      </Button>
    </div>
  </div>
);

LeavePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LeavePopup;
