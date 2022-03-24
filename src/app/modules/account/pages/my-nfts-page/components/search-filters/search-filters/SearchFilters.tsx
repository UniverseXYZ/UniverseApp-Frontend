import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box, Flex,
  Image,
  Link, LinkProps,
} from '@chakra-ui/react';

// Styles
import './SearchFilters.scss';

// Icons
import filtersIcon from '../../../../../../../../assets/images/marketplace/filters.svg';
import closeIcon from '../../../../../../../../assets/images/close-menu.svg';
import SaleTypeIcon from '../../../../../../../../assets/images/v2/marketplace/filter-sale-type.svg';
import NFTTypeIcon from '../../../../../../../../assets/images/v2/marketplace/filter-nft-type.svg';
import PriceRangeIcon from '../../../../../../../../assets/images/v2/marketplace/filter-price-range.svg';
import CollectionsIcon from '../../../../../../../../assets/images/v2/marketplace/filter-collections.svg';

// Contexts
import { useFiltersContext } from '../search-filters.context';

// Components & Interfaces
import {
  SearchNFTsField,
  SortingDropdowns,
} from '../index';
import {
  SaleTypeFilter,
  NFTTypeFilter,
  PriceRangeFilter,
  SaleTypeFilterDropdown,
  NFTTypeFilterDropdown,
  PriceRangeFilterDropdown,
  CollectionsFilterDropdown,
  CollectionsFilter,
  ClearAllButton,
} from '../../../../../../../components/filters';
import { FiltersPopup } from '../../../../../../../components';

export const SearchFilters = () => {
  const {
    userCollections,
    disabledSortByFilters,
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
    getSelectedFiltersCount,
    showFiltersToggle,
    setShowFiltersToggle,
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
      {/*TODO: remove this trick in future by adding button size prop to SortingDropdowns */}
      <Box className="search--sort--filters" sx={{ '> button': { h: '50px' } }}>
        <SearchNFTsField
          value={searchBarForm.values}
          onChange={(value) => searchBarForm.setValues(value)}
          placeholder="Search for a NFT"
        />
        <SortingDropdowns
          value={sortByForm.values}
          onSelect={(values) => sortByForm.setValues(values)}
          onClear={() => sortByForm.resetForm()}
          disabled={disabledSortByFilters}
        />
        <div
          className="filter--button"
          onClick={() => setShowFiltersToggle(!showFiltersToggle)}
          aria-hidden="true"
        >
          {getSelectedFiltersCount() > 0 ? (
            <div className="tablet--selected--filters">
              {getSelectedFiltersCount()}
            </div>
          ) : (
            <img src={filtersIcon} alt="Filter" />
          )}
          Filters
        </div>
        <FiltersPopup
          mobileFilters={[
            {
              name: 'Sale type',
              form: saleTypeForm,
              visible: showSaleTypeFilters,
              icon: SaleTypeIcon,
              renderFilter: (props) => <SaleTypeFilter {...props} />
            },
            {
              name: 'NFT type',
              form: nftTypeForm,
              visible: showNFTTypeFilters,
              icon: NFTTypeIcon,
              renderFilter: (props) => <NFTTypeFilter {...props} />
            },
            {
              name: 'Price range',
              form: priceRangeForm,
              visible: showPriceRangeFilters,
              icon: PriceRangeIcon,
              renderFilter: (props) => <PriceRangeFilter {...props} />
            },
            {
              name: 'Collections',
              form: collectionFilterForm,
              visible: showCollectionFilters,
              icon: CollectionsIcon,
              renderFilter: (props) => <CollectionsFilter {...props} items={userCollections} />
            },
          ]}
        >
          {() => (
            showFiltersToggle && (
              <Flex className="sorting--filters--list" alignItems={'center'} sx={{ '> button': { mr: '10px' } }}>
                {showSaleTypeFilters && (
                  <SaleTypeFilterDropdown
                    value={saleTypeForm.values}
                    onSave={(values) => saleTypeForm.setValues(values)}
                    onClear={() => saleTypeForm.resetForm()}
                  />
                )}

                {showNFTTypeFilters && (
                  <NFTTypeFilterDropdown
                    value={nftTypeForm.values}
                    onSave={(value) => nftTypeForm.setValues(value)}
                    onClear={() => nftTypeForm.resetForm()}
                  />
                )}

                {showPriceRangeFilters && (
                  <PriceRangeFilterDropdown
                    value={priceRangeForm.values}
                    isDirty={priceRangeForm.dirty}
                    onSave={(value) => priceRangeForm.setValues(value)}
                    onClear={() => priceRangeForm.resetForm()}
                  />
                )}

                {showCollectionFilters && (
                  <CollectionsFilterDropdown
                    items={userCollections}
                    value={collectionFilterForm.values}
                    onSave={(value) => collectionFilterForm.setValues(value)}
                    onClear={() => collectionFilterForm.resetForm()}
                  />
                )}

                {(hasSelectedOrderBookFilters() || hasSelectedCollectionFilter()) && (
                  <ClearAllButton onClick={clearAllForms} />
                )}
              </Flex>
            )
          )}
        </FiltersPopup>
      </Box>
    </div>
  );
};
