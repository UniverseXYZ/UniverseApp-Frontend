import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import SearchField from '../../input/SearchField';
import SortBySelect from '../../input/SortBySelect';
import SortByOrder from '../../input/SortByOrder';
import priceIcon from '../../../assets/images/eth-icon-new.svg';
import filterIcon from '../../../assets/images/filters-icon-black.svg';
import './Filters.scss';
import Button from '../../button/Button';
import RarityChartFiltersPopup from '../../popups/RarityChartFiltersPopup';

const Filters = (props) => {
  const {
    floorPrice,
    data,
    getData,
    getDesc,
    desc,
    categories,
    setCategories,
    categoriesIndexes,
    setCategoriesIndexes,
  } = props;

  const [selectedFiltersLength, setSelectedFiltersLength] = useState(0);

  return (
    <div className="rarity--charts--search--and--filters--container">
      {/* <div className="floor--price--block">
        <p className="floor--price--paragraph">
          <span>Floor Price: </span>
          <div>
            <img src={priceIcon} alt="Price" />
            {`${floorPrice.price}`}
          </div>
        </p>
      </div> */}
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
          <div className="mobile--filters">
            <Popup
              trigger={
                <button type="button" className="light-button">
                  <img src={filterIcon} alt="Filter" />
                </button>
              }
            >
              {(close) => (
                <RarityChartFiltersPopup
                  close={close}
                  categories={categories}
                  setCategories={setCategories}
                  categoriesIndexes={categoriesIndexes}
                  setCategoriesIndexes={setCategoriesIndexes}
                  selectedFiltersLength={selectedFiltersLength}
                  setSelectedFiltersLength={setSelectedFiltersLength}
                />
              )}
            </Popup>
            {selectedFiltersLength !== 0 && <div className="count">{selectedFiltersLength}</div>}
          </div>
        </div>
        {/* <div className="sort--by--label--and--select--block"> */}
        {/* <label htmlFor="sort--select">Sort By:</label> */}
        <SortByOrder
          data={data}
          getData={(find) => getData(find)}
          getDesc={(value) => getDesc(value)}
        />
        <SortBySelect
          id="sort--select"
          data={data}
          defaultValue="Sort by"
          sortData={['Sort by', 'Rank', 'Polymorph Id']}
          getData={(find) => getData(find)}
          getDesc={(value) => getDesc(value)}
          desc={desc}
          hideFirstOption
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
  categories: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCategories: PropTypes.func.isRequired,
  categoriesIndexes: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCategoriesIndexes: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  floorPrice: { price: 0.8, priceIcon },
  data: [],
  getData: () => {},
  getDesc: () => {},
  desc: false,
};

export default Filters;
