import React, { useState, useLayoutEffect, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import SelectedFilters from './SelectedFilters';
import SortingDropdowns from './SortingDropdowns';
import SortingFilters from './SortingFilters';
import filtersIcon from '../../../../assets/images/marketplace/filters.svg';
import BrowseFilterPopup from '../../../popups/BrowseFiltersPopup';

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
}) => {
  const [showTabletFilters, setShowTabletFilters] = useState(false);
  const [sliderValue, setSliderValue] = useState({ min: 0, max: 4 });
  const [stickyBlockOffsetTop, setStickyBlockOffsetTop] = useState(128);
  const [classNameStickyBlock, setClassNameStickyBlock] = useState('');
  useEffect(() => {
    const stickyBlock = document.querySelector('.selected--filters--and--sorting');
    setStickyBlockOffsetTop(stickyBlock.offsetTop);
  }, []);

  useLayoutEffect(() => {
    function scrollMyFunc() {
      const stickyBlock = document.querySelector('.selected--filters--and--sorting');
      if (+stickyBlock.offsetTop !== +stickyBlockOffsetTop) {
        setClassNameStickyBlock('selected--filters--and--sorting--sticky');
      } else {
        setClassNameStickyBlock('');
      }
    }
    window.addEventListener('scroll', scrollMyFunc);
  });
  return (
    <div className={`selected--filters--and--sorting ${classNameStickyBlock}`}>
      <div className="sorting__filters__desktop">
        <div className="sorting__filters">
          <SortingFilters
            saleTypeButtons={saleTypeButtons}
            setSaleTypeButtons={setSaleTypeButtons}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
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
      </div>
      <div className="sorting__filters__tablet">
        <div className="head--part">
          <SortingDropdowns />
          <div
            className="sorting__filter__button"
            onClick={() => setShowTabletFilters(!showTabletFilters)}
            aria-hidden="true"
          >
            {saleTypeButtons.filter((item) => item.selected === true).length > 0 ||
            selectedPrice ||
            savedCollections.length > 0 ||
            savedCreators.length > 0 ? (
              <div className="tablet--selected--filters">
                {saleTypeButtons.filter((item) => item.selected === true).length +
                  (selectedPrice && +1) +
                  savedCollections.length +
                  savedCreators.length}
              </div>
            ) : (
              <img src={filtersIcon} alt="Filter" />
            )}
            Filter
          </div>
        </div>
        {showTabletFilters && (
          <SortingFilters
            saleTypeButtons={saleTypeButtons}
            setSaleTypeButtons={setSaleTypeButtons}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            selectedCollections={selectedCollections}
            setSelectedCollections={setSelectedCollections}
            savedCollections={savedCollections}
            setSavedCollections={setSavedCollections}
            selectedCreators={selectedCreators}
            setSelectedCreators={setSelectedCreators}
            savedCreators={savedCreators}
            setSavedCreators={setSavedCreators}
          />
        )}
      </div>
      <div className="sorting__filters__mobile">
        <SortingDropdowns />
        <Popup
          trigger={
            <button type="button" className="light-button">
              <img src={filtersIcon} alt="Filter" />
            </button>
          }
        >
          {(close) => (
            <BrowseFilterPopup
              onClose={close}
              saleTypeButtons={saleTypeButtons}
              setSaleTypeButtons={setSaleTypeButtons}
              setSelectedPrice={setSelectedPrice}
              // sliderValue={sliderValue}
              // setSliderValue={setSliderValue}
              selectedCollections={selectedCollections}
              setSelectedCollections={setSelectedCollections}
              savedCollections={savedCollections}
              setSavedCollections={setSavedCollections}
              selectedCreators={selectedCreators}
              setSelectedCreators={setSelectedCreators}
              savedCreators={savedCreators}
              setSavedCreators={setSavedCreators}
            />
          )}
        </Popup>
        {(saleTypeButtons.filter((item) => item.selected === true).length > 0 ||
          selectedPrice ||
          savedCollections.length > 0 ||
          savedCreators.length > 0) && (
          <div className="selected--filters--numbers">
            {saleTypeButtons.filter((item) => item.selected === true).length +
              (selectedPrice && +1) +
              savedCollections.length +
              savedCreators.length}
          </div>
        )}
      </div>
      <SelectedFilters
        saleTypeButtons={saleTypeButtons}
        setSaleTypeButtons={setSaleTypeButtons}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        setSliderValue={setSliderValue}
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
};

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
