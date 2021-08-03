import React from 'react';
import PropTypes from 'prop-types';
import SearchField from '../../input/SearchField';
import SortBySelect from '../../input/SortBySelect';
import SortByOrder from '../../input/SortByOrder';
import './Filters.scss';

const Filters = (props) => {
  const { floorPrice, data, getData, getDesc, desc } = props;

  return (
    <div className="rarity--charts--search--and--filters--row">
      <div className="rarity--charts--search--and--floor--price">
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
      </div>
      <div className="sort--by--label--and--select--block">
        <label htmlFor="sort--select">Sort By:</label>
        <SortBySelect
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
  getData: PropTypes.func,
  getDesc: PropTypes.func,
  desc: PropTypes.bool,
};

Filters.defaultProps = {
  floorPrice: { price: 0.9, priceType: 'eth' },
  data: [],
  getData: () => {},
  getDesc: () => {},
  desc: false,
};

export default Filters;
