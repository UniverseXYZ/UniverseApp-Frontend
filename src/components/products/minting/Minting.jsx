import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './Minting.scss';
import singleIcon from '../../../assets/images/collectionicon.svg';
import collectionIcon from '../../../assets/images/singleicon.svg';
import { useThemeContext } from '../../../contexts/ThemeContext';
import { useAuthContext } from '../../../contexts/AuthContext';
import WrongNetworkPopup from '../../popups/WrongNetworkPopup';
import NotAuthenticatedPopup from '../../popups/NotAuthenticatedPopup';

const MintingPage = () => {
  const { isAuthenticated, isWalletConnected } = useAuthContext();
  const history = useHistory();
  const { setDarkMode } = useThemeContext();
  const [showNotAuthenticatedPopup, setShowNotAuthenticatedPopup] = useState(false);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  const singleBoxHandleClick = () => {
    if (!isAuthenticated && !isWalletConnected) {
      setShowNotAuthenticatedPopup(true);
    } else {
      history.push('/my-nfts/create', {
        tabIndex: 1,
        nftType: 'single',
        backPath: 'minting',
      });
    }
  };
  const collectionBoxHandleClick = () => {
    if (!isAuthenticated || !isWalletConnected) {
      setShowNotAuthenticatedPopup(true);
    } else {
      history.push('/my-nfts/create', {
        tabIndex: 1,
        nftType: 'collection',
        backPath: 'minting',
      });
    }
  };

  return (
    <div className="minting-page">
      <div className="select--title">
        <div className="container">
          <h1>Minting</h1>
          <p>Mint NFTs or create a collection</p>
        </div>
      </div>
      <div className="selecttype--section container">
        <div className="nft-section">
          <div className="single-box" aria-hidden="true" onClick={() => singleBoxHandleClick()}>
            <div className="image-section">
              <img src={singleIcon} alt="cover2" />
            </div>
            <div className="text-section">
              <h3>Create NFT</h3>
              <p className="single-text">
                Mint your artwork as NFTs from one of your collections or from the Universe
                Singularity Collection
              </p>
            </div>
          </div>
          <div className="singlebox-shadow" />
        </div>
        <div className="nft-section">
          <div className="single-box" aria-hidden="true" onClick={() => collectionBoxHandleClick()}>
            <div className="image-box">
              <img src={collectionIcon} alt="cover" />
            </div>
            <div className="text-section">
              <h3>Create Collection</h3>
              <p className="collection-box">
                Create a new ERC721 Collection to mint your NFTs from
              </p>
            </div>
          </div>
          <div className="singlebox-shadow" />
        </div>
      </div>
      <Popup closeOnDocumentClick={false} open={showNotAuthenticatedPopup}>
        <NotAuthenticatedPopup close={() => setShowNotAuthenticatedPopup(false)} />
      </Popup>
    </div>
  );
};
export default MintingPage;
