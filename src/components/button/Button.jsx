import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ children, ...restProps }) => (
  <button type="button" {...restProps}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default Button;
