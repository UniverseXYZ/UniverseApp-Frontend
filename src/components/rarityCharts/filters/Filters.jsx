import React from 'react';
import PropTypes from 'prop-types';
import SearchField from '../../input/SearchField';
import SortBySelect from '../../input/SortBySelect';
import SortByOrder from '../../input/SortByOrder';
import './Filters.scss';

const Filters = (props) => {
  const { floorPrice, data, searchText, setSearchText, setSortField, getDesc, desc, getData } =
    props;
  return (
    <div className="rarity--charts--search--and--filters--row">
      <SearchField
        placeholder="Search"
        dropdown={false}
        enterKeyEvent={false}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="floor--price--block">
        <p className="floor--price--paragraph">
          <span>Floor Price: </span>
          {`${floorPrice.price} ${floorPrice.priceType}`}
        </p>
      </div>
      <div className="sort--by--label--and--select--block">
        <label htmlFor="sort--select">Sort By:</label>
        <SortBySelect
          setSortField={setSortField}
          id="sort--select"
          data={data}
          defaultValue="Rarity Scope"
          sortData={['Rarity Score', 'Rank', 'Polymorph Id']}
          getData={(find) => getData(find)}
          getDesc={(value) => getDesc(value)}
          desc={desc}
        />
        <SortByOrder
          data={data}
          getData={(find) => getData(find)}
          getDesc={(value) => getDesc(value)}
        />
      </div>
    </div>
  );
};

Filters.propTypes = {
  floorPrice: PropTypes.shape({ price: PropTypes.number, priceType: PropTypes.string }),
  data: PropTypes.arrayOf(PropTypes.shape({})),
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  setSortField: PropTypes.func.isRequired,
  getData: PropTypes.func,
  getDesc: PropTypes.func,
  desc: PropTypes.bool,
};

Filters.defaultProps = {
  floorPrice: { price: 0.9, priceType: 'eth' },
  data: [],
  searchText: '',
  setSearchText: () => {},
  getData: () => {},
  getDesc: () => {},
  desc: false,
};

export default Filters;
