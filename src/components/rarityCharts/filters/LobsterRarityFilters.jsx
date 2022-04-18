import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RaritySortBySelect from '../../input/RaritySortBySelect';
import RaritySortByOrder from '../../input/RaritySortByOrder';
import priceIcon from '../../../assets/images/eth-icon-new.svg';
// import './LobsterRarityFilters.scss';
import RaritySearchField from '../../input/RaritySearchField';

const LobsterRarityFilters = (props) => {
  const {
    floorPrice,
    searchText,
    setSearchText,
    setSortField,
    setSortDir,
    sortDir,
    resetPagination,
    CollectionFilter,
  } = props;

  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <div className="lobsters-rarity--charts--search--and--filters--container">
      {!isMobile ? (
        <div className="rarity--charts--search--and--filters--row">
          <CollectionFilter />
          <div className="rarity--charts--search--and--floor--price">
            <RaritySearchField
              placeholder="Search items"
              searchText={searchText}
              setSearchText={setSearchText}
              resetPagination={resetPagination}
            />
          </div>
          <RaritySortByOrder
            setSortDir={setSortDir}
            sortDir={sortDir}
            resetPagination={resetPagination}
          />
          <RaritySortBySelect
            id="sort--select"
            defaultValue="Rarity Score"
            sortData={['Rarity Score', 'Rank', 'Polymorph Id']}
            setSortField={setSortField}
            resetPagination={resetPagination}
          />
        </div>
      ) : (
        <div className="rarity--charts--mobile">
          <CollectionFilter />
          <RaritySortBySelect
            id="sort--select"
            defaultValue="Rarity Score"
            sortData={['Rarity Score', 'Rank', 'Polymorph Id']}
            setSortField={setSortField}
            resetPagination={resetPagination}
          />
          <div className="rarity--charts--search--and--floor--price">
            <RaritySearchField
              placeholder="Search items"
              searchText={searchText}
              setSearchText={setSearchText}
              resetPagination={resetPagination}
            />
            <RaritySortByOrder
              setSortDir={setSortDir}
              sortDir={sortDir}
              resetPagination={resetPagination}
            />
          </div>
        </div>
      )}
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
  resetPagination: PropTypes.func.isRequired,
  CollectionFilter: PropTypes.elementType,
};

LobsterRarityFilters.defaultProps = {
  floorPrice: { price: 0.8, priceIcon },
  searchText: '',
  CollectionFilter: () => <></>,
};

export default LobsterRarityFilters;
