import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import soldier from '../../assets/images/soldier.png';
import { MINT_POLYMORPH } from '../../utils/fixtures/MintPolymorphDummyData.js';

const MintPolymorphConfirmationPopup = ({ onClose }) => (
  <div className="polymorph_popup">
    <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
    <h1>Congratulations!</h1>
    <p>You have successfully minted your Polymorphic Universe NFT</p>
    {/* <img src={soldier} alt="soldier" className="polymorph_confirmation_image" /> */}
    <div
      className={`polymorph_confirmation_image ${
        MINT_POLYMORPH.length > 1 && MINT_POLYMORPH.length < 5 ? 'img2x2' : ''
      } ${MINT_POLYMORPH.length > 4 && MINT_POLYMORPH.length < 7 ? 'img3x2' : ''}
      ${MINT_POLYMORPH.length > 6 && MINT_POLYMORPH.length < 13 ? 'img4x3' : ''}
      ${MINT_POLYMORPH.length > 12 && MINT_POLYMORPH.length < 21 ? 'img5x4' : ''}`}
    >
      {MINT_POLYMORPH.map((elm) => (
        <img src={elm.previewImage.url} alt="soldier" key={uuid()} />
      ))}
    </div>
    <div className="button__div_polymorph">
      <Button className="light-button">My polymorphs</Button>
      <Button className="light-border-button" onClick={onClose}>
        Mint again
      </Button>
    </div>
  </div>
);

MintPolymorphConfirmationPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MintPolymorphConfirmationPopup;
