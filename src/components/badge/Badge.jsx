import React from 'react';
import PropTypes from 'prop-types';
import './Badge.scss';

const Badge = ({ text }) => <span className="badge">{text}</span>;

Badge.propTypes = {
  text: PropTypes.string,
};

Badge.defaultProps = {
  text: 'new',
};

export default Badge;
