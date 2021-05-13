import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/cross.svg';
import Button from '../button/Button';
import AppContext from '../../ContextAPI';

const SetUpPopup = ({ onClose, onAuctionId }) => {
  const { auction, setAuction, myAuctions, setMyAuctions, options, setOptions } = useContext(
    AppContext
  );
  const auction1 = myAuctions.find((element) => element.id === onAuctionId);
  console.log(auction1);

  const handleTokenChange = (event) => {
    setToken((prevValues) => ({ ...prevValues, [event.target.id]: event.target.value }));
    setToken((prevValues) => ({ ...prevValues, value: token.name }));
  };
  const handleAddToken = () => {
    if (token.name && token.address && token.subtitle) {
      setOptions((prevValues) => [...prevValues, token]);
    }
  };

  return (
    <div className="mintNfts">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h3>Set up the auction</h3>
      {/* <p className="first-p">
        You are about to set up the auction <span>“{auction1.name}”.</span>
      </p> */}
      <p>
        You are about to set up the auction <span>“{auction1.name}”.</span> Keep in mind you won’t
        be able to edit or stop it after it starts.
      </p>
      <div className="btns">
        <Button className="light-button">Confirm</Button>
        <Button className="light-border-button" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
SetUpPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAuctionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default SetUpPopup;
