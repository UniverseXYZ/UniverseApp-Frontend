import React from 'react';
import PropTypes from 'prop-types';
import './Tags.scss';

const Tags = ({ active, imgUrl }) => (
  <button type="button" className={active ? 'selected' : ''}>
    <img src={imgUrl} alt={active ? 'Active tag' : 'Inactive tag'} />
    <span>{active ? 'Active tag' : 'Inactive tag'}</span>
  </button>
);

Tags.propTypes = {
  active: PropTypes.bool,
  imgUrl: PropTypes.string,
};

Tags.defaultProps = {
  active: false,
  imgUrl: '',
};

export default Tags;
