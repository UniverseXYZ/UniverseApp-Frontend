import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SortingFilter from '../input/SortingFilter';
import salesIcon from '../../assets/images/marketplace/sale-type.svg';
import './styles/SaleTypeFilter.scss';

const SaleTypeFilter = (props) => {
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

  const handleClearSale = () => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons.forEach((item) => {
      item.selected = false;
    });
    setSaleTypeButtons(newSaleTypeButtons);
  };

  return (
    <SortingFilter
      className="sale--type--filter"
      title="Sale type"
      countFilter={saleTypeButtons.filter((elem) => elem.selected).length}
      icon={salesIcon}
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
          <button type="button" className="light-button" onClick={() => handleSaveSale()}>
            Save
          </button>
        </div>
      </div>
    </SortingFilter>
  );
};

export default SaleTypeFilter;
