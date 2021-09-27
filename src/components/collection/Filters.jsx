import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../assets/images/search.svg';
import SortBySelect from '../input/SortBySelect';

const Filters = ({ search, setSearch, filteredNFTs }) => {
  const [desc, setDesc] = useState(false);
  const [nftData, setNftData] = useState([...filteredNFTs]);

  return (
    <div className="collection__filters">
      <div className="collection__filters__head">
        <h1 className="title">Items</h1>
      </div>
      <div className="collection__filters__fields">
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img src={searchIcon} alt="Search" />
          <div className="focus--field--box--shadow" />
        </div>
        <SortBySelect
          id="sort--select"
          data={filteredNFTs}
          defaultValue="Sort by"
          sortData={['Sort by', 'Recently created', 'Recently sold', 'Most viewed', 'Oldest']}
          getData={(find) => setNftData(find)}
          getDesc={(value) => setDesc(value)}
          desc={desc}
          hideFirstOption
        />
      </div>
    </div>
  );
};

Filters.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  filteredNFTs: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default Filters;
