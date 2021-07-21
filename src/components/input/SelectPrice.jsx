import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import arrowDown from '../../assets/images/browse-nft-arrow-down.svg';
import ethereumIcon from '../../assets/images/bid-icon.svg';
import daiIcon from '../../assets/images/dai_icon.svg';
import usdcIcon from '../../assets/images/usdc_icon.svg';
import bondIcon from '../../assets/images/bond_icon.svg';
import snxIcon from '../../assets/images/snx.svg';
import './SelectPrice.scss';

const SelectPrice = (props) => {
  const { onChange, value } = props;
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const ref = useRef(null);

  const bidTokens = [
    {
      icon: ethereumIcon,
      title: 'eth',
      subtitle: 'Ether',
    },
    {
      icon: daiIcon,
      title: 'dai',
      subtitle: 'DAI Stablecoin',
    },
    {
      icon: usdcIcon,
      title: 'usdc',
      subtitle: 'USD Coin',
    },
    {
      icon: bondIcon,
      title: 'bond',
      subtitle: 'BarnBridge Governance Token',
    },
    {
      icon: snxIcon,
      title: 'snx',
      subtitle: 'Synthetix Network Token',
    },
  ];

  useEffect(() => {
    const val = bidTokens.find((elem) => elem.title === value);
    const ind = bidTokens.indexOf(val);
    setSelectedTokenIndex(ind);
  }, [value]);

  return (
    <div
      className="price--dropdown"
      aria-hidden="true"
      onClick={() => setShowPriceDropdown(!showPriceDropdown)}
      ref={ref}
    >
      <div>
        <img src={bidTokens[selectedTokenIndex].icon} alt={bidTokens[selectedTokenIndex].title} />
      </div>
      <div>
        <h6>{bidTokens[selectedTokenIndex].title.toUpperCase()}</h6>
        <p>{bidTokens[selectedTokenIndex].subtitle}</p>
      </div>
      <div>
        <img src={arrowDown} alt="Arrow Down" className={showPriceDropdown ? 'rotate' : ''} />
      </div>
      {showPriceDropdown && (
        <div className="price--dropdown--items">
          {bidTokens.map((token, index) => (
            <div
              className="price--dropdown--item"
              key={uuid()}
              aria-hidden="true"
              onClick={() => {
                setSelectedTokenIndex(index);
                onChange(bidTokens[index].title);
              }}
              style={{ display: selectedTokenIndex === index ? 'none' : 'flex' }}
            >
              <div>
                <img src={token.icon} alt={token.title} />
              </div>
              <div>
                <h6>{token.title.toUpperCase()}</h6>
                <p>{token.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SelectPrice.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SelectPrice;
