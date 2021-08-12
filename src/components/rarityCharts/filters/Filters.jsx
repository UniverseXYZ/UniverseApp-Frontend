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
  const {
    floorPrice,
    searchText,
    setSearchText,
    setSortField,
    setSortDir,
    sortDir,
    setApiPage,
    resetPagination,
  } = props;
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
            placeholder="Search items"
            searchText={searchText}
            setSearchText={setSearchText}
            setApiPage={setApiPage}
            resetPagination={resetPagination}
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
          defaultValue="Rarity Score"
          sortData={['Rarity Score', 'Rank', 'Polymorph Id']}
          setSortField={setSortField}
          setApiPage={setApiPage}
          resetPagination={resetPagination}
        />
        <SortByOrder
          setSortDir={setSortDir}
          sortDir={sortDir}
          setApiPage={setApiPage}
          resetPagination={resetPagination}
        />
        {/* </div> */}
      </div>
    </div>
  );
};

Filters.propTypes = {
  floorPrice: PropTypes.shape({ price: PropTypes.number, priceType: PropTypes.string }),
  searchText: PropTypes.string,
  setSearchText: PropTypes.func.isRequired,
  setSortField: PropTypes.func.isRequired,
  setSortDir: PropTypes.func.isRequired,
  sortDir: PropTypes.string.isRequired,
  setApiPage: PropTypes.func.isRequired,
  resetPagination: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  floorPrice: { price: 0.8, priceIcon },
  searchText: '',
};

export default Filters;
