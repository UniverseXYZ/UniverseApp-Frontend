import React from 'react';
import PropTypes from 'prop-types';
import SearchField from '../../input/SearchField';
import SortBySelect from '../../input/SortBySelect';
import SortByOrder from '../../input/SortByOrder';
import priceIcon from '../../../assets/images/eth-icon-new.svg';
import filterIcon from '../../../assets/images/filters-icon-black.svg';
import './Filters.scss';
import Button from '../../button/Button';

const Filters = (props) => {
  const { floorPrice, data, getData, getDesc, desc } = props;

  return (
    <div className="rarity--charts--search--and--filters--container">
      <div className="floor--price--block">
        <p className="floor--price--paragraph">
          <span>Floor Price: </span>
          <div>
            <img src={priceIcon} alt="Price" />
            {`${floorPrice.price}`}
          </div>
        </p>
      </div>
      <div className="rarity--charts--search--and--filters--row">
        <div className="rarity--charts--search--and--floor--price">
          <SearchField
            data={data}
            placeholder="Search items"
            dropdown={false}
            CardElement={<></>}
            enterKeyEvent={false}
            getData={(find) => getData(find)}
          />
          <div className="tablet--filters">
            <Button className="light-border-button">
              <img src={filterIcon} alt="Filter" /> Filters
            </Button>
            <div className="count">2</div>
          </div>
          <div className="mobile--filters">
            <Button className="light-button">
              <img src={filterIcon} alt="Filter" />
            </Button>
            <div className="count">2</div>
          </div>
        </div>
        {/* <div className="sort--by--label--and--select--block"> */}
        {/* <label htmlFor="sort--select">Sort By:</label> */}
        <SortBySelect
          id="sort--select"
          data={data}
          defaultValue="Sort by"
          sortData={['Sort by', 'Rarity Score', 'Rank', 'Polymorph Id']}
          getData={(find) => getData(find)}
          getDesc={(value) => getDesc(value)}
          desc={desc}
          hideFirstOption
        />
        <SortByOrder
          data={data}
          getData={(find) => getData(find)}
          getDesc={(value) => getDesc(value)}
        />
        {/* </div> */}
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
  floorPrice: { price: 0.8, priceIcon },
  data: [],
  getData: () => {},
  getDesc: () => {},
  desc: false,
};

export default Filters;
