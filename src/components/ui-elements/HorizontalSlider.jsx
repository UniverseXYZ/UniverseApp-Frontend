import React from 'react';
import PropTypes from 'prop-types';
import './styles/HorizontalSlider.scss';

const calculate = (value, max, min) => {
  if (value > max) return 100;
  if (value < min) return 0;
  return ((value - min) * 100) / (max - min);
};

const HorizontalSlider = (props) => {
  const { min, max, value, color1, color2 } = props;
  return (
    <div className="parent--horizontall--slider">
      <div
        className="child--horizontall--slider"
        style={{ width: `${calculate(value, max, min)}%` }}
      />
      <p
        className="horizontall--scroll--value"
        style={{
          width: `${calculate(value, max, min)}%`,
          color: calculate(value, max, min) < 7 ? color1 : color2,
        }}
      >
        {`${value}/${max}`} <span>minted</span>
      </p>
    </div>
  );
};

HorizontalSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  color1: PropTypes.string,
  color2: PropTypes.string,
};

HorizontalSlider.defaultProps = {
  min: 0,
  max: 100,
  value: 0,
  color1: 'white',
  color2: 'black',
};

export default HorizontalSlider;
