import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import './Minting.scss';
import { useRouter } from 'next/router';
import Popup from 'reactjs-popup';
import singleIcon from '../../../assets/images/minting-create-nft.png';
import singleIconHover from '../../../assets/images/minting-create-nft-hover.png';
import collectionIcon from '../../../assets/images/minting-create-collection.png';
import collectionIconHover from '../../../assets/images/minting-create-collection-hover.png';
import WrongNetworkPopup from '../../popups/WrongNetworkPopup';
import NotAuthenticatedPopup from '../../popups/NotAuthenticatedPopup';
import { useAuthStore } from '../../../stores/authStore';
import { useThemeStore } from 'src/stores/themeStore';
import OpenGraphImage from '@assets/images/open-graph/minting.png';
import { OpenGraph } from '@app/components';

const MintingPage = () => {
  const router = useRouter();
  const { isAuthenticated, isWalletConnected } = useAuthStore(s => ({isAuthenticated: s.isAuthenticated, isWalletConnected: s.isWalletConnected}));
  const setDarkMode = useThemeStore(s => s.setDarkMode);
  const [showNotAuthenticatedPopup, setShowNotAuthenticatedPopup] = useState(false);

  useEffect(() => setDarkMode(false), []);

  const singleBoxHandleClick = () => {
    if (!isAuthenticated && !isWalletConnected) {
      setShowNotAuthenticatedPopup(true);
    } else {
      router.push('/my-nfts/create?tabIndex=1&nftType=single&backPath=minting');
    }
  };
  const collectionBoxHandleClick = () => {
    if (!isAuthenticated || !isWalletConnected) {
      setShowNotAuthenticatedPopup(true);
    } else {
      router.push('/my-nfts/create?tabIndex=1&nftType=collection&backPath=minting');
    }
  };

  return (
    <div className="minting-page">
      <OpenGraph
        title={'Mint NFT or Create an NFT Collection'}
        description={'Universe Minting is an easy to use platform that allows users to create their NFTs to the Ethereum Blockchain.'}
        image={OpenGraphImage}
      />
      <div className="select--title">
        <div className="container">
          <h1>Minting</h1>
          <p>Mint NFTs or Create a Collection</p>
        </div>
      </div>
      <div className="selecttype--section container">
        <div className="nft-section">
          <div className="single-box" aria-hidden="true" onClick={() => singleBoxHandleClick()}>
            <div className="image-section">
              <img className="hide--on--hover" src={singleIcon} alt="cover2" />
              <img className="show--on--hover" src={singleIconHover} alt="cover2" />
            </div>
            <div className="text-section">
              <h3>Create NFT</h3>
              <p className="single-text">
                Mint your artwork as NFTs from one of your collections or from the Universe
                Singularity Collection
              </p>
            </div>
          </div>
        </div>
        <div className="nft-section">
          <div className="single-box" aria-hidden="true" onClick={() => collectionBoxHandleClick()}>
            <div className="image-section">
              <img className="hide--on--hover" src={collectionIcon} alt="cover" />
              <img className="show--on--hover" src={collectionIconHover} alt="cover2" />
            </div>
            <div className="text-section">
              <h3>Create Collection</h3>
              <p className="collection-box">
                Create a new ERC721 Collection to mint your NFTs from
              </p>
            </div>
          </div>
        </div>
      </div>
      <Popup closeOnDocumentClick={false} open={showNotAuthenticatedPopup}>
        <NotAuthenticatedPopup close={() => setShowNotAuthenticatedPopup(false)} />
      </Popup>
    </div>
  );
};
export default MintingPage;
