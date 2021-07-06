import React from 'react';
import PropTypes from 'prop-types';

const CollectionsResult = ({ query }) => {
  console.log(query);
  return (
    <div>
      <h1>CollectionsResult {query}</h1>
    </div>
  );
};

CollectionsResult.propTypes = {
  query: PropTypes.string,
};

CollectionsResult.defaultProps = {
  query: '',
};

export default CollectionsResult;
