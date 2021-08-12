import React, { useState, useRef, useEffect, useContext } from 'react';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import Button from '../../../button/Button';
import arrowDown from '../../../../assets/images/browse-nft-arrow-down.svg';
import AppContext from '../../../../ContextAPI';
import ethereumIcon from '../../../../assets/images/bid_icon.svg';
import daiIcon from '../../../../assets/images/dai_icon.svg';
import usdcIcon from '../../../../assets/images/usdc_icon.svg';
import bondIcon from '../../../../assets/images/bond_icon.svg';
import snxIcon from '../../../../assets/images/snx.svg';
import priceIcon from '../../../../assets/images/marketplace/price-range.svg';
import rightArrow from '../../../../assets/images/arrow.svg';
import 'react-input-range/lib/css/index.css';

const Price = ({ setSelectedPrice }) => {
  const [showFilters, setShowFilters] = useState(true);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [sliderValue, setSliderValue] = useState({ min: 0.01, max: 100 });
  const [disabledMin, setDisabledMin] = useState(false);
  const [disabledMax, setDisabledMax] = useState(false);

  const { selectedTokenIndex, setSelectedTokenIndex } = useContext(AppContext);

  const ref = useRef(null);

  const bidTokens = [
    {
      icon: ethereumIcon,
      title: 'ETH',
      subtitle: 'Ether',
    },
    {
      icon: daiIcon,
      title: 'DAI',
      subtitle: 'DAI Stablecoin',
    },
    {
      icon: usdcIcon,
      title: 'USDC',
      subtitle: 'USD Coin',
    },
    {
      icon: bondIcon,
      title: 'BOND',
      subtitle: 'BarnBridge Gov. Token',
    },
    {
      icon: snxIcon,
      title: 'SNX',
      subtitle: 'Synthetix Network Token',
    },
  ];

  const validateMinValue = (e) => {
    if (Number(e.target.value) >= 0) {
      setSliderValue({ ...sliderValue, min: Number(e.target.value) });
      setDisabledMin(true);
    }
    // const value = e.target.value.replace(/[^\d]/, '');
    // if (parseInt(value, 10) !== 0) {
    //   setMinValue(value);
    // }
  };

  const validateMaxValue = (e) => {
    if (Number(e.target.value) >= 0) {
      setSliderValue({ ...sliderValue, max: Number(e.target.value) });
      setDisabledMax(true);
    }

    // const value = e.target.value.replace(/[^\d]/, '');
    // if (parseInt(value, 10) !== 0) {
    //   setMaxValue(value);
    // }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowPriceDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="browse--nft--sidebar--filtration--item">
      <div
        className="browse--nft--sidebar--filtration--item--header"
        aria-hidden="true"
        onClick={() => setShowFilters(!showFilters)}
      >
        <h3>
          <img src={priceIcon} alt="Price" /> Price
        </h3>
      </div>
      <Animated animationIn="fadeIn">
        <div className="browse--nft--sidebar--filtration--item--content">
          <div
            className="price--dropdown"
            aria-hidden="true"
            onClick={() => setShowPriceDropdown(!showPriceDropdown)}
            ref={ref}
          >
            <div>
              <img
                src={bidTokens[selectedTokenIndex].icon}
                alt={bidTokens[selectedTokenIndex].title}
              />
            </div>
            <div>
              <h6>
                {bidTokens[selectedTokenIndex].title}
                <p>({bidTokens[selectedTokenIndex].subtitle})</p>
              </h6>
            </div>
            <div>
              <img src={arrowDown} alt="Arrow Down" className={showPriceDropdown ? 'rotate' : ''} />
            </div>
            {showPriceDropdown ? (
              <div className="price--dropdown--items">
                {bidTokens.map((token, index) => (
                  <div
                    className="price--dropdown--item"
                    key={uuid()}
                    aria-hidden="true"
                    onClick={() => setSelectedTokenIndex(index)}
                    // style={{ display: selectedTokenIndex === index ? 'none' : 'flex' }}
                  >
                    <div>
                      <img src={token.icon} alt={token.title} />
                    </div>
                    <div>
                      <h6>
                        {token.title}
                        <p>({token.subtitle})</p>
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="range--slider">
            <InputRange
              step={0.1}
              maxValue={100}
              minValue={0.01}
              value={sliderValue}
              onChange={(value) => {
                setSliderValue({
                  min: Number(value.min.toFixed(1)),
                  max: Number(value.max.toFixed(1)),
                });
                setDisabledMin(true);
                setDisabledMax(true);
              }}
            />
          </div>
          <div className="min--max--fields">
            <input
              type="number"
              placeholder="Min"
              min="0.01"
              max="100"
              onChange={validateMinValue}
              value={disabledMin && sliderValue.min}
            />
            <span className="to">to</span>
            <input
              type="number"
              placeholder="Max"
              min="0.01"
              max="100"
              onChange={validateMaxValue}
              value={disabledMax && sliderValue.max}
            />
          </div>
          {disabledMax && disabledMin ? (
            <Button
              className="light-button apply-button"
              onClick={() => setSelectedPrice(sliderValue)}
            >
              Apply
            </Button>
          ) : (
            <Button className="light-button apply-button" disabled>
              Apply
            </Button>
          )}
        </div>
      </Animated>
    </div>
  );
};

Price.propTypes = {
  setSelectedPrice: PropTypes.func,
};

Price.defaultProps = {
  setSelectedPrice: () => {},
};

export default Price;
