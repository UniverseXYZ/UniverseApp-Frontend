import React from 'react';
import PropTypes from 'prop-types';
import './styles/Switch.scss';

const ToggleSwitch = (props) => {
  const { value, onChange } = props;

  return (
    <label className="switch">
      <input type="checkbox" value={value} checked={value} onChange={(e) => onChange(!value)} />
      <span className="slider round" />
    </label>
  );
};

ToggleSwitch.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

ToggleSwitch.defaultProps = {
  value: false,
  onChange: (e) => console.log(e),
};

export default ToggleSwitch;
