import React from 'react';
import PropTypes from 'prop-types';
// import './styles/WrapperCenter.scss';

const WrapperCenter = (props) => {
  const { children, className } = props;
  return <div className={`wrapper wrapper--center ${className}`}>{children}</div>;
};

WrapperCenter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

WrapperCenter.defaultProps = {
  className: '',
};

export default WrapperCenter;
