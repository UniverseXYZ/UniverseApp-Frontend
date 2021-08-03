import React from 'react';
import PropTypes from 'prop-types';
import SearchField from '../../input/SearchField';
import SortBySelect from '../../input/SortBySelect';
import SortByOrder from '../../input/SortByOrder';
import './Filters.scss';

const Filters = (props) => {
  const { floorPrice, searchText, setSearchText, setSortField, setSortDir, sortDir, setApiPage } =
    props;
  return (
    <div className="rarity--charts--search--and--filters--row">
      <div className="rarity--charts--search--and--floor--price">
        <SearchField
          placeholder="Search"
          dropdown={false}
          enterKeyEvent={false}
          searchText={searchText}
          setSearchText={setSearchText}
          setApiPage={setApiPage}
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
          defaultValue="Rarity Score"
          sortData={['Rarity Score', 'Rank', 'Polymorph Id']}
          setSortField={setSortField}
          setApiPage={setApiPage}
        />
        <SortByOrder setSortDir={setSortDir} sortDir={sortDir} setApiPage={setApiPage} />
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
  sortDir: PropTypes.bool.isRequired,
  setApiPage: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  floorPrice: { price: 0.9, priceType: 'eth' },
  searchText: '',
};

export default Filters;
