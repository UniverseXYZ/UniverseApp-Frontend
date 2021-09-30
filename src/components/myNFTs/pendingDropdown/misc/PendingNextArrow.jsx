import React from 'react';
import PropTypes from 'prop-types';
import rightArrow from '../../../../assets/images/marketplace/bundles-right-arrow.svg';

const PendingNextArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <button
      type="button"
      className={className}
      style={{ ...style }}
      onClick={onClick}
      aria-hidden="true"
    >
      <img src={rightArrow} alt="arrow right" />
    </button>
  );
};

PendingNextArrow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  onClick: PropTypes.func,
};
PendingNextArrow.defaultProps = {
  className: '',
  style: '',
  onClick: () => {},
};

export default PendingNextArrow;
