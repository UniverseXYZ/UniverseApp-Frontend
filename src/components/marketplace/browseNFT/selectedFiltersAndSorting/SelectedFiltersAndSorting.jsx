import React from 'react';
import PropTypes from 'prop-types';
import SelectedFilters from './SelectedFilters';
import SortingDropdowns from './SortingDropdowns';

const SelectedFiltersAndSorting = ({
  saleTypeButtons,
  setSaleTypeButtons,
  selectedPrice,
  setSelectedPrice,
  selectedColl,
  setSelectedColl,
  selectedCreators,
  setSelectedCreators,
}) => (
  <div className="selected--filters--and--sorting">
    <SelectedFilters
      saleTypeButtons={saleTypeButtons}
      setSaleTypeButtons={setSaleTypeButtons}
      selectedPrice={selectedPrice}
      setSelectedPrice={setSelectedPrice}
      selectedColl={selectedColl}
      setSelectedColl={setSelectedColl}
      selectedCreators={selectedCreators}
      setSelectedCreators={setSelectedCreators}
    />
    <SortingDropdowns />
  </div>
);

SelectedFiltersAndSorting.propTypes = {
  saleTypeButtons: PropTypes.oneOfType([PropTypes.array]),
  setSaleTypeButtons: PropTypes.func,
  selectedPrice: PropTypes.oneOfType([PropTypes.any]),
  setSelectedPrice: PropTypes.func,
  selectedColl: PropTypes.oneOfType([PropTypes.array]),
  setSelectedColl: PropTypes.func,
  selectedCreators: PropTypes.oneOfType([PropTypes.array]),
  setSelectedCreators: PropTypes.func,
};

SelectedFiltersAndSorting.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
  selectedPrice: null,
  setSelectedPrice: () => {},
  selectedColl: [],
  setSelectedColl: () => {},
  selectedCreators: [],
  setSelectedCreators: () => {},
};

export default SelectedFiltersAndSorting;
