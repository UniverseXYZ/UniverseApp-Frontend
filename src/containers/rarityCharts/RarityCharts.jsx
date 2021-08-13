import React, { useEffect, useContext, useState } from 'react';
import uuid from 'react-uuid';
import Filters from '../../components/rarityCharts/filters/Filters';
import List from '../../components/rarityCharts/list/List';
import Welcome from '../../components/rarityCharts/welcome/Welcome';
import AppContext from '../../ContextAPI';
import './RarityCharts.scss';
import { useSearchPolymorphs } from '../../utils/hooks/useRarityDebouncer';
import RarityChartsLoader from './RarityChartsLoader';
import { categoriesArray } from './categories';

const RarityCharts = () => {
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

  return (
    <div className="rarity--charts--page">
      <Welcome />
      <div className="rarity--charts--page--container">
        <Filters
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
        />
        {search.loading && !isLastPage ? (
          <RarityChartsLoader number={9} />
        ) : results.length ? (
          <>
            <List
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
            />
          </>
        ) : (
          <div className="rarity--charts--empty">
            <p>No Polymorph could be found :’(</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RarityCharts;
