import React from 'react';
import PropTypes from 'prop-types';

const FolderIcon = ({ width, height, fillColor }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.6">
      <path
        d="M15.75 16H5.75C4.64543 16 3.75 15.1046 3.75 14V7V6C3.75 4.89543 4.64543 4 5.75 4H7.67963C8.34834 4 8.9728 4.3342 9.34373 4.8906L10.4531 6.5547C10.6386 6.8329 10.9508 7 11.2852 7H15.75C16.8546 7 17.75 7.89543 17.75 9V14C17.75 15.1046 16.8546 16 15.75 16Z"
        stroke={fillColor}
      />
    </g>
  </svg>
);

FolderIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fillColor: PropTypes.string,
};

FolderIcon.defaultProps = {
  width: '21',
  height: '20',
  fillColor: 'black',
};

export default FolderIcon;
