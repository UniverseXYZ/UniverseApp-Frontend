import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = (props) => {
  const { label, className, ...rest } = props;
  return (
    <div className="intup-l">
      <input className={`inp ${className} `} {...rest} />
      {label && <label className="inp-label">{label}</label>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  label: null,
  className: null,
};

export default Input;
