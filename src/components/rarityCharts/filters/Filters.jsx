import React from 'react';
import PropTypes from 'prop-types';
import SearchField from '../../input/SearchField';
import SortBySelect from '../../input/SortBySelect';
import './Filters.scss';

const Filters = (props) => {
  const { floorPrice, data, searchText, setSearchText, setSortField } = props;
  return (
    <div className="rarity--charts--search--and--filters--row">
      <SearchField
        data={data}
        placeholder="Search"
        dropdown={false}
        CardElement={<></>}
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
          defaultValue="Rarity Score"
          sortData={['Rarity Score', 'Rank', 'Polymorph ID']}
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
};

Filters.defaultProps = {
  floorPrice: { price: 0.9, priceType: 'eth' },
  data: [],
  searchText: '',
  setSearchText: () => {},
};

export default Filters;
