import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/cross.svg';
import coloredSuccess from '../../assets/images/bid-submitted.png';
import Button from '../button/Button.jsx';
import AppContext from '../../ContextAPI';
import { useAuctionContext } from '../../contexts/AuctionContext';

const MintCongratsPopup = ({ onClose, onAuctionId }) => {
  const { auction, setAuction, myAuctions, setMyAuctions } = useAuctionContext();
  const auction1 = myAuctions.find((element) => element.id === onAuctionId);

  useEffect(
    () => () => {
      setMyAuctions((prevValues) =>
        prevValues.map((prevAuction) => {
          if (prevAuction.id === onAuctionId) {
            return { ...prevAuction, mint: true };
          }
          return prevAuction;
        })
      );
    },
    []
  );

  return (
    <div className="mintNfts">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <div className="logo-success-div">
        <img src={coloredSuccess} alt="success" />
      </div>
      <h4>Success!</h4>
      <p>
        All <span>64 NFTs</span> from <span>5 collections</span> are minted
      </p>
      <div className="btns">
        <Button className="light-button" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};
MintCongratsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAuctionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default MintCongratsPopup;
