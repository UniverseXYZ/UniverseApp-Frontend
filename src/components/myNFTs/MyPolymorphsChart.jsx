import './UniverseNFTs.scss';
import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import '../pagination/Pagination.scss';

import RarityFilters from '../rarityCharts/filters/RarityFilters';
import AppContext from '../../ContextAPI';
import '../../containers/rarityCharts/PolymorphRarityCharts.scss';
import { useSearchPolymorphs } from '../../utils/hooks/useMyNftsRarityDebouncer';
import { categoriesArray } from '../../containers/rarityCharts/categories';
import RarityList from '../rarityCharts/list/RarityList';
import CollectionDropdown from './CollectionDropdown';

const MyPolymorphsChart = ({ isDropdownOpened, setIsDropdownOpened }) => {
  const { setDarkMode, setMyUniverseNFTsActiverPage } = useContext(AppContext);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(9);
  const {
    inputText,
    setInputText,
    apiPage,
    setApiPage,
    sortField,
    setSortField,
    sortDir,
    setSortDir,
    filter,
    setFilter,
    search,
    results,
    isLastPage,
    setIsLastPage,
  } = useSearchPolymorphs();
  const [categories, setCategories] = useState(categoriesArray);
  const [categoriesIndexes, setCategoriesIndexes] = useState([]);

  useEffect(() => {
    setDarkMode(true);
  }, []);

  const resetPagination = () => {
    setMyUniverseNFTsActiverPage(0);
    setOffset(0);
  };

  const handleCategoryFilterChange = (idx, traitIdx) => {
    const newCategories = [...categories];
    const attribute = newCategories[idx];
    const trait = attribute.traits[traitIdx];
    trait.checked = !trait.checked;
    setCategories(newCategories);
    let newFilter = [];
    if (trait.checked) {
      newFilter = [...filter, [attribute.value, trait.name]];
    } else if (attribute.value === 'righthand' || attribute.value === 'lefthand') {
      newFilter = filter.filter((f) => !(f[0] === attribute.value && f[1] === trait.name));
    } else {
      newFilter = filter.filter((f) => f[1] !== trait.name);
    }
    setFilter(newFilter);
  };

  return (
    <div className="polymorph-rarity--charts--page--container">
      <RarityFilters
        setSortField={setSortField}
        searchText={inputText}
        setSearchText={setInputText}
        setSortDir={setSortDir}
        sortDir={sortDir}
        setApiPage={setApiPage}
        resetPagination={resetPagination}
        categories={categories}
        setCategories={setCategories}
        categoriesIndexes={categoriesIndexes}
        setCategoriesIndexes={setCategoriesIndexes}
        resultsCount={results.length}
        handleCategoryFilterChange={handleCategoryFilterChange}
        setFilter={setFilter}
        filter={filter}
        CollectionFilter={() => (
          <CollectionDropdown
            isDropdownOpened={isDropdownOpened}
            setIsDropdownOpened={setIsDropdownOpened}
          />
        )}
      />
      <RarityList
        data={results}
        isLastPage={isLastPage}
        perPage={perPage}
        offset={offset}
        setOffset={setOffset}
        setPerPage={setPerPage}
        setApiPage={setApiPage}
        setIsLastPage={setIsLastPage}
        categories={categories}
        setCategories={setCategories}
        categoriesIndexes={categoriesIndexes}
        setCategoriesIndexes={setCategoriesIndexes}
        setFilter={setFilter}
        filter={filter}
        loading={search.loading}
        results={results}
        apiPage={apiPage}
        handleCategoryFilterChange={handleCategoryFilterChange}
      />
    </div>
  );
};
MyPolymorphsChart.propTypes = {
  isDropdownOpened: PropTypes.bool.isRequired,
  setIsDropdownOpened: PropTypes.func.isRequired,
};
export default MyPolymorphsChart;
