import React from 'react';
import PropTypes from 'prop-types';
import SelectedFilters from './SelectedFilters';
import SortingDropdowns from './SortingDropdowns';

const SelectedFiltersAndSorting = ({ saleTypeButtons, setSaleTypeButtons }) => (
  <div className="selected--filters--and--sorting">
    <SelectedFilters saleTypeButtons={saleTypeButtons} setSaleTypeButtons={setSaleTypeButtons} />
    <SortingDropdowns />
  </div>
);

SelectedFiltersAndSorting.propTypes = {
  saleTypeButtons: PropTypes.oneOfType([PropTypes.array]),
  setSaleTypeButtons: PropTypes.func,
};

SelectedFiltersAndSorting.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
};

export default SelectedFiltersAndSorting;
