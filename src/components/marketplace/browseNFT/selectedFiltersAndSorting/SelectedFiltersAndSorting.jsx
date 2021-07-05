import React from 'react';
import PropTypes from 'prop-types';
import SelectedFilters from './SelectedFilters';
import SortingDropdowns from './SortingDropdowns';

const SelectedFiltersAndSorting = ({
  saleTypeButtons,
  setSaleTypeButtons,
  selectedPrice,
  setSelectedPrice,
}) => (
  <div className="selected--filters--and--sorting">
    <SelectedFilters
      saleTypeButtons={saleTypeButtons}
      setSaleTypeButtons={setSaleTypeButtons}
      selectedPrice={selectedPrice}
      setSelectedPrice={setSelectedPrice}
    />
    <SortingDropdowns />
  </div>
);

SelectedFiltersAndSorting.propTypes = {
  saleTypeButtons: PropTypes.oneOfType([PropTypes.array]),
  setSaleTypeButtons: PropTypes.func,
  selectedPrice: PropTypes.oneOfType([PropTypes.any]),
  setSelectedPrice: PropTypes.func,
};

SelectedFiltersAndSorting.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
  selectedPrice: null,
  setSelectedPrice: () => {},
};

export default SelectedFiltersAndSorting;
