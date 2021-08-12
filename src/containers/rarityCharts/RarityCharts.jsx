import React, { useEffect, useContext, useState } from 'react';
import Filters from '../../components/rarityCharts/filters/Filters';
import List from '../../components/rarityCharts/list/List';
import Welcome from '../../components/rarityCharts/welcome/Welcome';
import AppContext from '../../ContextAPI';
import './RarityCharts.scss';
import { useSearchPolymorphs } from '../../utils/hooks/useRarityDebouncer';
import RarityChartsLoader from './RarityChartsLoader';

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
