import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

// Styles
import './SearchFilters.scss';

// Icons
import filtersIcon from '../../../../../../../../assets/images/marketplace/filters.svg';

// Contexts
import { useFiltersContext } from '../search-filters.context';

// Components & Interfaces
import {
  SearchNFTsField,
  SortingDropdowns,
  ApiCollectionFilters,
  BrowseFiltersPopup,
  } from '../index';

import { ISearchBarDropdownCollection } from '../../../../../../nft/types';

export const SearchFilters = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<ISearchBarDropdownCollection[]>([]);

  const {
    searchBarForm,
    collectionFilterForm,
    userCollections,
  } = useFiltersContext();

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
          onChange={(value) => searchBarForm.setValues(value)}
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
            allCollections={userCollections}
            handleCollectionSearch={(value) => collectionFilterForm.setValues(value)}
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
              allCollections={userCollections}
              handleCollectionSearch={(value) => collectionFilterForm.setValues(value)}
              selectedCollections={selectedCollections}
              setSelectedCollections={setSelectedCollections}
            />
          )}
        </Popup>
        {selectedCollections.length > 0 && (
          <div className="selected--filters--numbers">
            {selectedCollections.length}
          </div>
        )}
      </div>
    </div>
  );
};