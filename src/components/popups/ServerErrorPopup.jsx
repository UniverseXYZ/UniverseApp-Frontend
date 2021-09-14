import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/close-menu.svg';
import wrongNetworkIcon from '../../assets/images/wrong-network.svg';
import Button from '../button/Button.jsx';

const ServerErrorPopup = ({ close }) => (
  <div className="wrong__network__popup">
    <img className="close__popup" onClick={close} src={closeIcon} alt="Close" aria-hidden="true" />
    <img src={wrongNetworkIcon} alt="Wrong Network" />
    <h1 className="title">Network Error</h1>
    <p className="desc">There was an unexpected server error, please try again in a few minutes</p>
    <Button className="light-border-button" onClick={close}>
      OK
    </Button>
  </div>
);

ServerErrorPopup.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ServerErrorPopup;
