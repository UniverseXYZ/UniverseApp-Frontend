import React from 'react';
import PropTypes from 'prop-types';

const Description = ({ selectedCollection }) => (
  <p className="desc">{selectedCollection.description}</p>
);

Description.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Description;
