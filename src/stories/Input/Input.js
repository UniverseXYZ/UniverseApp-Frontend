import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = (props) => {
  const { label, error, className, ...rest } = props;
  return (
    <div className="intup-l">
      <input className={`inp ${className} ${error ? 'error-inp' : ''}`} {...rest} />
      {label && <label className="inp-label">{label}</label>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  className: PropTypes.string,
};

Input.defaultProps = {
  label: null,
  error: false,
  className: null,
};

export default Input;
