import React from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';
import arrowDown from '../../assets/images/arrow-down.svg';
import shape from '../../assets/images/Shape.svg';
import infoIcon from '../../assets/images/redMessage-icon.svg';

const Dropdown = (props) => {
  const { label, error, className, disabled, ...rest } = props;
  return (
    <div className="intup-l">
      <input
        className={`inp ${className} ${error ? 'error-inp' : ''}`}
        disabled={disabled}
        {...rest}
      />
      {label && <label className="inp-label">{label}</label>}
      {disabled ? (
        <img className="shape" src={shape} alt="Shape" />
      ) : (
        <img className="arrow__down" src={arrowDown} alt="Arrow Down" />
      )}
      {error && <img className="info-icon" src={infoIcon} alt="Info Icon" />}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Dropdown.defaultProps = {
  label: null,
  error: false,
  className: null,
  disabled: false,
};

export default Dropdown;
