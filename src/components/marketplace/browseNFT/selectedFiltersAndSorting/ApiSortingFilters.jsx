import React, { useContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import { PLACEHOLDER_MARKETPLACE_USERS } from '../../../../utils/fixtures/BrowseNFTsDummyData';

import salesIcon from '../../../../assets/images/marketplace/sale-type.svg';
import priceIcon from '../../../../assets/images/marketplace/price-range.svg';
import collectionIcon from '../../../../assets/images/marketplace/collections.svg';
import artistIcon from '../../../../assets/images/marketplace/artist.svg';
import arrowDown from '../../../../assets/images/browse-nft-arrow-down.svg';
import ethereumIcon from '../../../../assets/images/eth-icon.svg';
import daiIcon from '../../../../assets/images/dai_icon.svg';
import usdcIcon from '../../../../assets/images/usdc_icon.svg';
import bondIcon from '../../../../assets/images/bond_icon.svg';
import snxIcon from '../../../../assets/images/snx.svg';
import searchIcon from '../../../../assets/images/search-gray.svg';
import closeIcon from '../../../../assets/images/close-menu.svg';
import AppContext from '../../../../ContextAPI';
import { defaultColors, getCollectionBackgroundColor } from '../../../../utils/helpers';
import { useAuthContext } from '../../../../contexts/AuthContext';
import universeIcon from '../../../../assets/images/universe-img.svg';
import { shortenEthereumAddress } from '../../../../utils/helpers/format';

const ApiSortingFilters = ({
  saleTypeButtons,
  setSaleTypeButtons,
  selectedPrice,
  setSelectedPrice,
  sliderValue,
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
  allCollections,
}) => {
  const [showSaleDropdown, setShowSaleDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [singleItems, setSingleItems] = useState(true);
  const [showPriceItems, setShowPriceItems] = useState(false);
  const [disabledMin, setDisabledMin] = useState(false);
  const [disabledMax, setDisabledMax] = useState(false);
  const [showCollectionsDropdown, setShowCollectionsDropdown] = useState(false);
  const [showArtistsDropdown, setShowArtistsDropdown] = useState(false);
  // const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);

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

  const [selectedButtons, setSelectedButtons] = useState([...saleTypeButtons]);
  const [searchByCollections, setSearchByCollections] = useState('');
  const [creators, setCreators] = useState(PLACEHOLDER_MARKETPLACE_USERS);
  const [searchByCreators, setSearchByCreators] = useState('');

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const handleSelect = (idx) => {
    const newSaleTypeButtons = [...selectedButtons];
    newSaleTypeButtons[idx].selected = !newSaleTypeButtons[idx].selected;
    setSelectedButtons(newSaleTypeButtons);
  };

  const handleClearSale = () => {
    const newSaleTypeButtons = [...selectedButtons];
    newSaleTypeButtons.forEach((item) => {
      item.selected = false;
    });
    setSelectedButtons(newSaleTypeButtons);
  };
  const handleSaveSale = () => {
    setSaleTypeButtons(selectedButtons);
    setShowSaleDropdown(false);
  };

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

  const handleClearPrice = () => {
    setSliderValue({ min: 0.01, max: 100 });
    setDisabledMin(false);
    setDisabledMax(false);
    // setSelectedPrice(null);
    setShowPriceDropdown(false);
  };

  const handleSavePrice = () => {
    if ((disabledMax && disabledMin) || (sliderValue.min > 0.01 && sliderValue.max < 100)) {
      if (sliderValue.max > sliderValue.min) {
        setSelectedPrice(sliderValue);
        setShowPriceDropdown(false);
      }
    }
  };

  const handleSearchCollection = (value) => {
    setSearchByCollections(value);
  };
  const handleSelectCollection = (coll) => {
    const newSelectedCollections = [...selectedCollections];
    if (newSelectedCollections.filter((item) => item.id === coll.id).length === 0) {
      newSelectedCollections.push(coll);
    }
    setSelectedCollections(newSelectedCollections);
  };

  const removeCollection = (index) => {
    const newSelectedCollections = [...selectedCollections];
    newSelectedCollections.splice(index, 1);
    setSelectedCollections(newSelectedCollections);
  };

  const handleClearCollections = () => {
    if (selectedCollections.length) {
      setSelectedCollections([]);
    }
    setSearchByCollections('');
    // setShowCollectionsDropdown(false);
  };

  const handleSaveCollections = () => {
    setSavedCollections(selectedCollections);
    setShowCollectionsDropdown(false);
  };

  const handleSearchCreators = (value) => {
    setSearchByCreators(value);
  };

  const handleSelectCreators = (creator) => {
    const newSelectedArtists = [...selectedCreators];
    if (newSelectedArtists.filter((item) => item.id === creator.id).length === 0) {
      newSelectedArtists.push(creator);
    }
    setSelectedCreators(newSelectedArtists);
  };

  const removeArtist = (index) => {
    const newSelectedArtists = [...selectedCreators];
    newSelectedArtists.splice(index, 1);
    setSelectedCreators(newSelectedArtists);
  };
  const handleClearArtists = () => {
    setSelectedCreators([]);
    setSearchByCreators('');
  };
  const handleSaveArtist = () => {
    setSavedCreators(selectedCreators);
    setShowArtistsDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (ref1.current && !ref1.current.contains(event.target)) {
      setShowSaleDropdown(false);
    }
    if (ref2.current && !ref2.current.contains(event.target)) {
      setShowPriceDropdown(false);
    }
    if (ref3.current && !ref3.current.contains(event.target)) {
      setShowCollectionsDropdown(false);
    }
    if (ref4.current && !ref4.current.contains(event.target)) {
      setShowArtistsDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="sorting--filters--list">
      <div
        className={`sorting--filter ${showCollectionsDropdown ? 'open' : ''}`}
        ref={ref3}
        aria-hidden="true"
        onClick={() => setShowCollectionsDropdown(!showCollectionsDropdown)}
      >
        <p className="filter--name">
          <img className="filter__icon" src={collectionIcon} alt="Collection" />
          Collections {selectedCollections.length > 0 && `(${selectedCollections.length})`}
        </p>
        <img
          className={`arrow ${showCollectionsDropdown ? 'rotate' : ''}`}
          src={arrowDown}
          alt="Arrow"
        />
        <div className="box--shadow--effect--block" />
        {showCollectionsDropdown && (
          <div
            className="collection--dropdown"
            aria-hidden="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="collection--dropdown--body">
              <div className="collection--dropdown--selected">
                {selectedCollections.map((coll, index) => (
                  <button type="button" className="light-border-button" key={coll.id}>
                    {coll.address ===
                    process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
                      <img className="sell__collection" src={universeIcon} alt={coll.name} />
                    ) : !coll.coverUrl ? (
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
              </div>
              <div className="collection--search--field">
                <input
                  type="text"
                  placeholder="Filter"
                  onChange={(e) => handleSearchCollection(e.target.value)}
                  value={searchByCollections}
                />
                <img src={searchIcon} alt="Search" />
              </div>
              <div className="collections__list">
                {allCollections
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchByCollections.toLowerCase())
                  )
                  .sort((a, b) => b.nftCount - a.nftCount)
                  .map((coll, index) => (
                    <div
                      className="collection__item"
                      key={coll.id}
                      onClick={() => handleSelectCollection(coll)}
                      aria-hidden="true"
                    >
                      {coll.address ===
                      process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
                        <img className="collection__avatar" src={universeIcon} alt={coll.name} />
                      ) : !coll.coverUrl ? (
                        <div
                          className="random--avatar--color"
                          style={{
                            backgroundColor: getCollectionBackgroundColor(coll),
                          }}
                        >
                          {coll.name.charAt(0)}
                        </div>
                      ) : (
                        <img className="collection__avatar" src={coll.coverUrl} alt={coll.name} />
                      )}
                      <p>
                        {coll.name || shortenEthereumAddress(coll.address)} ({coll.nftCount})
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="collection--dropdown--footer">
              <button type="button" className="clear--all" onClick={() => handleClearCollections()}>
                Clear
              </button>
              <button
                type="button"
                className="light-button"
                onClick={() => handleSaveCollections()}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ApiSortingFilters.propTypes = {
  saleTypeButtons: PropTypes.oneOfType([PropTypes.array]),
  setSaleTypeButtons: PropTypes.func,
  selectedPrice: PropTypes.oneOfType([PropTypes.any]),
  setSelectedPrice: PropTypes.func,
  sliderValue: PropTypes.oneOfType([PropTypes.any]),
  setSliderValue: PropTypes.func,
  selectedTokenIndex: PropTypes.number,
  setSelectedTokenIndex: PropTypes.func,
  selectedCollections: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setSelectedCollections: PropTypes.func.isRequired,
  savedCollections: PropTypes.oneOfType([PropTypes.array]),
  setSavedCollections: PropTypes.func,
  selectedCreators: PropTypes.oneOfType([PropTypes.array]),
  setSelectedCreators: PropTypes.func,
  savedCreators: PropTypes.oneOfType([PropTypes.array]),
  setSavedCreators: PropTypes.func,
  allCollections: PropTypes.oneOfType([PropTypes.array]),
};

ApiSortingFilters.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
  selectedPrice: null,
  setSelectedPrice: () => {},
  sliderValue: null,
  setSliderValue: () => {},
  selectedTokenIndex: 0,
  setSelectedTokenIndex: () => {},
  savedCollections: [],
  setSavedCollections: () => {},
  selectedCreators: [],
  setSelectedCreators: () => {},
  savedCreators: [],
  setSavedCreators: () => {},
  allCollections: [],
};

export default ApiSortingFilters;
