import React from 'react';
import PropTypes from 'prop-types';
import SelectedFilters from './SelectedFilters';
import SortingDropdowns from './SortingDropdowns';
import SortingFilters from './SortingFilters';

const SelectedFiltersAndSorting = ({
  saleTypeButtons,
  setSaleTypeButtons,
  selectedPrice,
  setSelectedPrice,
  savedCollections,
  setSavedCollections,
  selectedCollections,
  setSelectedCollections,
  selectedCreators,
  setSelectedCreators,
  savedCreators,
  setSavedCreators,
}) => (
  <div className="selected--filters--and--sorting">
    <div className="sorting__filters">
      <SortingFilters
        saleTypeButtons={saleTypeButtons}
        setSaleTypeButtons={setSaleTypeButtons}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        selectedCollections={selectedCollections}
        setSelectedCollections={setSelectedCollections}
        savedCollections={savedCollections}
        setSavedCollections={setSavedCollections}
        selectedCreators={selectedCreators}
        setSelectedCreators={setSelectedCreators}
        savedCreators={savedCreators}
        setSavedCreators={setSavedCreators}
      />
      <SortingDropdowns />
    </div>
    <SelectedFilters
      saleTypeButtons={saleTypeButtons}
      setSaleTypeButtons={setSaleTypeButtons}
      selectedPrice={selectedPrice}
      setSelectedPrice={setSelectedPrice}
      selectedCollections={selectedCollections}
      setSelectedCollections={setSelectedCollections}
      savedCollections={savedCollections}
      setSavedCollections={setSavedCollections}
      selectedCreators={selectedCreators}
      setSelectedCreators={setSelectedCreators}
      savedCreators={savedCreators}
      setSavedCreators={setSavedCreators}
    />
  </div>
);

SelectedFiltersAndSorting.propTypes = {
  saleTypeButtons: PropTypes.oneOfType([PropTypes.array]),
  setSaleTypeButtons: PropTypes.func,
  selectedPrice: PropTypes.oneOfType([PropTypes.any]),
  setSelectedPrice: PropTypes.func,
  selectedCollections: PropTypes.oneOfType([PropTypes.array]),
  setSelectedCollections: PropTypes.func,
  savedCollections: PropTypes.oneOfType([PropTypes.array]),
  setSavedCollections: PropTypes.func,
  selectedCreators: PropTypes.oneOfType([PropTypes.array]),
  setSelectedCreators: PropTypes.func,
  savedCreators: PropTypes.oneOfType([PropTypes.array]),
  setSavedCreators: PropTypes.func,
};

SelectedFiltersAndSorting.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
  selectedPrice: null,
  setSelectedPrice: () => {},
  selectedCollections: [],
  setSelectedCollections: () => {},
  savedCollections: [],
  setSavedCollections: () => {},
  selectedCreators: [],
  setSelectedCreators: () => {},
  savedCreators: [],
  setSavedCreators: () => {},
};

export default SelectedFiltersAndSorting;
