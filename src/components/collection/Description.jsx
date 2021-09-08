import React from 'react';
import PropTypes from 'prop-types';
import ReactReadMoreReadLess from 'react-read-more-read-less';

const Description = ({ selectedCollection }) => (
  <p className="desc">
    <ReactReadMoreReadLess charLimit={200} readMoreText="Read more" readLessText="Read less">
      {selectedCollection.description}
    </ReactReadMoreReadLess>
  </p>
);

Description.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Description;
