import React from 'react';
import PropTypes from 'prop-types';
import ReadMoreAndLess from 'react-read-more-less';

const Description = ({ selectedCollection }) => (
  <p className="desc">
    <ReadMoreAndLess charLimit={200} readMoreText="Read more" readLessText="Read less">
      {selectedCollection.description || ''}
    </ReadMoreAndLess>
  </p>
);

Description.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Description;
