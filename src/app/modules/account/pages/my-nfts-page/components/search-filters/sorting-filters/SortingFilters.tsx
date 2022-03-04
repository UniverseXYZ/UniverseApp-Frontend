import React, { useState, useRef, useEffect } from 'react';
import collectionIcon from '../../../../../../../../assets/images/marketplace/collections.svg';
import arrowDown from '../../../../../../../../assets/images/browse-nft-arrow-down.svg';
import searchIcon from '../../../../../../../../assets/images/search-gray.svg';
import closeIcon from '../../../../../../../../assets/images/close-menu.svg';
import universeIcon from '../../../../../../../../assets/images/universe-img.svg';
import { getCollectionBackgroundColor } from '../../../../../../../../utils/helpers';
import { shortenEthereumAddress } from '../../../../../../../../utils/helpers/format';

interface IPropsSortingFilters {
  saleTypeButtons: any[],
  setSaleTypeButtons: (values: any[]) => void,
  selectedPrice: number,
  setSelectedPrice: (value: number) => void,
  sliderValue: any,
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
  allCollections: any[],
};

export const ApiSortingFilters = (props : IPropsSortingFilters) => {
  const [showCollectionsDropdown, setShowCollectionsDropdown] = useState(false);
  const [searchByCollections, setSearchByCollections] = useState('');

  const ref = useRef<HTMLDivElement>(null);

  const handleSearchCollection = (value: any) => {
    setSearchByCollections(value);
  };

  const handleSelectCollection = (coll: any) => {
    const newSelectedCollections = [...props.selectedCollections];
    if (newSelectedCollections.filter((item) => item.id === coll.id).length === 0) {
      newSelectedCollections.push(coll);
    }
    props.setSelectedCollections(newSelectedCollections);
  };

  const removeCollection = (index: any) => {
    const newSelectedCollections = [...props.selectedCollections];
    newSelectedCollections.splice(index, 1);
    props.setSelectedCollections(newSelectedCollections);
  };

  const handleClearCollections = () => {
    if (props.selectedCollections.length) {
      props.setSelectedCollections([]);
    }
    setSearchByCollections('');
  };

  const handleSaveCollections = () => {
    props.setSavedCollections(props.selectedCollections);
    setShowCollectionsDropdown(false);
  };

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowCollectionsDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="sorting--filters--list">
      <div
        className={`sorting--filter ${showCollectionsDropdown ? 'open' : ''}`}
        ref={ref}
        aria-hidden="true"
        onClick={() => setShowCollectionsDropdown(!showCollectionsDropdown)}
      >
        <p className="filter--name">
          <img className="filter__icon" src={collectionIcon} alt="Collection" />
          Collections {props.selectedCollections.length > 0 && `(${props.selectedCollections.length})`}
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
                {props.selectedCollections.map((coll, index) => (
                  <button type="button" className="light-border-button" key={coll.id}>
                    {coll.address ===
                    process?.env?.REACT_APP_UNIVERSE_ERC_721_ADDRESS?.toLowerCase() ? (
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
                {props.allCollections
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
                      process?.env?.REACT_APP_UNIVERSE_ERC_721_ADDRESS?.toLowerCase() ? (
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