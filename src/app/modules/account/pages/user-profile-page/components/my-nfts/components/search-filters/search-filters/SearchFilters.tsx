import { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';

// Styles
// import './SearchFilters.scss';

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
import { FiltersPopup, Icon } from '../../../../../../../components';

interface ISearchFiltersProps {
  onFilterChanges?: (values: {
    searchBar: unknown;
    collectionFilter: unknown;
    saleType: unknown;
    nftType: unknown;
    priceRange: unknown;
    sortBy: unknown;
  }) => void;
}

export const SearchFilters = (props: ISearchFiltersProps) => {
  const { onFilterChanges } = props;

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

  useEffect(() => {
    onFilterChanges && onFilterChanges({
      searchBar: searchBarForm.values,
      collectionFilter: collectionFilterForm.values,
      saleType: saleTypeForm.values,
      nftType: nftTypeForm.values,
      priceRange: priceRangeForm.values,
      sortBy: sortByForm.values,
    });
  }, [
    onFilterChanges,
    searchBarForm.values,
    collectionFilterForm.values,
    saleTypeForm.values,
    nftTypeForm.values,
    priceRangeForm.values,
    sortByForm.values,
  ])

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
            <Icon name={'filters'} mr={'10px'} />
          )}
          Filters
        </div>
        <FiltersPopup
          mobileFilters={[
            {
              name: 'Sale type',
              form: saleTypeForm,
              visible: showSaleTypeFilters,
              icon: 'filterSaleType',
              renderFilter: (props) => <SaleTypeFilter {...props} />
            },
            {
              name: 'NFT type',
              form: nftTypeForm,
              visible: showNFTTypeFilters,
              icon: 'filterNftType',
              renderFilter: (props) => <NFTTypeFilter {...props} />
            },
            {
              name: 'Price range',
              form: priceRangeForm,
              visible: showPriceRangeFilters,
              icon: 'filterPriceRange',
              renderFilter: (props) => <PriceRangeFilter {...props} />
            },
            {
              name: 'Collections',
              form: collectionFilterForm,
              visible: showCollectionFilters,
              icon: 'filterCollection',
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
