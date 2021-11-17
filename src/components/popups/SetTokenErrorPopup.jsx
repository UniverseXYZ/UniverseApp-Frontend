import React from 'react';
import PropTypes from 'prop-types';

import closeIcon from '../../assets/images/close-menu.svg';
import wrongNetworkIcon from '../../assets/images/wrong-network.svg';

const SetTokenErrorPopup = ({ setTokenError, onClose }) => (
  <div className="modal">
    <div className="wrong__network__popup">
      <img
        className="close__popup"
        onClick={() => {
          setTokenError(false);
          onClose();
        }}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      <img src={wrongNetworkIcon} alt="Wrong Network" />
      <h1 className="title">Failed to load supported bid tokens.</h1>
      <p className="desc">Please try again.</p>
    </div>
  </div>
);

SetTokenErrorPopup.propTypes = {
  setTokenError: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SetTokenErrorPopup;
