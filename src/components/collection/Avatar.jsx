import React from 'react';
import PropTypes from 'prop-types';
import { getCollectionBackgroundColor } from '../../utils/helpers';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import universeIcon from '../../assets/images/universe-img.svg';

const Avatar = ({ selectedCollection }) => {
  const { universeCollectionDisplayName } = useMyNftsContext();
  return (
    <div className="collection__image">
      {selectedCollection.name === universeCollectionDisplayName ? (
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
    </div>
  );
};

Avatar.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Avatar;
