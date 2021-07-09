import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import AppContext from '../../../../ContextAPI';
import closeIcon from '../../../../assets/images/close-menu.svg';
import priceIcon from '../../../../assets/images/marketplace/price.svg';
import ethereumIcon from '../../../../assets/images/bid_icon.svg';
import daiIcon from '../../../../assets/images/dai_icon.svg';
import usdcIcon from '../../../../assets/images/usdc_icon.svg';
import bondIcon from '../../../../assets/images/bond_icon.svg';
import snxIcon from '../../../../assets/images/snx.svg';

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

const SelectedFilters = ({
  saleTypeButtons,
  setSaleTypeButtons,
  selectedPrice,
  setSelectedPrice,
}) => {
  const [showClearALL, setShowClearALL] = useState(false);
  const { selectedTokenIndex, setSelectedTokenIndex } = useContext(AppContext);

  console.log(selectedTokenIndex);

  const handleClearAll = () => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons.forEach((item) => {
      item.selected = false;
    });
    setSaleTypeButtons(newSaleTypeButtons);
    setSelectedPrice(null);
  };

  const removeSelectedFilter = (idx) => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons[idx].selected = false;
    setSaleTypeButtons(newSaleTypeButtons);
  };

  useEffect(() => {
    const res = saleTypeButtons.filter((i) => i.selected);
    if (res.length || selectedPrice) {
      setShowClearALL(true);
    } else {
      setShowClearALL(false);
    }
  }, [saleTypeButtons, selectedPrice]);

  return (
    <div className="selected--filters">
      <div className="show--selected--filters">
        <div className="results--count">15,118,898 results</div>
        {saleTypeButtons.map(
          (item, index) =>
            item.selected && (
              <button type="button" className="light-border-button" key={uuid()}>
                {item.text}
                <img
                  className="close"
                  src={closeIcon}
                  alt="Close"
                  aria-hidden="true"
                  onClick={() => removeSelectedFilter(index)}
                />
              </button>
            )
        )}
        {selectedPrice && (
          <button type="button" className="light-border-button" key={uuid()}>
            <img className="price" src={bidTokens[selectedTokenIndex].icon} alt="Price" />
            {`${bidTokens[selectedTokenIndex].title}: ${selectedPrice.min} - ${selectedPrice.max}`}
            <img
              className="close"
              src={closeIcon}
              alt="Close"
              aria-hidden="true"
              onClick={() => setSelectedPrice(null)}
            />
          </button>
        )}
        {showClearALL && (
          <div
            className="clear--all--selected--filters"
            aria-hidden="true"
            onClick={() => handleClearAll()}
          >
            Clear all
          </div>
        )}
      </div>
    </div>
  );
};

SelectedFilters.propTypes = {
  saleTypeButtons: PropTypes.oneOfType([PropTypes.array]),
  setSaleTypeButtons: PropTypes.func,
  selectedPrice: PropTypes.oneOfType([PropTypes.any]),
  setSelectedPrice: PropTypes.func,
};

SelectedFilters.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
  selectedPrice: null,
  setSelectedPrice: () => {},
};

export default SelectedFilters;
