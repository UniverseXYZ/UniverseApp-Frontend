import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import InputRange from 'react-input-range';
import arrowDown from '../../../../assets/images/browse-nft-arrow-down.svg';
import ethereumIcon from '../../../../assets/images/bid_icon.svg';
import daiIcon from '../../../../assets/images/dai_icon.svg';
import usdcIcon from '../../../../assets/images/usdc_icon.svg';
import bondIcon from '../../../../assets/images/bond_icon.svg';
import snxIcon from '../../../../assets/images/snx.svg';
import rightArrow from '../../../../assets/images/arrow.svg';
import 'react-input-range/lib/css/index.css';

const Price = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState({ min: 0, max: 4 });
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
      subtitle: 'BarnBridge Governance Token',
    },
    {
      icon: snxIcon,
      title: 'SNX',
      subtitle: 'Synthetix Network Token',
    },
  ];

  const validateMinValue = (e) => {
    setSliderValue({ ...sliderValue, min: e.target.value });
    // const value = e.target.value.replace(/[^\d]/, '');
    // if (parseInt(value, 10) !== 0) {
    //   setMinValue(value);
    // }
  };

  const validateMaxValue = (e) => {
    setSliderValue({ ...sliderValue, max: e.target.value });
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
        <h3>Price</h3>
        <img src={arrowDown} alt="Arrow Down" className={showFilters ? 'rotate' : ''} />
      </div>
      {showFilters ? (
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
                <h6>{bidTokens[selectedTokenIndex].title}</h6>
                <p>{bidTokens[selectedTokenIndex].subtitle}</p>
              </div>
              <div>
                <img
                  src={arrowDown}
                  alt="Arrow Down"
                  className={showPriceDropdown ? 'rotate' : ''}
                />
              </div>
              {showPriceDropdown ? (
                <div className="price--dropdown--items">
                  {bidTokens.map((token, index) => (
                    <div
                      className="price--dropdown--item"
                      key={uuid()}
                      aria-hidden="true"
                      onClick={() => setSelectedTokenIndex(index)}
                    >
                      <div>
                        <img src={token.icon} alt={token.title} />
                      </div>
                      <div>
                        <h6>{token.title}</h6>
                        <p>{token.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="min--max--fields">
              <input
                type="number"
                placeholder="Min"
                value={sliderValue.min}
                onChange={validateMinValue}
              />
              <span className="to">to</span>
              <input
                type="number"
                placeholder="Max"
                value={sliderValue.max}
                onChange={validateMaxValue}
              />
              <button type="button">
                <img src={rightArrow} alt="Arrow right" />
              </button>
            </div>
            <div className="range--slider">
              <InputRange
                step={0.1}
                maxValue={4}
                minValue={0}
                value={sliderValue}
                onChange={(value) =>
                  setSliderValue({ min: value.min.toFixed(1), max: value.max.toFixed(1) })
                }
              />
            </div>
          </div>
        </Animated>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Price;
