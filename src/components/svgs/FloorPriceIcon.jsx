import React from 'react';
import PropTypes from 'prop-types';

const FloorPriceIcon = ({ width, height, fillColor }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.6">
      <path
        d="M14.25 5.85714V5.85714C14.25 4.27919 12.9708 3 11.3929 3H8.75C7.36929 3 6.25 4.11929 6.25 5.5V5.5C6.25 6.88071 7.36929 8 8.75 8H11.75C13.1307 8 14.25 9.11929 14.25 10.5V10.5C14.25 11.8807 13.1307 13 11.75 13H9.10714C7.52919 13 6.25 11.7208 6.25 10.1429V10.1429"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.25 1L10.25 15" stroke={fillColor} strokeLinecap="round" />
      <path
        d="M18.25 15L10.25 19L2.25 15"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

FloorPriceIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fillColor: PropTypes.string,
};

FloorPriceIcon.defaultProps = {
  width: '21',
  height: '20',
  fillColor: 'black',
};

export default FloorPriceIcon;
