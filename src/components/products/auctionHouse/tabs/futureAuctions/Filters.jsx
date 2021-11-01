import React from 'react';
import SearchField from '../../../../input/SearchField';
import SortBySelect from '../../../../input/SortBySelect';

const FutureAuctionsFilters = () => {
  const options = [
    'Sort by',
    'Recently added',
    'Winners: Low to High',
    'Winners: High to Low',
    'NFTs per winner: High to Low',
    'NFTs per winner: Low to High',
    'Starts soon',
  ];

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
        <SortBySelect defaultValue="Sort by" sortData={options} hideFirstOption />
      </div>
    </div>
  );
};

export default FutureAuctionsFilters;
