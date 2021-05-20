import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

const Checkbox = (props) => {
  const { className, ...rest } = props;
  return (
    <div>
      <input className={className} type="checkbox" />
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  className: 'default',
};

export default Checkbox;
