import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import closeIcon from '../../assets/images/cross.svg';
import polymorph from '../../assets/images/polymorphimage1.png';
import Button from '../button/Button';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';

const BurnPolymorphCongratPopup = ({ onClose, loadingBg, setBurnt }) => {
  const history = useHistory();
  const { polymorphsFilter, navigateToMyUniverseNFTsTab } = useMyNftsContext();
  // const navigateMyPolymorphs = () => {
  //   onClose();
  //   history.push('/my-nfts');
  //   setCollectionFilter(collectionFilter);
  // };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  return (
    <div className="burn--polymorph--popup">
      <img
        className="close"
        src={closeIcon}
        alt="Close"
        onClick={() => {
          onClose();
          setBurnt(false);
        }}
        aria-hidden="true"
      />
      <h1>Congratulations!</h1>
      <p>You have successfully burnt your old polymorph and minted a new one</p>
      <h2>Your Polymoprhs may take up to 2 minutes to load</h2>
      {!loading ? (
        <img src={polymorph} alt="avatar" />
      ) : (
        <>
          <div className="lobster-loading">
            <img src={loadingBg} alt="polymorph" />
            <div className="lobster-lds-roller">
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
        </>
      )}
      <div className="button--section">
        <Button
          className="light-button"
          onClick={() => {
            navigateToMyUniverseNFTsTab(polymorphsFilter);
          }}
        >
          My polymorphs
        </Button>
        <Button
          className="light-border-button"
          onClick={() => {
            onClose();
            setBurnt(false);
          }}
        >
          Burn more
        </Button>
      </div>
    </div>
  );
};

BurnPolymorphCongratPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  loadingBg: PropTypes.string.isRequired,
  setBurnt: PropTypes.func.isRequired,
};

export default BurnPolymorphCongratPopup;
