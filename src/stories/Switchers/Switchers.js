import React from 'react';
import PropTypes from 'prop-types';
import './Switchers.scss';

const Switchers = (props) => {
  const { checked, ...rest } = props;
  return (
    <div className="toggle-switch">
      <input
        id="toggleSwitch"
        type="checkbox"
        className="toggle-switch-checkbox"
        name="toggleSwitch"
        checked={checked}
      />
      <label htmlFor="toggleSwitch" className="toggle-switch-label">
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

Switchers.propTypes = {
  checked: PropTypes.bool,
};

Switchers.defaultProps = {
  checked: false,
};

export default Switchers;
