import React from 'react';
import SearchField from '../../../../input/SearchField';
import SortBySelect from '../../../../input/SortBySelect.jsx';

const ActiveAuctionsFilters = () => {
  const options = [
    'Sort by',
    'Recently added',
    'Highest winning bid',
    'Lowest winning bid',
    'Winners: Low to High',
    'Winners: High to Low',
    'NFTs per winner: High to Low',
    'NFTs per winner: Low to High',
    'Ending soon',
  ];

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
        <SortBySelect defaultValue="Sort by" sortData={options} hideFirstOption />
      </div>
    </div>
  );
};

export default ActiveAuctionsFilters;
