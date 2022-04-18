import React, { useEffect, useState } from 'react';
import RarityFilters from '../../components/rarityCharts/filters/RarityFilters';
import Welcome from '../../components/rarityCharts/welcome/Welcome';
// import './RarityCharts.scss';
import { useSearchPolymorphs } from '../../utils/hooks/useRarityDebouncer';
import { categoriesArray } from './categories';
import RarityList from '../../components/rarityCharts/list/RarityList';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';

const RarityCharts = () => {
  const { setMyUniverseNFTsActiverPage } = useMyNftsContext();
  const { setDarkMode } = useThemeContext();
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
    <div className="rarity--charts--page">
      <Welcome />
      <div className="rarity--charts--page--container">
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
    </div>
  );
};

export default RarityCharts;
