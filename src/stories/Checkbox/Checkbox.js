import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

const Checkbox = (props) => {
  const { className, checked, disabled, ...rest } = props;
  return (
    <div className="custom__checkbox">
      <label htmlFor="toggleSelection">
        <input id="toggleSelection" type="checkbox" checked={checked} disabled={disabled} />
        <i className={className} />
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  className: 'default',
  checked: false,
  disabled: false,
};

export default Checkbox;
