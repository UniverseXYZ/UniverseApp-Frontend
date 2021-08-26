import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import HorizontalSlider from '../../ui-elements/HorizontalSlider';
import Button from '../../button/Button.jsx';
import MintPolymorphConfirmationPopup from '../../popups/MintPolymorphConfirmationPopup.jsx';
import LoadingPopup from '../../popups/LoadingPopup.jsx';
import QuantityUpDownGroup from '../../ui-elements/QuantityUpDownGroup';
import PriceETHIconWhite from '../../../assets/images/ethereum-white.svg';
import PriceETHIconBlack from '../../../assets/images/ethereum-black.svg';
import backgroundTextLeft from '../../../assets/images/mint-polymorph-welcome-bg-left.png';
import backgroundTextRight from '../../../assets/images/mint-polymorph-welcome-bg-right.png';
import './styles/BondingCurve.scss';

const BondingCurve = (props) => {
  const {
    title,
    price,
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
  } = props;

  const mintPolymorph = () => {
    if (value + quantity <= max) {
      setValue(value + quantity);
      document.getElementById('loading-hidden-btn').click();
      setTimeout(() => {
        document.getElementById('popup-root').remove();
        document.getElementById('congrats-hidden-btn').click();
      }, 2000);
    } else {
      alert(`You can mint maximum ${max - value} morphs`);
    }
  };

  return (
    <div className="welcome--slider--bonding--curve">
      <Popup
        trigger={
          <button
            type="button"
            id="loading-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <LoadingPopup onClose={close} />}
      </Popup>
      <Popup
        trigger={
          <button
            type="button"
            id="congrats-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <MintPolymorphConfirmationPopup onClose={close} quantity={quantity} />}
      </Popup>
      {blur && <img src={backgroundTextLeft} alt="img" className="left--blur" />}
      {blur && <img src={backgroundTextRight} alt="img" className="right--blur" />}
      <div className="row1">
        <h5>{title}</h5>
      </div>
      <HorizontalSlider max={max} value={value} min={min} color1={color1} color2={color2} />
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
        {!mobile && !light && (
          <Button className="light-button dark" onClick={mintPolymorph} disabled={value >= max}>
            Mint now
          </Button>
        )}
        {!mobile && light && (
          <Button className="light-button light" onClick={mintPolymorph} disabled={value >= max}>
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
              {price === 0.1 ? (quantity * price).toFixed(1) : (quantity * price).toFixed(4)}
            </span>
          </p>
        </div>
      </div>
      {!!mobile && !light && (
        <Button className="light-button dark" onClick={mintPolymorph} disabled={value >= max}>
          Mint now
        </Button>
      )}
      {!!mobile && light && (
        <Button className="light-button light" onClick={mintPolymorph} disabled={value >= max}>
          Mint now
        </Button>
      )}
    </div>
  );
};

BondingCurve.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
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
};

BondingCurve.defaultProps = {
  title: 'Distribution curve',
  price: 0.0777,
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
