import React from 'react';
import PropTypes from 'prop-types';

const Cover = ({ selectedCollection }) => (
  <div className="collection__page__cover">
    {typeof selectedCollection.previewImage === 'string' &&
    selectedCollection.previewImage.startsWith('#') ? (
      <div
        className="random__bg__color"
        style={{ backgroundColor: selectedCollection.previewImage }}
      />
    ) : (
      <img
        src={URL.createObjectURL(selectedCollection.previewImage)}
        alt={selectedCollection.name}
      />
    )}
  </div>
);

Cover.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Cover;
