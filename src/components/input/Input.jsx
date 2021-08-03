import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './Inputs.scss';

const Input = ({ label, error, className, hoverBoxShadowGradient, ...restProps }) => (
  <div className="intup-l">
    {label && (
      <label htmlFor={uuid()} className="inp-label">
        {label}
      </label>
    )}
    <input id={uuid()} className={`${className} ${error ? 'error-inp' : 'inp'}`} {...restProps} />
    {error && <p className="error-message">{error}</p>}
    {hoverBoxShadowGradient && <div className="box--shadow--effect--block" />}
  </div>
);

Input.propTypes = {
  label: PropTypes.oneOfType([PropTypes.any]),
  error: PropTypes.oneOfType([PropTypes.any]),
  className: PropTypes.oneOfType([PropTypes.any]),
  hoverBoxShadowGradient: PropTypes.bool,
};

Input.defaultProps = {
  label: '',
  error: '',
  className: '',
  hoverBoxShadowGradient: false,
};

export default Input;
