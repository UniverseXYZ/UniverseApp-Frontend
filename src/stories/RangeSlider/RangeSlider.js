import React from 'react';
import PropTypes from 'prop-types';
import './RangeSlider.scss';

const HorizontalRangeSlider = (props) => {
  const { className, min, max, rangeClassName, value, setValue, labelLeft, labelRight, step } =
    props;
  return (
    <div className={`parent--horizontal--slider ${className}`}>
      <input
        type="range"
        className={`bonding--curve--slider ${rangeClassName}`}
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        name="range-slider-name"
        id="range-slider"
        step={step}
      />
      <output
        className="bubble"
        name="range-slider-name"
        htmlFor="range-slider"
        style={{
          left: `calc(${((value - min) * 100) / (max - min)}% + ${
            11 - (((value - min) * 100) / (max - min)) * 0.3
          }px `,
        }}
      >
        price: <span>{` ${value}`} ETH</span>
      </output>
      <p className="slider--range--labels">
        <span className="slider--start--label">{labelLeft}</span>
        <span className="slider--end--label">{labelRight}</span>
      </p>
    </div>
  );
};

HorizontalRangeSlider.propTypes = {
  className: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  rangeClassName: PropTypes.string,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func,
  labelLeft: PropTypes.string,
  labelRight: PropTypes.string,
  step: PropTypes.number,
};

HorizontalRangeSlider.defaultProps = {
  className: '',
  min: 0,
  max: 100,
  rangeClassName: '',
  setValue: (e) => console.log(e.target.value),
  labelLeft: '',
  labelRight: '',
  step: 1,
};

export default HorizontalRangeSlider;
