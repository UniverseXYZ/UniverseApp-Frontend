import React from 'react';
import PropTypes from 'prop-types';

const UserIcon = ({ width, height, fillColor }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.6">
      <circle cx="10.25" cy="7" r="3" stroke={fillColor} />
      <path
        d="M16.25 18C16.25 14.6863 13.5637 12 10.25 12C6.93629 12 4.25 14.6863 4.25 18"
        stroke={fillColor}
        strokeLinecap="round"
      />
    </g>
  </svg>
);

UserIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fillColor: PropTypes.string,
};

UserIcon.defaultProps = {
  width: '21',
  height: '20',
  fillColor: 'black',
};

export default UserIcon;
