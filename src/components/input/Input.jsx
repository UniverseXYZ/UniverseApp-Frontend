import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './Inputs.scss';

const Input = ({ label, error, className, hoverBoxShadowGradient, ...restProps }) => {
  const [focusField, setFocusField] = useState('');
  return (
    <div className={`intup-l ${focusField}`}>
      {label && (
        <label htmlFor={uuid()} className="inp-label">
          {label}
        </label>
      )}
      <div className={error && 'error-div-inp'}>
        <input
          id={uuid()}
          className={`${className}
          ${error ? 'error-inp' : 'inp'}`}
          onFocus={hoverBoxShadowGradient ? () => setFocusField('input--focus--field') : undefined}
          onBlur={hoverBoxShadowGradient ? () => setFocusField('') : undefined}
          {...restProps}
        />
        {error && <p className="error-message">{error}</p>}
        {hoverBoxShadowGradient && <div className="box--shadow--effect--block" />}
      </div>
    </div>
  );
};

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
