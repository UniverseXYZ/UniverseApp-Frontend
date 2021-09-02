import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/close-menu.svg';
import wrongNetworkIcon from '../../assets/images/wrong-network.svg';

const WrongNetworkPopup = ({ close }) => (
  <div className="wrong__network__popup">
    <img className="close__popup" onClick={close} src={closeIcon} alt="Close" aria-hidden="true" />
    <img src={wrongNetworkIcon} alt="Wrong Network" />
    <h1 className="title">Wrong network</h1>
    <p className="desc">
      Please switch your wallet network to <span>{process.env.REACT_APP_NETWORK_NAME}</span> to use
      the app. <br />
      <br />
      If you still encounter problems, you may want to switch to a different wallet
    </p>
  </div>
);

WrongNetworkPopup.propTypes = {
  close: PropTypes.func.isRequired,
};

export default WrongNetworkPopup;
