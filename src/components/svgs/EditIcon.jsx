import React from 'react';
import PropTypes from 'prop-types';

const EditIcon = ({ width, height, fillColor }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.18519 12.8519L14.037 1L17 3.96296L5.14815 15.8148M2.18519 12.8519L1 17L5.14815 15.8148M2.18519 12.8519L5.14815 15.8148M11.6667 3.37037L14.6296 6.33333"
      stroke={fillColor}
    />
  </svg>
);

EditIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fillColor: PropTypes.string,
};

EditIcon.defaultProps = {
  width: '18',
  height: '18',
  fillColor: 'black',
};

export default EditIcon;
