import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './Inputs.scss';

const Input = ({ label, error, className, ...restProps }) => (
  <div className="intup-l">
    {label && (
      <label htmlFor={uuid()} className="inp-label">
        {label}
      </label>
    )}
    <input id={uuid()} className={`${className} ${error ? 'error-inp' : 'inp'}`} {...restProps} />
    {error && <p className="error-message">{error}</p>}
  </div>
);

Input.propTypes = {
  label: PropTypes.oneOfType([PropTypes.any]),
  error: PropTypes.oneOfType([PropTypes.any]),
  className: PropTypes.oneOfType([PropTypes.any]),
};

Input.defaultProps = {
  label: '',
  error: '',
  className: '',
};

export default Input;
