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
  SelectedFilters,
  BrowseFilterPopup,
  ISearchBarValue,
  ICollectionFilterValue
  } from '../index';

import { ISearchBarDropdownCollection } from '../../../../../../nft/types';
interface IPropsSearchFilter {
  searchText: ISearchBarValue;
  onChange: (values: ISearchBarValue) => void;
  selectedCollections: [];
  setSelectedCollections: (values: any) => void;
  setSearchCollectionAddress: (value: ICollectionFilterValue) => void;
  allCollections: ISearchBarDropdownCollection[];
}

type SaleButton = {
  text: string;
  description: string;
  selected: boolean;
};

export const SearchFilters = (props: IPropsSearchFilter) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState({ min: 0.01, max: 100 });
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const [savedCollections, setSavedCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState<ISearchBarDropdownCollection[]>([]);
  const [savedCreators, setSavedCreators] = useState([]);
  const [selectedCreators, setSelectedCreators] = useState([]);
  const [saleTypeButtons, setSaleTypeButtons] = useState<SaleButton[]>([
    {
      text: 'Buy now',
      description: 'Fixed price sale',
      selected: false,
    },
    {
      text: 'On auction',
      description: 'You can place bids',
      selected: false,
    },
    {
      text: 'New',
      description: 'Recently added',
      selected: false,
    },
    {
      text: 'Has offers',
      description: 'High in demand',
      selected: false,
    },
  ]);

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
        {saleTypeButtons.filter((item) => item.selected === true).length > 0 ||
        selectedPrice ||
        savedCollections.length > 0 ||
        savedCreators.length > 0 ? (
          <SelectedFilters
            saleTypeButtons={saleTypeButtons}
            setSaleTypeButtons={setSaleTypeButtons}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            setSliderValue={setSliderValue}
            selectedTokenIndex={selectedTokenIndex}
            setSelectedTokenIndex={setSelectedTokenIndex}
            savedCollections={savedCollections}
            setSavedCollections={setSavedCollections}
            selectedCreators={selectedCreators}
            setSelectedCreators={setSelectedCreators}
            savedCreators={savedCreators}
            setSavedCreators={setSavedCreators}
            selectedCollections={props.selectedCollections}
            setSelectedCollections={props.setSelectedCollections}
          />
        ) : (
          <></>
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
            <BrowseFilterPopup
              onClose={close}
              saleTypeButtons={saleTypeButtons}
              setSaleTypeButtons={setSaleTypeButtons}
              setSelectedPrice={setSelectedPrice}
              selectedTokenIndex={selectedTokenIndex}
              setSelectedTokenIndex={setSelectedTokenIndex}
              selectedCollections={props.selectedCollections}
              setSelectedCollections={props.setSelectedCollections}
              savedCollections={savedCollections}
              setSavedCollections={setSavedCollections}
              selectedCreators={selectedCreators}
              setSelectedCreators={setSelectedCreators}
              savedCreators={savedCreators}
              setSavedCreators={setSavedCreators}
            />
          )}
        </Popup>
        {(saleTypeButtons.filter((item) => item.selected === true).length > 0 ||
          selectedPrice ||
          savedCollections.length > 0 ||
          savedCreators.length > 0) && (
          <div className="selected--filters--numbers">
            {saleTypeButtons.filter((item) => item.selected === true).length +
              (selectedPrice && +1) +
              savedCollections.length +
              savedCreators.length}
          </div>
        )}
      </div>
    </div>
  );
};