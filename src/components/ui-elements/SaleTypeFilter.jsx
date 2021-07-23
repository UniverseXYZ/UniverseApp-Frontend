import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SortingFilter from '../input/SortingFilter';
import salesIcon from '../../assets/images/marketplace/sale-type.svg';
import './styles/SaleTypeFilter.scss';

const SaleTypeFilter = (props) => {
  const { getSelectedFilters, onClear, removeElemInSelected } = props;
  const [onClose, setOnClose] = useState(false);
  const [saleTypeButtons, setSaleTypeButtons] = useState([
    {
      text: 'Buy now',
      description: 'Fixed price sale',
      selected: false,
    },
    {
      text: 'On Auction',
      description: 'You can place bids',
      selected: false,
    },
    {
      text: 'New',
      description: 'Recently added',
      selected: false,
    },
    {
      text: 'Has Offers',
      description: 'High is demand',
      selected: false,
    },
  ]);
  const handleSelect = (idx) => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons[idx].selected = !newSaleTypeButtons[idx].selected;
    setSaleTypeButtons(newSaleTypeButtons);
  };

  const save = () => {
    const copySelectedSaleType = saleTypeButtons.filter((elem) => elem.selected);
    getSelectedFilters(copySelectedSaleType);
    setOnClose(true);
  };

  useEffect(() => {
    setOnClose(false);
  }, [onClose]);

  const handleClearSale = () => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons.forEach((item) => {
      item.selected = false;
    });
    setSaleTypeButtons(newSaleTypeButtons);
  };

  useEffect(() => {
    if (onClear) {
      const arr = [];
      saleTypeButtons.forEach((elem) => {
        elem.selected = false;
        arr.push(elem);
      });
      getSelectedFilters(arr.filter((elem) => elem.selected));
      setSaleTypeButtons(arr);
    }
    if (removeElemInSelected) {
      const copySelected = [...saleTypeButtons];
      copySelected[copySelected.indexOf(removeElemInSelected)].selected = false;
      setSaleTypeButtons(copySelected);
      getSelectedFilters(copySelected.filter((elem) => elem.selected));
    }
  }, [onClear, removeElemInSelected]);

  return (
    <SortingFilter
      className="sale--type--filter"
      title="Sale type"
      countFilter={saleTypeButtons.filter((elem) => elem.selected).length}
      icon={salesIcon}
      // onClose={}
      onClose={onClose}
    >
      <div
        className="sale--dropdown"
        aria-hidden="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sale--dropdown--body">
          <div className="sale--dropdown--header">
            <div className="active">Single items</div>
            <div>Bundles</div>
          </div>
          <div className="sale--types">
            {saleTypeButtons.map((item, index) => (
              <div className="sale--type--div" key={index.toString()}>
                <input
                  type="checkbox"
                  className="sale--type--checkboxes"
                  onChange={() => handleSelect(index)}
                  checked={item.selected}
                />
                <div className="sale--type--name">
                  <h4>{item.text}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sale--dropdown--footer">
          <button type="button" className="clear--all" onClick={() => handleClearSale()}>
            Clear
          </button>
          <button type="button" className="light-button" onClick={() => save()}>
            Save
          </button>
        </div>
      </div>
    </SortingFilter>
  );
};

SaleTypeFilter.propTypes = {
  getSelectedFilters: PropTypes.func,
  onClear: PropTypes.bool,
  removeElemInSelected: PropTypes.shape({}),
};

SaleTypeFilter.defaultProps = {
  getSelectedFilters: () => {},
  onClear: false,
  removeElemInSelected: null,
};

export default SaleTypeFilter;
