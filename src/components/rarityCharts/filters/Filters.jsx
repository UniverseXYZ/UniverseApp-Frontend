import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import SearchField from '../../input/SearchField';
import SortBySelect from '../../input/SortBySelect';
import SortByOrder from '../../input/SortByOrder';
import priceIcon from '../../../assets/images/eth-icon-new.svg';
import filterIcon from '../../../assets/images/filters-icon-black.svg';
import './Filters.scss';
import RarityChartFiltersPopup from '../../popups/RarityChartFiltersPopup';

const Filters = (props) => {
  const {
    floorPrice,
    searchText,
    setSearchText,
    setSortField,
    setSortDir,
    sortDir,
    setApiPage,
    resetPagination,
    categories,
    setCategories,
    categoriesIndexes,
    setCategoriesIndexes,
    resultsCount,
    handleCategoryFilterChange,
    setFilter,
  } = props;
  const [selectedFiltersLength, setSelectedFiltersLength] = useState(0);

  return (
    <div className="rarity--charts--search--and--filters--container">
      {/* <div className="floor--price--block">
        <p className="floor--price--paragraph">
          <span>Floor Price: </span>
          <div>
            <img src={priceIcon} alt="Price" />
            {`${floorPrice.price}`}
          </div>
        </p>
      </div> */}
      <div className="rarity--charts--search--and--filters--row">
        <div className="rarity--charts--search--and--floor--price">
          <SearchField
            placeholder="Search items"
            searchText={searchText}
            setSearchText={setSearchText}
            setApiPage={setApiPage}
            resetPagination={resetPagination}
          />
          <div className="tablet--filters">
            <Popup
              trigger={
                <button type="button" className="light-border-button">
                  <img src={filterIcon} alt="Filter" /> Filters
                  {/* {selectedFiltersLength !== 0 && (
                    <div className="count">{selectedFiltersLength}</div>
                  )} */}
                </button>
              }
            >
              {(close) => (
                <RarityChartFiltersPopup
                  close={close}
                  categories={categories}
                  setCategories={setCategories}
                  categoriesIndexes={categoriesIndexes}
                  setCategoriesIndexes={setCategoriesIndexes}
                  selectedFiltersLength={selectedFiltersLength}
                  setSelectedFiltersLength={setSelectedFiltersLength}
                  resultsCount={resultsCount}
                  handleCategoryFilterChange={handleCategoryFilterChange}
                  setFilter={setFilter}
                />
              )}
            </Popup>
          </div>
          <div className="mobile--filters">
            <Popup
              trigger={
                <button type="button" className="light-button">
                  <img src={filterIcon} alt="Filter" />
                </button>
              }
            >
              {(close) => (
                <RarityChartFiltersPopup
                  close={close}
                  categories={categories}
                  setCategories={setCategories}
                  categoriesIndexes={categoriesIndexes}
                  setCategoriesIndexes={setCategoriesIndexes}
                  selectedFiltersLength={selectedFiltersLength}
                  setSelectedFiltersLength={setSelectedFiltersLength}
                  resultsCount={resultsCount}
                  handleCategoryFilterChange={handleCategoryFilterChange}
                  setFilter={setFilter}
                />
              )}
            </Popup>
            {selectedFiltersLength !== 0 && <div className="count">{selectedFiltersLength}</div>}
          </div>
        </div>
        <SortBySelect
          id="sort--select"
          defaultValue="Rarity Score"
          sortData={['Rarity Score', 'Rank', 'Polymorph Id']}
          setSortField={setSortField}
          setApiPage={setApiPage}
          resetPagination={resetPagination}
        />
        <SortByOrder
          setSortDir={setSortDir}
          sortDir={sortDir}
          setApiPage={setApiPage}
          resetPagination={resetPagination}
        />
      </div>
    </div>
  );
};

Filters.propTypes = {
  floorPrice: PropTypes.shape({ price: PropTypes.number, priceType: PropTypes.string }),
  searchText: PropTypes.string,
  setSearchText: PropTypes.func.isRequired,
  setSortField: PropTypes.func.isRequired,
  setSortDir: PropTypes.func.isRequired,
  sortDir: PropTypes.string.isRequired,
  setApiPage: PropTypes.func.isRequired,
  resetPagination: PropTypes.func.isRequired,
  categories: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCategories: PropTypes.func.isRequired,
  categoriesIndexes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCategoriesIndexes: PropTypes.func.isRequired,
  resultsCount: PropTypes.number.isRequired,
  handleCategoryFilterChange: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  floorPrice: { price: 0.8, priceIcon },
  searchText: '',
};

export default Filters;
