import React from 'react';
import PropTypes from 'prop-types';

const GalleriesResult = ({ query }) => {
  console.log(query);
  return (
    <div>
      <h1>GalleriesResult {query}</h1>
    </div>
  );
};

GalleriesResult.propTypes = {
  query: PropTypes.string,
};

GalleriesResult.defaultProps = {
  query: '',
};

export default GalleriesResult;
