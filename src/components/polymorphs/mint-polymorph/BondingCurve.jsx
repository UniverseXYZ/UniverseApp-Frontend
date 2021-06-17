import React from 'react';
import PropTypes from 'prop-types';
import HorizontalRangeSlider from '../../ui-elements/HorizontalRangeSlider';
import Button from '../../button/Button';
import './styles/BondingCurve.scss';

const BondingCurve = (props) => {
  const { value, setValue, min, max, step } = props;
  return (
    <div className="welcome--slider--bonding--curve">
      <div className="row1">
        <div className="alert--info">
          <p>
            The Bonding Curve contract will mint you an original Polymorph. This base skin will be
            permanent but the traits and items will be morphable at any time.
          </p>
        </div>
        <h5>Bonding curve</h5>
        <p>
          12500/25000
          <span> Minted</span>
        </p>
      </div>
      <HorizontalRangeSlider
        value={value}
        setValue={setValue}
        labelLeft="0.1 ETH"
        labelRight="24 ETH"
        className="mint--polymorph--welcome--slider"
        min={min}
        max={max}
        step={step}
      />
      <Button className="light-button">Mint now</Button>
    </div>
  );
};

BondingCurve.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

BondingCurve.defaultProps = {
  setValue: () => {},
  min: 0.1,
  max: 24,
  step: 0.1,
};

export default BondingCurve;
