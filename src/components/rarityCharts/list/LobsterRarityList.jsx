/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RarityLobsterList.scss';
import uuid from 'react-uuid';
import ItemsPerPageDropdown from '../../pagination/ItemsPerPageDropdown';
import '../../../containers/rarityCharts/RarityCharsLoader.scss';
import '../../../containers/rarityCharts/RarityCharts.scss';
import LobsterRarityChartsLoader from '../../../containers/rarityCharts/LobsterRarityChartsLoader';
import RarityPagination from './RarityPagination';
import LobsterCard from './LobsterCard';

const LobsterRarityList = ({
  data,
  perPage,
  offset,
  isLastPage,
  setPerPage,
  setOffset,
  setApiPage,
  setIsLastPage,
  categories,
  setCategories,
  categoriesIndexes,
  setCategoriesIndexes,
  setFilter,
  filter,
  loading,
  results,
  apiPage,
  handleCategoryFilterChange,
}) => {
  const sliceData = data.slice(offset, offset + perPage) || [];
  const emptySlots = perPage - sliceData.length || 4;
  const [showClearALL, setShowClearALL] = useState(false);

  return (
    <>
      <div className="lobster-rarity--charts--list">
        <div className="list--with--selected--filters">
          {loading && !isLastPage ? (
            <div className="grid">
              <LobsterRarityChartsLoader number={12} />
            </div>
          ) : results.length ? (
            <div className="grid">
              {sliceData.map((item, i) => (
                <LobsterCard key={uuid()} item={item} index={offset + i + 1} />
              ))}
              {isLastPage ? <LobsterRarityChartsLoader number={emptySlots} /> : <></>}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {data.length >= perPage ? (
        <div className="pagination__container">
          <RarityPagination
            data={data}
            perPage={perPage}
            setOffset={setOffset}
            setApiPage={setApiPage}
            apiPage={apiPage}
            setIsLastPage={setIsLastPage}
          />
          <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
        </div>
      ) : null}

      <div className="rarity--charts--empty">
        {!loading && !isLastPage && !results.length ? <p>No Lobster could be found :’(</p> : <></>}
      </div>
    </>
  );
};

LobsterRarityList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  apiPage: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  setOffset: PropTypes.func.isRequired,
  setApiPage: PropTypes.func.isRequired,
  setIsLastPage: PropTypes.func.isRequired,
  setPerPage: PropTypes.func.isRequired,
  categories: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCategories: PropTypes.func.isRequired,
  categoriesIndexes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCategoriesIndexes: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.oneOfType([PropTypes.array]).isRequired,
  results: PropTypes.oneOfType([PropTypes.array]).isRequired,
  loading: PropTypes.bool.isRequired,
  handleCategoryFilterChange: PropTypes.func.isRequired,
};

export default LobsterRarityList;
