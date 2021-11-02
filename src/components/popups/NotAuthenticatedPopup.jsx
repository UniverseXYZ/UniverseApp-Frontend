import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/close-menu.svg';
import wrongNetworkIcon from '../../assets/images/wrong-network.svg';

const NotAuthenticatedPopup = ({ close }) => (
  <div className="wrong__network__popup">
    <img className="close__popup" onClick={close} src={closeIcon} alt="Close" aria-hidden="true" />
    <img src={wrongNetworkIcon} alt="Wrong Network" />
    <h1 className="title">Oops</h1>
    <p className="desc">
      Please connect your wallet to be able to use the Universe Platform featues.
    </p>
    <Button
      onClick={() => {
        close();
        document.getElementsByClassName('sign__in')[0].click();
      }}
      className="light-border-button"
    >
      Sign in
    </Button>
  </div>
);
NotAuthenticatedPopup.propTypes = {
  close: PropTypes.func.isRequired,
};

export default NotAuthenticatedPopup;
