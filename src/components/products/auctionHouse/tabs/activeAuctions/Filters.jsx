import React from 'react';
import PropTypes from 'prop-types';
import SearchField from '../../../../input/SearchField';
import SortBySelect from '../../../../input/SortBySelect.jsx';

const ActiveAuctionsFilters = ({ sort, setSort }) => {
  const options = ['Ending soon', 'Recently added', 'Highest winning bid', 'Lowest winning bid'];

  return (
    <div className="active__auctions__filters">
      <div className="active__auctions__filters__fields">
        <div className="search">
          <SearchField
            data={[]}
            placeholder="Search by name or artist"
            dropdown={false}
            CardElement={<></>}
            enterKeyEvent={false}
          />
        </div>
        <SortBySelect sortData={options} sort={sort} setSort={setSort} />
      </div>
    </div>
  );
};

ActiveAuctionsFilters.propTypes = {
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
};

export default ActiveAuctionsFilters;
