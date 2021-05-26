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
      Please switch your wallet network from <span>Ropsten</span> to <span>Mainnet</span> or{' '}
      <span>Rinkeby</span> to use the app. <br />
      <br /> If you don’t know how to do it, <a>check the tutorial</a>. <br />
      <br />
      If you still encounter problems, you may want to switch to a different wallet
    </p>
    <Button className="light-border-button">Switch wallet</Button>
  </div>
);

WrongNetworkPopup.propTypes = {
  close: PropTypes.func.isRequired,
};

export default WrongNetworkPopup;
