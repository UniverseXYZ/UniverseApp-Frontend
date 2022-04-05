import React from 'react';
import PropTypes from 'prop-types';
// import './styles/WrapperCenterTwoColumns.scss';

const WrapperCenterTwoColumns = (props) => {
  const { leftBlock, leftClassName, rightBlock, rightClassName } = props;

  return (
    <>
      <div className={`wrapper--left--column ${leftClassName}`}>{leftBlock}</div>
      <div className={`wrapper--right--column ${rightClassName}`}>{rightBlock}</div>
    </>
  );
};

WrapperCenterTwoColumns.propTypes = {
  leftBlock: PropTypes.node.isRequired,
  leftClassName: PropTypes.string,
  rightBlock: PropTypes.node.isRequired,
  rightClassName: PropTypes.string,
};

WrapperCenterTwoColumns.defaultProps = {
  leftClassName: '',
  rightClassName: '',
};

export default WrapperCenterTwoColumns;
