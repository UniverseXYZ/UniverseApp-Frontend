import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';

const SellNFTCongratsPopup = ({ onClose, nftImage }) => {
  const history = useHistory();

  return (
    <div className="polymorph_popup">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h1>Congratulations!</h1>
      <p className="desc">You have successfully posted your listing</p>
      <div className="polymorph_confirmation_image">
        <img src={nftImage} alt="nft" />
      </div>
      <div className="button__div_polymorph">
        <Button className="light-button" onClick={() => history.push('/my-account')}>
          My profile
        </Button>
        <Button className="light-border-button" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

SellNFTCongratsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  nftImage: PropTypes.string.isRequired,
};

export default SellNFTCongratsPopup;
