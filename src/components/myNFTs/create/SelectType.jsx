import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import img1 from '../../../assets/images/singleimg.svg';
import img2 from '../../../assets/images/collectionimg.svg';

const SelectType = ({ setSelectedNFTType, setSelectedTabIndex }) => {
  const history = useHistory();
  return (
    <div className="selecttype--section">
      <div className="select--title">
        <h1>Select type</h1>
      </div>
      <div className="nft--box--section">
        <div
          className="single--box"
          onClick={() => {
            setSelectedTabIndex(1);
            setSelectedNFTType('single');
          }}
          aria-hidden="true"
        >
          <img src={img1} alt="cover" />
          <h3>Single NFT</h3>
          <p>
            Create one of a kind ERC-721
            <br /> non-fungible token
          </p>
        </div>
        <div
          className="single--box"
          onClick={() => {
            setSelectedTabIndex(1);
            setSelectedNFTType('collection');
          }}
          aria-hidden="true"
        >
          <img src={img2} alt="cover2" />
          <h3>Collection NFT</h3>
          <p>
            Create an ERC-721 non-fungible token with
            <br /> built-in ERC-721 tokens inside
          </p>
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
