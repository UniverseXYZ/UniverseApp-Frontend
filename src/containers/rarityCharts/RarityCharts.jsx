import React, { useEffect, useContext, useState, useMemo, useRef } from 'react';
import ItemsPerPageDropdown from '../../components/pagination/ItemsPerPageDropdown';
import Pagination from '../../components/pagination/Pagionation';
import Filters from '../../components/rarityCharts/filters/Filters';
import List from '../../components/rarityCharts/list/List';
import Welcome from '../../components/rarityCharts/welcome/Welcome';
import AppContext from '../../ContextAPI';
import { PolymorphRarityCharts } from '../../utils/fixtures/RarityChartsDummyData';
import './RarityCharts.scss';
import { useSearchPolymorphs } from '../../utils/hooks/useRarityDebouncer';
import RarityChartsLoader from './RarityChartsLoader';

const RarityCharts = () => {
  const { setDarkMode } = useContext(AppContext);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  const {
    inputText,
    setInputText,
    page,
    setPage,
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
          setApiPage={setPage}
        />
        {search.loading && !isLastPage ? (
          <RarityChartsLoader number={12} />
        ) : results.length ? (
          <>
            <List data={results} isLastPage={isLastPage} perPage={perPage} offset={offset} />
            <div className="pagination__container">
              <Pagination
                setApiPage={setPage}
                apiPage={page}
                data={results}
                perPage={perPage}
                setOffset={setOffset}
                setIsLastPage={setIsLastPage}
              />
              <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
            </div>
          </>
        ) : (
          <div>No results</div>
        )}
      </div>
    </div>
  );
};

export default RarityCharts;
