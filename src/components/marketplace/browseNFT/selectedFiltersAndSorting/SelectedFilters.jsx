import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { defaultColors } from '../../../../utils/helpers';
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
  setSliderValue,
  selectedTokenIndex,
  setSelectedTokenIndex,
  selectedCollections,
  setSelectedCollections,
  savedCollections,
  setSavedCollections,
  selectedCreators,
  setSelectedCreators,
  savedCreators,
  setSavedCreators,
}) => {
  const [showClearALL, setShowClearALL] = useState(false);

  const handleClearAll = () => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons.forEach((item) => {
      item.selected = false;
    });
    setSaleTypeButtons(newSaleTypeButtons);
    setSelectedPrice(null);
    setSliderValue({ min: 0.01, max: 100 });
    setSelectedCollections([]);
    setSavedCollections([]);
    setSelectedCreators([]);
    setSavedCreators([]);
  };

  const removeSelectedFilter = (idx) => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons[idx].selected = false;
    setSaleTypeButtons(newSaleTypeButtons);
  };

  const removeCollection = (index) => {
    const newSelectedColl = [...savedCollections];
    newSelectedColl.splice(index, 1);
    setSavedCollections(newSelectedColl);
    setSelectedCollections(newSelectedColl);
  };

  const removeCreator = (index) => {
    const newSelectedCreators = [...savedCreators];
    newSelectedCreators.splice(index, 1);
    setSavedCreators(newSelectedCreators);
    setSelectedCreators(newSelectedCreators);
  };

  useEffect(() => {
    const res = saleTypeButtons.filter((i) => i.selected);
    if (res.length || selectedPrice || savedCollections.length || savedCreators.length) {
      setShowClearALL(true);
    } else {
      setShowClearALL(false);
    }
  }, [saleTypeButtons, selectedPrice, savedCollections, savedCreators]);

  return (
    <div className="selected--filters">
      <div className="show--selected--filters">
        {/* <div className="results--count">15,118,898 results</div> */}
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
              onClick={() => {
                setSelectedPrice(null);
                setSliderValue({ min: 0.01, max: 100 });
              }}
            />
          </button>
        )}
        {savedCollections.map((coll, index) => (
          <button type="button" className="light-border-button" key={uuid()}>
            {!coll.photo ? (
              <div
                className="random--avatar--color"
                style={{
                  backgroundColor: defaultColors[Math.floor(Math.random() * defaultColors.length)],
                }}
              >
                {coll.name.charAt(0)}
              </div>
            ) : (
              <img className="sell__collection" src={coll.photo} alt={coll.name} />
            )}
            {coll.name}
            <img
              className="close"
              src={closeIcon}
              alt="Close"
              aria-hidden="true"
              onClick={() => removeCollection(index)}
            />
          </button>
        ))}
        {savedCreators.map((creator, index) => (
          <button type="button" className="light-border-button" key={uuid()}>
            <img className="creator" src={creator.avatar} alt={creator.name} />
            {creator.name}
            <img
              className="close"
              src={closeIcon}
              alt="Close"
              aria-hidden="true"
              onClick={() => removeCreator(index)}
            />
          </button>
        ))}
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
  setSliderValue: PropTypes.func,
  selectedTokenIndex: PropTypes.number,
  setSelectedTokenIndex: PropTypes.func,
  selectedCollections: PropTypes.oneOfType([PropTypes.array]),
  setSelectedCollections: PropTypes.func,
  savedCollections: PropTypes.oneOfType([PropTypes.array]),
  setSavedCollections: PropTypes.func,
  selectedCreators: PropTypes.oneOfType([PropTypes.array]),
  setSelectedCreators: PropTypes.func,
  savedCreators: PropTypes.oneOfType([PropTypes.array]),
  setSavedCreators: PropTypes.func,
};

SelectedFilters.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
  selectedPrice: null,
  setSelectedPrice: () => {},
  setSliderValue: () => {},
  selectedTokenIndex: 0,
  setSelectedTokenIndex: () => {},
  selectedCollections: [],
  setSelectedCollections: () => {},
  savedCollections: [],
  setSavedCollections: () => {},
  selectedCreators: [],
  setSelectedCreators: () => {},
  savedCreators: [],
  setSavedCreators: () => {},
};

export default SelectedFilters;
