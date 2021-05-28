import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ selectedCollection }) => (
  <div className="collection__image">
    {typeof selectedCollection.previewImage === 'string' &&
    selectedCollection.previewImage.startsWith('#') ? (
      <div
        className="random__bg__color"
        style={{ backgroundColor: selectedCollection.previewImage }}
      >
        {selectedCollection.name.charAt(0)}
      </div>
    ) : (
      <img
        src={URL.createObjectURL(selectedCollection.previewImage)}
        alt={selectedCollection.name}
      />
    )}
  </div>
);

Avatar.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Avatar;
