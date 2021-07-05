import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import closeIcon from '../../../../assets/images/close-menu.svg';
import priceIcon from '../../../../assets/images/browse-nfts/price.svg';

const SelectedFilters = ({
  saleTypeButtons,
  setSaleTypeButtons,
  selectedPrice,
  setSelectedPrice,
}) => {
  const [showClearALL, setShowClearALL] = useState(false);

  const handleClearAll = () => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons.forEach((item) => {
      item.selected = false;
    });
    setSaleTypeButtons(newSaleTypeButtons);
    setSelectedPrice(null);
  };

  const removeSelectedFilter = (idx) => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons[idx].selected = false;
    setSaleTypeButtons(newSaleTypeButtons);
  };

  useEffect(() => {
    const res = saleTypeButtons.filter((i) => i.selected);
    if (res.length || selectedPrice) {
      setShowClearALL(true);
    } else {
      setShowClearALL(false);
    }
  }, [saleTypeButtons, selectedPrice]);

  return (
    <div className="selected--filters">
      <div className="show--selected--filters">
        <div className="results--count">15,118,898 results</div>
        {saleTypeButtons.map(
          (item, index) =>
            item.selected && (
              <button type="button" className="light-border-button" key={uuid()}>
                {item.text}
                <img
                  className="close"
                  src={closeIcon}
                  alt="Close"
                  aria-hidden="true"
                  onClick={() => removeSelectedFilter(index)}
                />
              </button>
            )
        )}
        {selectedPrice && (
          <button type="button" className="light-border-button" key={uuid()}>
            <img className="price" src={priceIcon} alt="Price" />
            {`ETH: ${selectedPrice.min} - ${selectedPrice.max}`}
            <img
              className="close"
              src={closeIcon}
              alt="Close"
              aria-hidden="true"
              onClick={() => setSelectedPrice(null)}
            />
          </button>
        )}
        {showClearALL && (
          <div
            className="clear--all--selected--filters"
            aria-hidden="true"
            onClick={() => handleClearAll()}
          >
            Clear all
          </div>
        )}
      </div>
    </div>
  );
};

SelectedFilters.propTypes = {
  saleTypeButtons: PropTypes.oneOfType([PropTypes.array]),
  setSaleTypeButtons: PropTypes.func,
  selectedPrice: PropTypes.oneOfType([PropTypes.any]),
  setSelectedPrice: PropTypes.func,
};

SelectedFilters.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
  selectedPrice: null,
  setSelectedPrice: () => {},
};

export default SelectedFilters;
