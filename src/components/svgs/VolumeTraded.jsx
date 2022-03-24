import React from 'react';
import PropTypes from 'prop-types';

const VolumeTraded = ({ width, height, fillColor }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.6">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.75 1.5C15.0261 1.5 15.25 1.72386 15.25 2C15.25 3.933 16.817 5.5 18.75 5.5C19.0261 5.5 19.25 5.72386 19.25 6C19.25 6.27614 19.0261 6.5 18.75 6.5C16.817 6.5 15.25 8.067 15.25 10C15.25 10.2761 15.0261 10.5 14.75 10.5C14.4739 10.5 14.25 10.2761 14.25 10C14.25 8.58637 14.9018 7.32498 15.9213 6.5H2.75C2.47386 6.5 2.25 6.27614 2.25 6C2.25 5.72386 2.47386 5.5 2.75 5.5L15.9213 5.5C14.9018 4.67502 14.25 3.41363 14.25 2C14.25 1.72386 14.4739 1.5 14.75 1.5Z"
        fill={fillColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 18.5C6.47386 18.5 6.25 18.2761 6.25 18C6.25 16.068 4.68458 14.5016 2.75292 14.5L2.75051 14.5C2.75034 14.5 2.75017 14.5 2.75 14.5C2.49112 14.5 2.27819 14.3032 2.25258 14.0511C2.25098 14.0354 2.25011 14.0194 2.25001 14.0032C2.25 14.0022 2.25 14.0011 2.25 14C2.25 13.7239 2.47386 13.5 2.75 13.5C4.683 13.5 6.25 11.933 6.25 10C6.25 9.72386 6.47386 9.5 6.75 9.5C7.02614 9.5 7.25 9.72386 7.25 10C7.25 11.4136 6.59817 12.675 5.57867 13.5L18.75 13.5C19.0261 13.5 19.25 13.7239 19.25 14C19.25 14.2761 19.0261 14.5 18.75 14.5L5.57867 14.5C6.59817 15.325 7.25 16.5864 7.25 18C7.25 18.2761 7.02614 18.5 6.75 18.5Z"
        fill={fillColor}
      />
    </g>
  </svg>
);

VolumeTraded.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fillColor: PropTypes.string,
};

VolumeTraded.defaultProps = {
  width: '21',
  height: '20',
  fillColor: 'black',
};

export default VolumeTraded;
