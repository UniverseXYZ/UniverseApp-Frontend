import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import HorizontalSlider from '../../ui-elements/HorizontalSlider';
import Button from '../../button/Button.jsx';
import QuantityUpDownGroup from '../../ui-elements/QuantityUpDownGroup';
import PriceETHIconWhite from '../../../assets/images/ethereum-white.svg';
import PriceETHIconBlack from '../../../assets/images/ethereum-black.svg';
import backgroundTextLeft from '../../../assets/images/mint-polymorph-welcome-bg-left.png';
import backgroundTextRight from '../../../assets/images/mint-polymorph-welcome-bg-right.png';
import './styles/BondingCurve.scss';

const BondingCurve = (props) => {
  const {
    value,
    setValue,
    min,
    max,
    colorPriceIcon,
    color1,
    color2,
    mobile,
    blur,
    quantity,
    setQuantity,
    light,
    price,
    trailingZeros,
    mintAction,
    title,
    soldOut,
  } = props;
  const history = useHistory();
  const { lobstersFilter, navigateToMyNFTsPage } = useContext(AppContext);
  return (
    <div className={`welcome--slider--bonding--curve ${soldOut ? 'sold--out' : ''}`}>

      {blur && <img src={backgroundTextLeft} alt="img" className="left--blur" />}
      {blur && <img src={backgroundTextRight} alt="img" className="right--blur" />}
      <div className="row1">
        <h5>{title}</h5>
      </div>
      <HorizontalSlider
        max={max}
        value={value}
        min={min}
        color1={color1}
        color2={color2}
        soldOut={soldOut}
      />
      {!soldOut ? (
        <div className="row3--section">
          <QuantityUpDownGroup
            value={quantity}
            onChange={setQuantity}
            labelText="Quantity"
            btnLeftText={<div className="down--quantity" />}
            btnRightText={
              <>
                <div className="up--quantity--horizontal" />
                <div className="up--quantity--vertical" />
              </>
            }
          />
          {!soldOut && !mobile && !light && (
            <Button
              className="light-button dark"
              onClick={() => mintAction(quantity)}
              disabled={value >= max}
            >
              Mint now
            </Button>
          )}
          {!soldOut && !mobile && light && (
            <Button
              className="light-button light"
              onClick={() => mintAction(quantity)}
              disabled={value >= max}
            >
              Mint now
            </Button>
          )}
          <div className="price--block">
            <p>
              <span className="price--label">Price :</span>
              <span>
                <img
                  alt="img"
                  src={colorPriceIcon === 'white' ? PriceETHIconWhite : PriceETHIconBlack}
                />
                {(quantity * price).toFixed(trailingZeros)}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="row3--section--sold--out">
          <Button
            className={`light-button ${!mobile && !light ? 'dark' : 'light'}`}
            onClick={() => {
              navigateToMyNFTsPage(lobstersFilter);
            }}
          >
            My Lobby Lobsters
          </Button>
        </div>
      )}
      {!soldOut && !!mobile && !light && (
        <Button
          className="light-button dark"
          onClick={() => mintAction(quantity)}
          disabled={value >= max}
        >
          Mint now
        </Button>
      )}
      {!soldOut && !!mobile && light && (
        <Button
          className="light-button light"
          onClick={() => mintAction(quantity)}
          disabled={value >= max}
        >
          Mint now
        </Button>
      )}
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
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  light: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  trailingZeros: PropTypes.number.isRequired,
  mintAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  soldOut: PropTypes.bool,

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
  soldOut: false,
};

export default BondingCurve;
