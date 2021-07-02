import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import closeIcon from '../../../../assets/images/close-menu.svg';

const SelectedFilters = ({ saleTypeButtons, setSaleTypeButtons }) => {
  const [showClearALL, setShowClearALL] = useState(false);

  const handleClearAll = () => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons.forEach((item) => {
      item.selected = false;
    });
    setSaleTypeButtons(newSaleTypeButtons);
  };

  const removeSelectedFilter = (idx) => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons[idx].selected = false;
    setSaleTypeButtons(newSaleTypeButtons);
  };

  useEffect(() => {
    const res = saleTypeButtons.filter((i) => i.selected);
    if (res.length) {
      setShowClearALL(true);
    } else {
      setShowClearALL(false);
    }
  }, [saleTypeButtons]);

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
                  src={closeIcon}
                  alt="Close"
                  aria-hidden="true"
                  onClick={() => removeSelectedFilter(index)}
                />
              </button>
            )
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
};

SelectedFilters.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
};

export default SelectedFilters;
