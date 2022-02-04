import React from 'react';
import PropTypes from 'prop-types';

const TelegramIcon = ({ width, height, fillColor }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.4089 1.36523L15.6229 14.0946C15.4126 14.9928 14.8646 15.2164 14.0858 14.7935L9.84054 11.7627L7.79241 13.6716C7.56558 13.8914 7.37632 14.0748 6.93913 14.0748L7.24444 9.88638L15.1119 2.9988C15.4541 2.70364 15.0374 2.53945 14.5804 2.83525L4.85408 8.76901L0.666821 7.49895C-0.243825 7.2236 -0.260311 6.61668 0.856731 6.19311L17.2345 0.0798335C17.9928 -0.195516 18.6562 0.243382 18.4089 1.36586V1.36523Z"
      fill={fillColor}
    />
  </svg>
);

TelegramIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fillColor: PropTypes.string,
};

TelegramIcon.defaultProps = {
  width: '16',
  height: '16',
  fillColor: 'black',
};

export default TelegramIcon;
