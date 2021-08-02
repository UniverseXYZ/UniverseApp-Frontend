import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ selectedCollection }) => (
  <div className="collection__image">
    {typeof selectedCollection.coverUrl === 'string' &&
    selectedCollection.coverUrl.startsWith('#') ? (
      <div className="random__bg__color" style={{ backgroundColor: selectedCollection.coverUrl }}>
        {selectedCollection.name.charAt(0)}
      </div>
    ) : (
      <img src={selectedCollection.coverUrl} alt={selectedCollection.name} />
    )}
  </div>
);

Avatar.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Avatar;
