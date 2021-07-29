import React from 'react';
import PropTypes from 'prop-types';
import SearchField from '../../input/SearchField';
import SortBySelect from '../../input/SortBySelect';
import './Filters.scss';

const Filters = (props) => {
  const { floorPrice } = props;
  return (
    <div className="rarity--charts--search--and--filters--row">
      <SearchField data={[]} placeholder="Search" dropdown={false} CardElement={<></>} />
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
};

Filters.defaultProps = {
  floorPrice: { price: 0.9, priceType: 'eth' },
};

export default Filters;
