import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import SortBySelect from '../../../../input/SortBySelect.jsx';
import searchIcon from '../../../../../assets/images/search-gray.svg';

const ActiveAuctionsFilters = ({ sort, setSort, searchValue, setSearchValue }) => {
  const options = ['Ending soon', 'Recently added', 'Highest winning bid', 'Lowest winning bid'];

  return (
    <div className="active__auctions__filters">
      <div className="active__auctions__filters__fields">
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

ActiveAuctionsFilters.propTypes = {
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};

export default ActiveAuctionsFilters;
