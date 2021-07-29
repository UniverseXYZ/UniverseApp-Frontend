import React from 'react';
import PropTypes from 'prop-types';
import SearchField from '../../input/SearchField';
import SortBySelect from '../../input/SortBySelect';
import './Filters.scss';

const Filters = (props) => {
  const { floorPrice, data, getData } = props;
  return (
    <div className="rarity--charts--search--and--filters--row">
      <SearchField
        data={data}
        placeholder="Search"
        dropdown={false}
        CardElement={<></>}
        enterKeyEvent={false}
        getData={(find) => getData(find)}
      />
      <div className="floor--price--block">
        <p className="floor--price--paragraph">
          <span>Floor Price: </span>
          {`${floorPrice.price} ${floorPrice.priceType}`}
        </p>
      </div>
      <div className="sort--by--label--and--select--block">
        <label htmlFor="sort--select">Sort By:</label>
        <SortBySelect id="sort--select" defaultValue="Rarity" />
      </div>
    </div>
  );
};

Filters.propTypes = {
  floorPrice: PropTypes.shape({ price: PropTypes.number, priceType: PropTypes.string }),
  data: PropTypes.arrayOf(PropTypes.shape({})),
  getData: PropTypes.func,
};

Filters.defaultProps = {
  floorPrice: { price: 0.9, priceType: 'eth' },
  data: [],
  getData: () => {},
};

export default Filters;
