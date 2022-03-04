import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import closeIcon from '../../../../../../../../assets/images/close-menu.svg';
import priceIcon from '../../../../../../../../assets/images/marketplace/price.svg';
import ethereumIcon from '../../../../../../../..//assets/images/eth-icon.svg';
import daiIcon from '../../../../../../../..//assets/images/dai_icon.svg';
import usdcIcon from '../../../../../../../..//assets/images/usdc_icon.svg';
import bondIcon from '../../../../../../../..//assets/images/bond_icon.svg';
import snxIcon from '../../../../../../../..//assets/images/snx.svg';
import { getCollectionBackgroundColor } from '../../../../../../../../utils/helpers';
import { shortenEthereumAddress } from '../../../../../../../../utils/helpers/format';

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

interface IPropsSelectedFilters {
  saleTypeButtons: any[],
  setSaleTypeButtons: (values: any[]) => void,
  selectedPrice: number,
  setSelectedPrice: (value: number) => void,
  setSliderValue: (value: any) => void,
  selectedTokenIndex: number,
  setSelectedTokenIndex: (value: number) => void,
  selectedCollections: any[],
  setSelectedCollections: (value: any) => void,
  savedCollections: any[],
  setSavedCollections: (value: any) => void,
  selectedCreators: any[],
  setSelectedCreators: (value: any) => void,
  savedCreators: any[],
  setSavedCreators: (value: any) => void,
}

export const SelectedFilters = (props: IPropsSelectedFilters) => {
  const [showClearALL, setShowClearALL] = useState(false);

  const handleClearAll = () => {
    const newSaleTypeButtons: any[] = [...props.saleTypeButtons];
    newSaleTypeButtons.forEach((item) => {
      item.selected = false;
    });
    props.setSaleTypeButtons(newSaleTypeButtons);
    props.setSelectedPrice(0);
    props.setSliderValue({ min: 0.01, max: 100 });
    props.setSelectedCollections([]);
    props.setSavedCollections([]);
    props.setSelectedCreators([]);
    props.setSavedCreators([]);
  };

  const removeSelectedFilter = (idx: any) => {
    const newSaleTypeButtons = [...props.saleTypeButtons];
    newSaleTypeButtons[idx].selected = false;
    props.setSaleTypeButtons(newSaleTypeButtons);
  };

  const removeCollection = (index: any) => {
    const newSelectedColl = [...props.savedCollections];
    newSelectedColl.splice(index, 1);
    props.setSavedCollections(newSelectedColl);
    props.setSelectedCollections(newSelectedColl);
  };

  const removeCreator = (index: any) => {
    const newSelectedCreators = [...props.savedCreators];
    newSelectedCreators.splice(index, 1);
    props.setSavedCreators(newSelectedCreators);
    props.setSelectedCreators(newSelectedCreators);
  };

  useEffect(() => {
    const res = props.saleTypeButtons.filter((i) => i.selected);
    if (res.length || props.selectedPrice || props.savedCollections.length || props.savedCreators.length) {
      setShowClearALL(true);
    } else {
      setShowClearALL(false);
    }
  }, [props.saleTypeButtons, props.selectedPrice, props.savedCollections, props.savedCreators]);

  return (
    <div className="selected--filters">
      {(props.saleTypeButtons.filter((item) => item.selected).length > 0 ||
        props.selectedPrice ||
        props.savedCollections.length > 0 ||
        props.savedCreators.length > 0) && (
        <div className="show--selected--filters">
          {/* <div className="results--count">15,118,898 results</div> */}
          {props.saleTypeButtons.map(
            (item: any, index: any) =>
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
          {props.selectedPrice && (
            <button type="button" className="light-border-button" key={uuid()}>
              <img className="price" src={bidTokens[props.selectedTokenIndex].icon} alt="Price" />
              {/* {`${bidTokens[props.selectedTokenIndex].title}: ${props?.selectedPrice?.min} - ${props.selectedPrice.max}`} */}
              <img
                className="close"
                src={closeIcon}
                alt="Close"
                aria-hidden="true"
                onClick={() => {
                  props.setSelectedPrice(0);
                  props.setSliderValue({ min: 0.01, max: 100 });
                }}
              />
            </button>
          )}
          {props.savedCollections.map((coll, index) => (
            <button type="button" className="light-border-button" key={uuid()}>
              {!coll.coverUrl ? (
                <div
                  className="random--avatar--color"
                  style={{
                    backgroundColor: getCollectionBackgroundColor(coll),
                  }}
                >
                  {coll.name.charAt(0)}
                </div>
              ) : (
                <img className="sell__collection" src={coll.coverUrl} alt={coll.name} />
              )}
              {coll.name || shortenEthereumAddress(coll.address)}
              <img
                className="close"
                src={closeIcon}
                alt="Close"
                aria-hidden="true"
                onClick={() => removeCollection(index)}
              />
            </button>
          ))}
          {props.savedCreators.map((creator, index) => (
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
      )}
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
