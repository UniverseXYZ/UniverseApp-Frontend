import React from 'react';
import PropTypes from 'prop-types';
import { defaultColors, getCollectionBackgroundColor } from '../../utils/helpers';

const Avatar = ({ selectedCollection }) => (
  <div className="collection__image">
    {!selectedCollection.coverUrl ? (
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

Avatar.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Avatar;
