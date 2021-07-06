import React from 'react';
import PropTypes from 'prop-types';

const CommunitiesResult = ({ query }) => {
  console.log(query);
  return (
    <div>
      <h1>CommunitiesResult {query}</h1>
    </div>
  );
};

CommunitiesResult.propTypes = {
  query: PropTypes.string,
};

CommunitiesResult.defaultProps = {
  query: '',
};

export default CommunitiesResult;
