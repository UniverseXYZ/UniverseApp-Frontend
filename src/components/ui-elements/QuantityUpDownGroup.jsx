import React from 'react';
import PropTypes from 'prop-types';
import './styles/QuantityUpDownGroup.scss';

const QuantityUpDownGroup = (props) => {
  const { labelText, min, max, value, onChange, className, btnLeftText, btnRightText } = props;
  const upClick = (val, setVal) => {
    if (val < max) setVal(val + 1);
  };
  const downClick = (val, setVal) => {
    if (val > min) setVal(val - 1);
  };
  return (
    <div className={`quantity--input--group ${className}`}>
      <div className="label--block">
        <p>{labelText} : </p>
      </div>
      <div className="controll-box">
        <button type="button" className="btn--down" onClick={() => downClick(value, onChange)}>
          {btnLeftText}
        </button>
        <div className="value">{value}</div>
        <button type="button" className="btn--up" onClick={() => upClick(value, onChange)}>
          {btnRightText}
        </button>
      </div>
    </div>
  );
};

QuantityUpDownGroup.propTypes = {
  labelText: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  btnLeftText: PropTypes.string || PropTypes.node,
  btnRightText: PropTypes.string || PropTypes.node,
};

QuantityUpDownGroup.defaultProps = {
  min: 1,
  max: 20,
  className: '',
  btnLeftText: '-',
  btnRightText: '+',
};

export default QuantityUpDownGroup;
