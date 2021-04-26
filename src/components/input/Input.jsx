import React from 'react';
import './Inputs.scss';

const Input = ({ label, error, className, ...restProps }) => (
  <div className="intup-l">
    {label && <label className="inp-label">{label}</label>}
    <input className={`${className} ${error ? 'error-inp' : 'inp'}`} {...restProps} />
    {error && <p className="error-message">{error}</p>}
  </div>
);

export default Input;
