import React from 'react';
import PropTypes from 'prop-types';
import './styles/HorizontalSlider.scss';

const calculate = (value, max, min) => {
  const x = (max - min) / 100;
  if (value > max) return `${max}%`;
  return `${x * value}%`;
};

const HorizontalSlider = (props) => {
  const { min, max, value } = props;
  console.log(calculate(value, max, min));
  return (
    <div className="parent--horizontall--slider">
      <div className="child--horizontall--slider" style={{ width: calculate(value, max) }} />
      {/* <p className="horizontall--scroll--value">{`${value}/${max}`}</p> */}
    </div>
  );
};

HorizontalSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
};

HorizontalSlider.defaultProps = {
  min: 20,
  max: 80,
  value: 50,
};

export default HorizontalSlider;
