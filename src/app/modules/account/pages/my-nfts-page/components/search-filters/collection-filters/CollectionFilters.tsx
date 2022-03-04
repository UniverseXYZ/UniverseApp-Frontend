import React, { useState, useRef, useEffect } from 'react';

// Icons
import collectionIcon from '../../../../../../../../assets/images/marketplace/collections.svg';
import arrowDown from '../../../../../../../../assets/images/browse-nft-arrow-down.svg';
import searchIcon from '../../../../../../../../assets/images/search-gray.svg';
import closeIcon from '../../../../../../../../assets/images/close-menu.svg';
import universeIcon from '../../../../../../../../assets/images/universe-img.svg';

// Helpers
import { getCollectionBackgroundColor } from '../../../../../../../../utils/helpers';
import { shortenEthereumAddress } from '../../../../../../../../utils/helpers/format';

// Interfaces
import { ISearchBarDropdownCollection } from '../../../../../../nft/types';

interface IPropsSortingFilters {
  handleCollectionSearch: (value: ICollectionFilterValue) => void,
  allCollections: ISearchBarDropdownCollection[],
  selectedCollections: ISearchBarDropdownCollection[],
  setSelectedCollections: (c: ISearchBarDropdownCollection[]) => void,
};

export interface ICollectionFilterValue {
  contractAddress: string;
}

export const ApiCollectionFilters = (props : IPropsSortingFilters) => {
  const [showCollectionsDropdown, setShowCollectionsDropdown] = useState<boolean>(false);
  const [collectionName, setCollectionName] = useState<string>('');

  const ref = useRef<HTMLDivElement>(null);

  const handleSearchCollection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;

    setCollectionName(name);
  };

  const handleSelectCollection = (c: ISearchBarDropdownCollection) => {
    const alreadySelected = props.selectedCollections.find((item) => item.id === c.id);

    if (alreadySelected) return;

    const newSelectedCollections = [c];
    props.setSelectedCollections(newSelectedCollections);
  };

  const handleClearCollections = () => {
    props.setSelectedCollections([]);
    setCollectionName('');

    const r: ICollectionFilterValue = {
      contractAddress: ''
    };

    props.handleCollectionSearch(r);
  };

  const handleSave = () => {
    const c: ISearchBarDropdownCollection = props.selectedCollections[0];

    const r: ICollectionFilterValue = {
      contractAddress: c.address
    };

    props.handleCollectionSearch(r);
  }

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
                {props.selectedCollections.map((coll, index) => {
                  const isUniverse = coll?.address?.toLowerCase() === process?.env?.REACT_APP_UNIVERSE_ERC_721_ADDRESS?.toLowerCase();
                  const hasImage = coll.image;

                  return (
                    <button type="button" className="light-border-button" key={coll.id}>
                      {isUniverse
                        ? (
                            <img className="sell__collection" src={universeIcon} alt={coll.name} />
                          )
                        : !hasImage ? (
                          <div
                            className="random--avatar--color"
                            style={{backgroundColor: getCollectionBackgroundColor(coll)}}
                          >
                            {coll.name.charAt(0)}
                          </div>
                          )
                        : (
                            <img className="sell__collection" src={coll.image} alt={coll.name} />
                          )
                      }
                      {coll.name || shortenEthereumAddress(coll.address)}
                      <img
                        className="close"
                        src={closeIcon}
                        alt="Close"
                        aria-hidden="true"
                        onClick={handleClearCollections}
                      />
                    </button>
                  )
                })}
              </div>
              <div className="collection--search--field">
                <input
                  type="text"
                  placeholder="Filter"
                  onChange={handleSearchCollection}
                  value={collectionName}
                />
                <img src={searchIcon} alt="Search" />
              </div>
              <div className="collections__list">
                {props.allCollections
                  .filter((item) =>
                    item.name.toLowerCase().includes(collectionName.toLowerCase())
                  )
                  .map((coll, index) => {
                    const isUniverse = coll?.address?.toLowerCase() === process?.env?.REACT_APP_UNIVERSE_ERC_721_ADDRESS?.toLowerCase();
                    const hasImage = coll.image;

                    return (
                      <div
                        className="collection__item"
                        key={coll.id}
                        onClick={() => handleSelectCollection(coll)}
                        aria-hidden="true"
                      >
                        {isUniverse
                          ? (
                              <img className="collection__avatar" src={universeIcon} alt={coll.name} />
                            )
                          : !hasImage ? (
                            <div
                              className="random--avatar--color"
                              style={{
                                backgroundColor: getCollectionBackgroundColor(coll),
                              }}
                            >
                              {coll.name.charAt(0)}
                            </div>
                            )
                          : (
                             <img className="collection__avatar" src={coll.image} alt={coll.name} />
                            )
                        }
                        <p>
                          {coll.name || shortenEthereumAddress(coll.address)}
                        </p>
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className="collection--dropdown--footer">
              <button type="button" className="clear--all" onClick={handleClearCollections}>
                Clear
              </button>
              <button
                type="button"
                className="light-button"
                disabled={!props.selectedCollections.length}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
  );
};