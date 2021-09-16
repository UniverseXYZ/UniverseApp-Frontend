import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import RaritySortBySelect from '../../input/RaritySortBySelect';
import RaritySortByOrder from '../../input/RaritySortByOrder';
import priceIcon from '../../../assets/images/eth-icon-new.svg';
import filterIcon from '../../../assets/images/filters-icon-black.svg';
import './RarityFilters.scss';
import RarityChartFiltersPopup from '../../popups/RarityChartFiltersPopup';
import RaritySearchField from '../../input/RaritySearchField';

const LobsterRarityFilters = (props) => {
  const {
    floorPrice,
    searchText,
    setSearchText,
    setSortField,
    setSortDir,
    sortDir,
    setApiPage,
    resetPagination,
    CollectionFilter,
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
          <CollectionFilter />
          <RaritySearchField
            placeholder="Search items"
            searchText={searchText}
            setSearchText={setSearchText}
            setApiPage={setApiPage}
            resetPagination={resetPagination}
          />
        </div>
        <RaritySortByOrder
          setSortDir={setSortDir}
          sortDir={sortDir}
          setApiPage={setApiPage}
          resetPagination={resetPagination}
        />
        <RaritySortBySelect
          id="sort--select"
          defaultValue="Rarity Score"
          sortData={['Rarity Score', 'Rank', 'Polymorph Id']}
          setSortField={setSortField}
          setApiPage={setApiPage}
          resetPagination={resetPagination}
        />
      </div>
    </div>
  );
};

LobsterRarityFilters.propTypes = {
  floorPrice: PropTypes.shape({ price: PropTypes.number, priceType: PropTypes.string }),
  searchText: PropTypes.string,
  setSearchText: PropTypes.func.isRequired,
  setSortField: PropTypes.func.isRequired,
  setSortDir: PropTypes.func.isRequired,
  sortDir: PropTypes.string.isRequired,
  setApiPage: PropTypes.func.isRequired,
  resetPagination: PropTypes.func.isRequired,
  CollectionFilter: PropTypes.elementType,
};

LobsterRarityFilters.defaultProps = {
  floorPrice: { price: 0.8, priceIcon },
  searchText: '',
  CollectionFilter: () => <></>,
};

export default LobsterRarityFilters;
