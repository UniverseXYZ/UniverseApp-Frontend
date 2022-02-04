import React from 'react';
import PropTypes from 'prop-types';

const MediumIcon = ({ width, height, fillColor }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.1348 2.856C2.14583 2.74948 2.13106 2.64193 2.09168 2.54196C2.05229 2.44198 1.98939 2.35236 1.908 2.28025L0.2268 0.296625V0H5.445L9.4788 8.66687L13.0248 0H18V0.296625L16.5627 1.645C16.5018 1.69072 16.4548 1.75166 16.4267 1.82131C16.3987 1.89097 16.3906 1.96673 16.4034 2.0405V11.9578C16.3906 12.0315 16.3987 12.1073 16.4267 12.1769C16.4548 12.2466 16.5018 12.3075 16.5627 12.3533L17.9667 13.7025V14H10.9071V13.7034L12.3615 12.3209C12.5046 12.1809 12.5046 12.1397 12.5046 11.9262V3.9095L8.4618 13.9668H7.9164L3.2094 3.9095V10.6505C3.1707 10.9331 3.267 11.2192 3.4704 11.424L5.3613 13.671V13.9668H0V13.671L1.89 11.424C1.99 11.3225 2.06422 11.1998 2.10672 11.0655C2.14923 10.9312 2.15884 10.7891 2.1348 10.6505V2.856Z"
      fill={fillColor}
    />
  </svg>
);

MediumIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fillColor: PropTypes.string,
};

MediumIcon.defaultProps = {
  width: '16',
  height: '16',
  fillColor: 'black',
};

export default MediumIcon;
