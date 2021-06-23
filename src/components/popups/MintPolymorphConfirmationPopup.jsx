import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import soldier from '../../assets/images/soldier.png';

const MintPolymorphConfirmationPopup = ({ onClose, quantity }) => {
  const history = useHistory();
  const [polymorphs, setPolymorphs] = useState([]);

  useEffect(() => {
    const newPolymorphs = [];
    for (let i = 0; i < quantity; i += 1) {
      newPolymorphs.push({
        id: uuid,
        polymorph: soldier,
      });
    }
    setPolymorphs(newPolymorphs);
  }, []);

  return (
    <div className="polymorph_popup">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h1>Congratulations!</h1>
      <p>
        You have successfully minted your {polymorphs.length > 1 ? polymorphs.length : ''}{' '}
        Polymorphic Universe NFT
      </p>
      <div
        className={`polymorph_confirmation_image ${
          polymorphs.length > 1 && polymorphs.length < 5 ? 'img2x2' : ''
        } ${polymorphs.length > 4 && polymorphs.length < 7 ? 'img3x2' : ''}
        ${polymorphs.length > 6 && polymorphs.length < 13 ? 'img4x3' : ''}
        ${polymorphs.length > 12 && polymorphs.length < 21 ? 'img5x4' : ''}`}
      >
        {polymorphs.map((elm) => (
          <img src={elm.polymorph} alt="soldier" key={uuid()} />
        ))}
      </div>
      <div className="button__div_polymorph">
        <Button className="light-button" onClick={() => history.push('/my-nfts')}>
          My polymorphs
        </Button>
        <Button className="light-border-button" onClick={onClose}>
          Mint again
        </Button>
      </div>
    </div>
  );
};

MintPolymorphConfirmationPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MintPolymorphConfirmationPopup;
