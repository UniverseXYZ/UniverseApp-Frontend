import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Link } from '@chakra-ui/react';

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
  SaleTypeFilter,
  NFTTypeFilter,
  PriceRangeFilter,
  } from '../index';

export const SearchFilters = () => {
  const [showFilters, setShowFilters] = useState(false);

  const {
    userCollections,
    selectedCollections,
    setSelectedCollections,
    searchBarForm,
    collectionFilterForm,
    saleTypeForm,
    nftTypeForm,
    priceRangeForm,
    sortByForm,
    showSaleTypeFilters,
    showNFTTypeFilters,
    showPriceRangeFilters,
    showCollectionFilters,
    // OrderBook BE Filters
    hasSelectedOrderBookFilters,
    // Scraper BE Filters
    hasSelectedCollectionFilter,
    clearAllForms,
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
          value={searchBarForm.values}
          onChange={(value) => searchBarForm.setValues(value)}
          placeholder="Search for a NFT"
        />
        <SortingDropdowns
          value={sortByForm.values}
          onSelect={(values) => sortByForm.setValues(values)}
          onClear={() => sortByForm.resetForm()}
        />
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

          {showSaleTypeFilters && (
            <SaleTypeFilter
              value={saleTypeForm.values}
              onChange={(values) => saleTypeForm.setValues(values)}
              onClear={() => saleTypeForm.resetForm()}
            />
          )}

          {showNFTTypeFilters && (
            <NFTTypeFilter
              value={nftTypeForm.values}
              onChange={(values) => nftTypeForm.setValues(values)}
              onClear={() => nftTypeForm.resetForm()}
            />
          )}

          {showPriceRangeFilters && (
            <PriceRangeFilter
              value={priceRangeForm.values}
              isDirty={priceRangeForm.dirty}
              onChange={(values) => priceRangeForm.setValues(values)}
              onClear={() => priceRangeForm.resetForm()}
           />
          )}

          {showCollectionFilters && (
            <ApiCollectionFilters
              allCollections={userCollections}
              handleCollectionSearch={(value) => collectionFilterForm.setValues(value)}
              selectedCollections={selectedCollections}
              setSelectedCollections={setSelectedCollections}
            />
          )}

          {hasSelectedOrderBookFilters() || hasSelectedCollectionFilter() && (
              <Link
                onClick={clearAllForms}
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'underline',
                  _hover: {
                    textDecoration: 'none',
                  }
                }
              }>
                Clear all
              </Link>
          )}

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