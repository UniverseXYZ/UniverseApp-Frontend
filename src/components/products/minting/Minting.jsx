import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Minting.scss';
import singleIcon from '../../../assets/images/collectionicon.svg';
import collectionIcon from '../../../assets/images/singleicon.svg';
import { useThemeContext } from '../../../contexts/ThemeContext';

const MintingPage = () => {
  const history = useHistory();
  const { setDarkMode } = useThemeContext();

  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <div className="minting-page">
      <div className="select--title">
        <div className="container">
          <h1>Minting</h1>
          <p>Create a single NFT or mint a collection</p>
        </div>
      </div>
      <div className="selecttype--section container">
        <div className="nft-section">
          <div
            className="single-box"
            aria-hidden="true"
            onClick={() => history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })}
          >
            <div className="image-section">
              <img src={singleIcon} alt="cover2" />
            </div>
            <div className="text-section">
              <h3>Create NFT</h3>
              <p className="single-text">One of a kind ERC-721 non-fungible token</p>
            </div>
          </div>
          <div className="singlebox-shadow" />
        </div>
        <div className="nft-section">
          <div
            className="single-box"
            aria-hidden="true"
            onClick={() => history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' })}
          >
            <div className="image-box">
              <img src={collectionIcon} alt="cover" />
            </div>
            <div className="text-section">
              <h3>Collection NFT</h3>
              <p className="collection-box">
                ERC-721 non-fungible token with built-in ERC-721 tokens inside
              </p>
            </div>
          </div>
          <div className="singlebox-shadow" />
        </div>
      </div>
    </div>
  );
};
export default MintingPage;
