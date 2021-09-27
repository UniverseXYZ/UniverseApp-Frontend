import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/cross.svg';
import Button from '../button/Button.jsx';
import { useAuctionContext } from '../../contexts/AuctionContext';

const SetUpPopup = ({ onClose, onAuctionId }) => {
  const { myAuctions } = useAuctionContext();
  const auction1 = myAuctions.find((element) => element.id === onAuctionId);

  return (
    <div className="mintNfts">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h3>Set up the auction</h3>
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
