import React from 'react';
import PropTypes from 'prop-types';
import leftArrow from '../../../../assets/images/marketplace/bundles-left-arrow.svg';

const PendingPrevArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <button
      type="button"
      className={className}
      style={{ ...style }}
      onClick={onClick}
      aria-hidden="true"
    >
      <img src={leftArrow} alt="arrow left" />
    </button>
  );
};
PendingPrevArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  onClick: PropTypes.func,
};
PendingPrevArrow.defaultProps = {
  className: '',
  style: '',
  onClick: () => {},
};

export default PendingPrevArrow;
