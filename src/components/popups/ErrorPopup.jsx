import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/close-menu.svg';
import wrongNetworkIcon from '../../assets/images/wrong-network.svg';
import { useErrorContext } from '../../contexts/ErrorContext.jsx';

const ErrorPopup = () => {
  const { errorBody, errorTitle, closeError } = useErrorContext();
  const defaulTtitle = 'Unexpected error';
  const defaultBody = 'Unexpected error ocurred.\nPlease try again in a few minutes.';

  return (
    <div className="modal">
      <div className="wrong__network__popup">
        <img
          className="close__popup"
          onClick={closeError}
          src={closeIcon}
          alt="Close"
          aria-hidden="true"
        />
        <img src={wrongNetworkIcon} alt="Wrong Network" />
        <h1 className="title">{errorTitle || defaulTtitle}</h1>
        <p className="desc">{errorBody || defaultBody} </p>
      </div>
    </div>
  );
};

ErrorPopup.propTypes = {};

export default ErrorPopup;
