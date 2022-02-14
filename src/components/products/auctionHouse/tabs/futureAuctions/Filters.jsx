import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import SortBySelect from '../../../../input/SortBySelect';
import searchIcon from '../../../../../assets/images/search-gray.svg';

const FutureAuctionsFilters = ({ sort, setSort, searchValue, setSearchValue }) => {
  const options = ['Starts soon', 'Recently added'];

  return (
    <div className="future__auctions__filters">
      <div className="future__auctions__filters__fields">
        <div className="search">
          <div className="search--field--component ">
            <img className="search" src={searchIcon} alt="Search" />
            <DebounceInput
              debounceTimeout={1000}
              className="inp"
              placeholder="Search by name or artist"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <SortBySelect sortData={options} sort={sort} setSort={setSort} />
      </div>
    </div>
  );
};

FutureAuctionsFilters.propTypes = {
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};

export default FutureAuctionsFilters;
