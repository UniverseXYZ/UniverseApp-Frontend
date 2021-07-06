import React from 'react';
import PropTypes from 'prop-types';

const UsersResult = ({ query }) => {
  console.log(query);
  return (
    <div>
      <h1>UsersResult {query}</h1>
    </div>
  );
};

UsersResult.propTypes = {
  query: PropTypes.string,
};

UsersResult.defaultProps = {
  query: '',
};

export default UsersResult;
