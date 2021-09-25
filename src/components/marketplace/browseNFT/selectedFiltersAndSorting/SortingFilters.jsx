import React, { useContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
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

const SortingFilters = ({
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
  const { deployedCollections } = useAuthContext();
  const [selectedButtons, setSelectedButtons] = useState([...saleTypeButtons]);
  const [searchByCollections, setSearchByCollections] = useState('');
  const [collections, setCollections] = useState(deployedCollections);
  console.log(deployedCollections);
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
    setSelectedCollections([]);
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
  });
  // TODO: Uncomment for marketplace
  return (
    <div className="sorting--filters--list">
      {/* <div
        className={`sorting--filter ${showSaleDropdown ? 'open' : ''}`}
        aria-hidden="true"
        ref={ref1}
        onClick={() => setShowSaleDropdown(!showSaleDropdown)}
      >
        <p className="filter--name">
          <img className="filter__icon" src={salesIcon} alt="Sale" />
          Sale type{' '}
          {selectedButtons.filter((item) => item.selected === true).length > 0 &&
            `(${selectedButtons.filter((item) => item.selected === true).length})`}
        </p>
        <img className={`arrow ${showSaleDropdown ? 'rotate' : ''}`} src={arrowDown} alt="Arrow" />
        <div className="box--shadow--effect--block" />
        {showSaleDropdown && (
          <div className="sale--dropdown" aria-hidden="true" onClick={(e) => e.stopPropagation()}>
            <div className="sale--dropdown--body">
              <div className="sale--dropdown--header">
                <div
                  className={singleItems ? 'active' : ''}
                  onClick={() => setSingleItems(true)}
                  aria-hidden="true"
                >
                  Single items
                </div>
                <div
                  className={singleItems ? '' : 'active'}
                  onClick={() => setSingleItems(false)}
                  aria-hidden="true"
                >
                  Bundles
                </div>
              </div>
              <div className="sale--types">
                {selectedButtons.map((item, index) => (
                  <div className="sale--type--div">
                    <input
                      type="checkbox"
                      className="sale--type--checkboxes"
                      onChange={() => handleSelect(index)}
                      checked={item.selected}
                    />
                    <div className="sale--type--name">
                      <h4>{item.text}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sale--dropdown--footer">
              <button type="button" className="clear--all" onClick={() => handleClearSale()}>
                Clear
              </button>
              <button type="button" className="light-button" onClick={() => handleSaveSale()}>
                Save
              </button>
            </div>
          </div>
        )}
      </div> */}
      {/* <div
        className={`sorting--filter ${showPriceDropdown ? 'open' : ''}`}
        ref={ref2}
        aria-hidden="true"
        onClick={() => setShowPriceDropdown(!showPriceDropdown)}
      >
        <p className="filter--name">
          <img className="filter__icon" src={priceIcon} alt="Price" />
          Price range
        </p>
        <img className={`arrow ${showPriceDropdown ? 'rotate' : ''}`} src={arrowDown} alt="Arrow" />
        <div className="box--shadow--effect--block" />
        {showPriceDropdown && (
          <div className="price__dropdown" aria-hidden="true" onClick={(e) => e.stopPropagation()}>
            <div className="price__dropdown__body">
              <div
                className={`price--dropdown ${showPriceItems ? 'open' : ''}`}
                aria-hidden="true"
                onClick={(e) => {
                  setShowPriceItems(!showPriceItems);
                  e.stopPropagation();
                }}
              >
                <div>
                  <img
                    src={bidTokens[selectedTokenIndex]?.icon}
                    alt={bidTokens[selectedTokenIndex]?.title}
                  />
                </div>
                <div>
                  <h6>
                    {bidTokens[selectedTokenIndex]?.title}
                    <p>({bidTokens[selectedTokenIndex]?.subtitle})</p>
                  </h6>
                </div>
                <div>
                  <img
                    src={arrowDown}
                    alt="Arrow Down"
                    className={showPriceItems ? 'rotate' : ''}
                  />
                </div>
                {showPriceItems ? (
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
                <div className="value--div">
                  <p className="value--text">Min price</p>
                  <input
                    type="number"
                    min="0.01"
                    max="100"
                    onChange={validateMinValue}
                    value={(selectedPrice || disabledMin) && sliderValue.min}
                  />
                </div>
                <div className="value--div">
                  <p className="value--text">Max price</p>
                  <input
                    type="number"
                    min="0.01"
                    max="100"
                    onChange={validateMaxValue}
                    value={(selectedPrice || disabledMax) && sliderValue.max}
                  />
                </div>
              </div>
            </div>
            <div className="price--dropdown--footer">
              <button type="button" className="clear--all" onClick={() => handleClearPrice()}>
                Clear
              </button>
              <button type="button" className="light-button" onClick={() => handleSavePrice()}>
                Save
              </button>
            </div>
          </div>
        )}
      </div> */}
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
                {collections
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchByCollections.toLowerCase())
                  )
                  .map(
                    (coll, index) =>
                      index < 5 && (
                        <div
                          className="collection__item"
                          key={uuid()}
                          onClick={() => handleSelectCollection(coll)}
                          aria-hidden="true"
                        >
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
                            <img
                              className="collection__avatar"
                              src={coll.coverUrl}
                              alt={coll.name}
                            />
                          )}
                          <p>{coll.name}</p>
                        </div>
                      )
                  )}
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
      {/* <div
        className={`sorting--filter ${showArtistsDropdown ? 'open' : ''}`}
        ref={ref4}
        aria-hidden="true"
        onClick={() => setShowArtistsDropdown(!showArtistsDropdown)}
      >
        <p className="filter--name">
          <img className="filter__icon" src={artistIcon} alt="Artist" />
          Artists {selectedCreators.length > 0 && `(${selectedCreators.length})`}
        </p>
        <img
          className={`arrow ${showArtistsDropdown ? 'rotate' : ''}`}
          src={arrowDown}
          alt="Arrow"
        />
        <div className="box--shadow--effect--block" />
        {showArtistsDropdown && (
          <div className="artist--dropdown" aria-hidden="true" onClick={(e) => e.stopPropagation()}>
            <div className="artist--dropdown--body">
              <div className="artist--dropdown--selected">
                {selectedCreators.map((artist, index) => (
                  <button type="button" className="light-border-button" key={uuid()}>
                    <img className="artist" src={artist.avatar} alt={artist.name} />
                    {artist.name}
                    <img
                      className="close"
                      src={closeIcon}
                      alt="Close"
                      aria-hidden="true"
                      onClick={() => removeArtist(index)}
                    />
                  </button>
                ))}
              </div>
              <div className="artist--search--field">
                <input
                  type="text"
                  placeholder="Filter"
                  onChange={(e) => handleSearchCreators(e.target.value)}
                  value={searchByCreators}
                />
                <img src={searchIcon} alt="Search" />
              </div>
              <div className="artists__list">
                {creators
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchByCreators.toLowerCase())
                  )
                  .map(
                    (creator, index) =>
                      index < 5 && (
                        <div
                          className="artists__item"
                          key={uuid()}
                          aria-hidden="true"
                          onClick={() => handleSelectCreators(creator)}
                        >
                          <img className="artist__avatar" src={creator.avatar} alt={creator.name} />
                          <p>{creator.name}</p>
                        </div>
                      )
                  )}
              </div>
            </div>
            <div className="artists--dropdown--footer">
              <button type="button" className="clear--all" onClick={() => handleClearArtists()}>
                Clear
              </button>
              <button type="button" className="light-button" onClick={() => handleSaveArtist()}>
                Save
              </button>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

SortingFilters.propTypes = {
  saleTypeButtons: PropTypes.oneOfType([PropTypes.array]),
  setSaleTypeButtons: PropTypes.func,
  selectedPrice: PropTypes.oneOfType([PropTypes.any]),
  setSelectedPrice: PropTypes.func,
  sliderValue: PropTypes.oneOfType([PropTypes.any]),
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

SortingFilters.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
  selectedPrice: null,
  setSelectedPrice: () => {},
  sliderValue: null,
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

export default SortingFilters;
