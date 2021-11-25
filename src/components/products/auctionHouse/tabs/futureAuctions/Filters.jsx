import React from 'react';
import PropTypes from 'prop-types';
import SearchField from '../../../../input/SearchField';
import SortBySelect from '../../../../input/SortBySelect';

const FutureAuctionsFilters = ({ sort, setSort }) => {
  const options = ['Starts soon', 'Recently added'];

  return (
    <div className="future__auctions__filters">
      <div className="future__auctions__filters__fields">
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

FutureAuctionsFilters.propTypes = {
  setSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
};

export default FutureAuctionsFilters;
