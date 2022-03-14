import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Image,
  Link,
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
  ApiCollectionFilters,
  SaleTypeFilter,
  NFTTypeFilter,
  PriceRangeFilter,
  ApiCollectionsFiltersMobile,
  SaleTypeFilterDropdown, NFTTypeFilterDropdown, PriceRangeFilterDropdown,
} from '../index';

export const SearchFilters = () => {
  const [showFilters, setShowFilters] = useState(false);

  const {
    userCollections,
    selectedCollections,
    disabledSortByFilters,
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
    getSelectedFiltersCount,
    setShowResultsMobile,
    showResultsMobile,
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
          disabled={disabledSortByFilters}
        />
        <div
          className="filter--button"
          onClick={() => setShowFilters(!showFilters)}
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
        {showFilters && (
        <div className="sorting--filters--list">

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
            <ApiCollectionFilters
              allCollections={userCollections}
              handleCollectionSearch={(value) => collectionFilterForm.setValues(value)}
              selectedCollections={selectedCollections}
              setSelectedCollections={setSelectedCollections}
            />
          )}

          {(hasSelectedOrderBookFilters() || hasSelectedCollectionFilter()) && (
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
            <div className="browse__nft__filter__popup">
               <div className="browse__nft__filter__header">
                 <img className="close" src={closeIcon} alt="Close" onClick={close} aria-hidden="true" />
                 <h3>Filters</h3>
                 <button type="button" className="clear__all" onClick={clearAllForms}>
                   Clear all
                 </button>
               </div>
               <div className="browse__nft__filter__body">
                 <Accordion allowMultiple>
                   <AccordionItem borderBottom={'1px solid rgba(0, 0, 0, 0.1)'}>
                     <AccordionButton py={'30px'} fontWeight={'bold'}>
                       <Box flex='1' textAlign='left'>
                         <Image src={SaleTypeIcon} display={'inline-block'} pos={'relative'} top={'-1px'} mr={'8px'} />
                         Sale type
                       </Box>
                       <AccordionIcon />
                     </AccordionButton>
                     <AccordionPanel pb={4}>
                       <SaleTypeFilter value={saleTypeForm.values} onChange={(value) => saleTypeForm.setValues(value)} />
                     </AccordionPanel>
                   </AccordionItem>

                   <AccordionItem borderBottom={'1px solid rgba(0, 0, 0, 0.1)'}>
                     <AccordionButton py={'30px'} fontWeight={'bold'}>
                       <Box flex='1' textAlign='left'>
                         <Image src={NFTTypeIcon} display={'inline-block'} pos={'relative'} top={'-1px'} mr={'8px'} />
                         NFT type
                       </Box>
                       <AccordionIcon />
                     </AccordionButton>
                     <AccordionPanel pb={4}>
                       <NFTTypeFilter value={nftTypeForm.values} onChange={(value) => nftTypeForm.setValues(value)} />
                     </AccordionPanel>
                   </AccordionItem>

                   <AccordionItem borderBottom={'1px solid rgba(0, 0, 0, 0.1)'}>
                     <AccordionButton py={'30px'} fontWeight={'bold'}>
                       <Box flex='1' textAlign='left'>
                         <Image src={PriceRangeIcon} display={'inline-block'} pos={'relative'} top={'-1px'} mr={'8px'} />
                         Price range
                       </Box>
                       <AccordionIcon />
                     </AccordionButton>
                     <AccordionPanel pb={4}>
                       <PriceRangeFilter value={priceRangeForm.values} onChange={(value) => priceRangeForm.setValues(value)} />
                     </AccordionPanel>
                   </AccordionItem>

                   <AccordionItem>
                     <AccordionButton py={'30px'} fontWeight={'bold'}>
                       <Box flex='1' textAlign='left'>
                         <Image src={CollectionsIcon} display={'inline-block'} pos={'relative'} top={'-1px'} mr={'8px'} />
                         Collections
                       </Box>
                       <AccordionIcon />
                     </AccordionButton>
                     <AccordionPanel pb={4}>
                       <ApiCollectionsFiltersMobile
                         allCollections={userCollections}
                         handleCollectionSearch={(value) => collectionFilterForm.setValues(value)}
                         selectedCollections={selectedCollections}
                         setSelectedCollections={setSelectedCollections}
                       />
                     </AccordionPanel>
                   </AccordionItem>
                 </Accordion>
               </div>
               <div className="show--results">
                 <button
                   type="button"
                   className="light-button"
                   disabled={false}
                   onClick={() => setShowResultsMobile(true)}>
                     Show results
                 </button>
               </div>
             </div>
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
