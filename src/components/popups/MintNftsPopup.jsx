import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/cross.svg';
import Button from '../button/Button.jsx';

const MintNftsPopup = ({ onClose, onAuctionId, handleMintCongratsPopupOpen }) => {
  const handleMintClick = () => {
    handleMintCongratsPopupOpen();
    onClose();
  };

  return (
    <div className="mintNfts">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h3>Mint NFTs</h3>
      <p>
        You’re going to mint <span>64</span> NFTs from <span>5 collections.</span> The estimated
        total gas cost you need to pay is about <span> 24.6 ETH ($43,000)</span>
      </p>
      <div className="btns">
        <Button className="light-button" onClick={handleMintClick}>
          Mint
        </Button>
        <Button className="light-border-button" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
MintNftsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAuctionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  handleMintCongratsPopupOpen: PropTypes.func.isRequired,
};

export default MintNftsPopup;
