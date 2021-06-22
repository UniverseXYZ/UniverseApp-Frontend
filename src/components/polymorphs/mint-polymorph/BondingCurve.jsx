import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HorizontalSlider from '../../ui-elements/HorizontalSlider';
import Button from '../../button/Button';
import QuantityUpDownGroup from '../../ui-elements/QuantityUpDownGroup';
import PriceETHIconWhite from '../../../assets/images/PriceETHIconWhite.png';
import PriceETHIconBlack from '../../../assets/images/PriceETHIconBlack.png';
import backgroundTextLeft from '../../../assets/images/MintPolymorph-welcome-bg-left.png';
import backgroundTextRight from '../../../assets/images/MintPolymorph-welcome-bg-right.png';
import './styles/BondingCurve.scss';

const BondingCurve = (props) => {
  const { value, setValue, min, max, colorPriceIcon, color1, color2, mobile, blur } = props;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="welcome--slider--bonding--curve">
      {blur && <img src={backgroundTextLeft} alt="img" className="left--blur" />}
      {blur && <img src={backgroundTextRight} alt="img" className="right--blur" />}
      <div className="row1">
        <h5>Distribution curve</h5>
      </div>
      <HorizontalSlider max={max} value={value} min={min} color1={color1} color2={color2} />
      <div className="row3--section">
        <QuantityUpDownGroup value={quantity} onChange={setQuantity} labelText="Quantity" />
        {!mobile && <Button className="light-button">Mint now</Button>}
        <div className="price--block">
          <p>
            <span className="price--label">Price :</span>
            <span>
              <img
                alt="img"
                src={colorPriceIcon === 'white' ? PriceETHIconWhite : PriceETHIconBlack}
              />
              {(quantity * 0.0777).toFixed(4)}
            </span>
          </p>
        </div>
      </div>
      {!!mobile && <Button className="light-button">Mint now</Button>}
    </div>
  );
};

BondingCurve.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  colorPriceIcon: PropTypes.string,
  color1: PropTypes.string,
  color2: PropTypes.string,
  mobile: PropTypes.bool,
  blur: PropTypes.bool,
};

BondingCurve.defaultProps = {
  setValue: () => {},
  min: 0,
  max: 100,
  colorPriceIcon: 'white',
  color1: 'white',
  color2: 'black',
  mobile: false,
  blur: false,
};

export default BondingCurve;
