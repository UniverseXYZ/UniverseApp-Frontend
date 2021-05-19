import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = (props) => {
  const { variant, children, ...rest } = props;
  return (
    <button type="button" className={`${variant}`} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Button.defaultProps = {
  variant: 'light-button',
  children: 'Click me',
};

export default Button;
