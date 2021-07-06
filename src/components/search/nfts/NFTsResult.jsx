import React from 'react';
import PropTypes from 'prop-types';

const NFTsResult = ({ query }) => {
  console.log(query);
  return (
    <div>
      <h1>NFTsResult {query}</h1>
    </div>
  );
};

NFTsResult.propTypes = {
  query: PropTypes.string,
};

NFTsResult.defaultProps = {
  query: '',
};

export default NFTsResult;
