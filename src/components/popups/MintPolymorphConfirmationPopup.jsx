import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import loadingBg from '../../assets/images/mint-polymorph-loading-bg.png';
import { PLACEHOLDER_MINTED_POLYMORPHS } from '../../utils/fixtures/MintedPolymorphsDummyData.js';

const MintPolymorphConfirmationPopup = ({ onClose, quantity, loadingImage }) => {
  const history = useHistory();
  const [polymorphs, setPolymorphs] = useState(PLACEHOLDER_MINTED_POLYMORPHS);
  const [minted, setMinted] = useState(false);
  useEffect(() => {
    const arr = polymorphs.sort(() => Math.random() - Math.random()).slice(0, quantity);
    setPolymorphs(arr);
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMinted(true);
    }, 5000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <div className="polymorph_popup">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h1>Congratulations!</h1>
      <p className="desc">
        {!loadingImage ? (
          <span>
            You have successfully minted <br /> {polymorphs.length}
            &nbsp; Polymorphic Universe NFT
          </span>
        ) : (
          <span>
            You have successfully minted <br /> {polymorphs.length}
            &nbsp; {polymorphs.length > 1 ? 'Lobby Lobsters' : 'Lobby Lobster'}
          </span>
        )}
      </p>
      {!minted ? (
        <p className="info">
          Your {!loadingImage ? 'Polymoprhs' : 'Lobsters'} may take up to 2 minutes to load
        </p>
      ) : (
        <></>
      )}
      <div
        className={`polymorph_confirmation_image ${
          polymorphs.length > 1 && polymorphs.length < 5 ? 'img2x2' : ''
        } ${polymorphs.length > 4 && polymorphs.length < 7 ? 'img3x2' : ''}
        ${polymorphs.length > 6 && polymorphs.length < 13 ? 'img4x3' : ''}
        ${polymorphs.length > 12 && polymorphs.length < 21 ? 'img5x4' : ''}`}
      >
        {polymorphs.map((elm) =>
          minted ? (
            <img src={elm.polymorphImg} alt="polymorph" key={uuid()} />
          ) : (
            <div className="loading" key={uuid()}>
              <img src={loadingImage || loadingBg} alt="polymorph" key={uuid()} />
              <div className="lds-roller">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          )
        )}
      </div>
      <div className="button__div_polymorph">
        <Button className="light-button" onClick={() => history.push('/my-nfts')}>
          {!loadingImage ? 'My polymorphs' : 'My Lobsters'}
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
  loadingImage: PropTypes.string,
};

MintPolymorphConfirmationPopup.defaultProps = {
  loadingImage: '',
};

export default MintPolymorphConfirmationPopup;
