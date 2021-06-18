import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HorizontalSlider from '../../ui-elements/HorizontalSlider';
import Button from '../../button/Button';
import QuantityUpDownGroup from '../../ui-elements/QuantityUpDownGroup';
import PriceETHIconWhite from '../../../assets/images/PriceETHIconWhite.png';
import PriceETHIconBlack from '../../../assets/images/PriceETHIconBlack.png';
import './styles/BondingCurve.scss';

const BondingCurve = (props) => {
  const { value, setValue, min, max, step, colorPriceIcon } = props;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="welcome--slider--bonding--curve">
      <div className="row1">
        <h5>Distribution curve</h5>
      </div>
      <HorizontalSlider />
      <div className="row3--section">
        <QuantityUpDownGroup value={quantity} onChange={setQuantity} labelText="Quantity" />
        <Button className="light-button">Mint now</Button>
        <div className="price--block">
          <p>
            <span className="price--label">Price :</span>
            <img
              alt="img"
              src={colorPriceIcon === 'white' ? PriceETHIconWhite : PriceETHIconBlack}
            />
            {(quantity * 0.0777).toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
};

BondingCurve.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  colorPriceIcon: PropTypes.string,
};

BondingCurve.defaultProps = {
  setValue: () => {},
  min: 0.1,
  max: 24,
  step: 0.1,
  colorPriceIcon: 'white',
};

export default BondingCurve;
