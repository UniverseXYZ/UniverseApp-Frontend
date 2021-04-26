import React from 'react';
import './Button.scss';

const Button = ({ children, ...restProps }) => (
  <button type="button" {...restProps}>
    {children}
  </button>
);

export default Button;
