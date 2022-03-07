import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

// Styles
import './SearchFilters.scss';

// Icons
import filtersIcon from '../../../../../../../../assets/images/marketplace/filters.svg';

// Components & Interfaces
import {
  SearchNFTsField,
  SortingDropdowns,
  ApiCollectionFilters,
  BrowseFiltersPopup,
  ISearchBarValue,
  ICollectionFilterValue
  } from '../index';

import { ISearchBarDropdownCollection } from '../../../../../../nft/types';
interface IPropsSearchFilter {
  searchText: ISearchBarValue;
  onChange: (values: ISearchBarValue) => void;
  setSearchCollectionAddress: (value: ICollectionFilterValue) => void;
  allCollections: ISearchBarDropdownCollection[];
}

export const SearchFilters = (props: IPropsSearchFilter) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<ISearchBarDropdownCollection[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const element = document.querySelector('.search--sort--filters--section') as HTMLElement;

      if (element) {
        const header = document.querySelector('header');
        if (!header) return;

        if (window.scrollY >= element.offsetTop) {
          header.style.position = 'absolute';
        } else {
          header.style.position = 'fixed';
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="search--sort--filters--section">
      <div className="search--sort--filters">
        <SearchNFTsField
          searchValue={props.searchText}
          onChange={props.onChange}
          placeholder="Search for a NFT"
        />
        <SortingDropdowns />
        <div
          className="filter--button"
          onClick={() => setShowFilters(!showFilters)}
          aria-hidden="true"
        >
          {selectedCollections.length ? (
            <div className="tablet--selected--filters">
              {selectedCollections.length}
            </div>
          ) : (
            <img src={filtersIcon} alt="Filter" />
          )}
          Filters
        </div>
        {showFilters && (
        <div className="sorting--filters--list">
          <ApiCollectionFilters
            allCollections={props.allCollections}
            handleCollectionSearch={props.setSearchCollectionAddress}
            selectedCollections={selectedCollections}
            setSelectedCollections={setSelectedCollections}
          />
        </div>
        )}
      </div>
      <div className="mobile--filters">
        <Popup
          trigger={
            <button type="button" className="light-button">
              <img src={filtersIcon} alt="Filter" />
            </button>
          }
        >
          {(close: any) => (
            <BrowseFiltersPopup
              onClose={close}
              allCollections={props.allCollections}
              handleCollectionSearch={props.setSearchCollectionAddress}
              selectedCollections={selectedCollections}
              setSelectedCollections={setSelectedCollections}
            />
          )}
        </Popup>
        {selectedCollections.length && (
          <div className="selected--filters--numbers">
            {selectedCollections.length}
          </div>
        )}
      </div>
    </div>
  );
};