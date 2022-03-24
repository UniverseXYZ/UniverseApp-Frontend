import React from 'react';
import PropTypes from 'prop-types';
import { getCollectionBackgroundColor } from '../../utils/helpers';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import universeIcon from '../../assets/images/universe-img.svg';

const Avatar = ({ selectedCollection }) => (
  <div className="collection__image">
    {selectedCollection.address === process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
      <img className="bg" src={universeIcon} alt={selectedCollection.name} />
    ) : !selectedCollection.coverUrl ? (
      <div
        className="random__bg__color"
        style={{
          backgroundColor: getCollectionBackgroundColor(selectedCollection),
        }}
      >
        {selectedCollection.name.charAt(0)}
      </div>
    ) : (
      <img
        className="collection__avatar"
        src={selectedCollection.coverUrl}
        alt={selectedCollection.name}
      />
    )}
    <div className="collection__name">
      <h1 title={selectedCollection.name}>{selectedCollection.name}</h1>
    </div>
  </div>
);

Avatar.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Avatar;
