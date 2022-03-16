import React from 'react';
import PropTypes from 'prop-types';
import './Badge.scss';

const Badge = ({ text, ...rest }) => (
  <span className="badge" {...rest}>
    {text}
  </span>
);

Badge.propTypes = {
  text: PropTypes.string,
};

Badge.defaultProps = {
  text: 'new',
};

export default Badge;
