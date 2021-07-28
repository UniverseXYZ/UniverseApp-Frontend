import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import singleIcon from '../../../assets/images/singleicon.svg';
import collectionIcon from '../../../assets/images/collectionicon.svg';

const SelectType = ({ setSelectedNFTType, setSelectedTabIndex }) => {
  const history = useHistory();
  return (
    <div className="selecttype--section">
      <div className="select--title">
        <h1>Select type</h1>
      </div>
      <div className="nft--box--section">
        <div className="section">
          <div
            className="single--box"
            onClick={() => {
              setSelectedTabIndex(1);
              setSelectedNFTType('single');
            }}
            aria-hidden="true"
          >
            <div className="image--box">
              <img src={singleIcon} alt="cover" />
            </div>
            {/* <img src={singleIcon} alt="cover" /> */}
            <h3>Single NFT</h3>
            <p>
              Create one of a kind ERC-721
              <br /> non-fungible token
            </p>
          </div>
          <div className="singlebox--shadow">
            <p>1</p>
          </div>
        </div>
        <div className="section">
          <div
            className="single--box"
            onClick={() => {
              setSelectedTabIndex(1);
              setSelectedNFTType('collection');
            }}
            aria-hidden="true"
          >
            <div className="image--box">
              <img src={collectionIcon} alt="cover2" />
            </div>
            {/* <img src={collectionIcon} alt="cover2" /> */}
            <h3>Collection NFT</h3>
            <p>
              Create an ERC-721 non-fungible token with
              <br /> built-in ERC-721 tokens inside
            </p>
          </div>
          <div className="singlebox--shadow">
            <p>1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

SelectType.propTypes = {
  setSelectedNFTType: PropTypes.func.isRequired,
  setSelectedTabIndex: PropTypes.func.isRequired,
};

export default SelectType;
