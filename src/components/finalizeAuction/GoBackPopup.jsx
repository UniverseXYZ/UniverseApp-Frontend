import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';

const GoBackPopup = ({ onLeave, closePopup }) => (
  <div className="leave__popup">
    <img className="close" src={closeIcon} alt="Close" onClick={onLeave} aria-hidden="true" />
    <h1>Are you sure you want to leave?</h1>
    <p>
      All the current progress will be saved but make sure you complete all the transactions before
      the launch date so the auction can start successfully.
    </p>
    <div className="button__div">
      <Button className="light-button" onClick={onLeave}>
        Yes, leave
      </Button>
      <Button className="light-border-button" onClick={closePopup}>
        Cancel
      </Button>
    </div>
  </div>
);

GoBackPopup.propTypes = {
  onLeave: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default GoBackPopup;
