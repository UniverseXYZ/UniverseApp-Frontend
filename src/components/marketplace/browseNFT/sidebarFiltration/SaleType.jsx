import React, { useState } from 'react';
import { Animated } from 'react-animated-css';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import arrowDown from '../../../../assets/images/browse-nft-arrow-down.svg';

const SaleType = ({ saleTypeButtons, setSaleTypeButtons }) => {
  const [showFilters, setShowFilters] = useState(true);

  const handleClick = (idx) => {
    const newSaleTypeButtons = [...saleTypeButtons];
    newSaleTypeButtons[idx].selected = !newSaleTypeButtons[idx].selected;
    setSaleTypeButtons(newSaleTypeButtons);
  };

  return (
    <div className="browse--nft--sidebar--filtration--item">
      <div
        className="browse--nft--sidebar--filtration--item--header"
        aria-hidden="true"
        onClick={() => setShowFilters(!showFilters)}
      >
        <h3>Sale Type</h3>
        <img src={arrowDown} alt="Arrow Down" className={showFilters ? 'rotate' : ''} />
      </div>
      {showFilters ? (
        <Animated animationIn="fadeIn">
          <div className="browse--nft--sidebar--filtration--item--content">
            <div className="sale--type--buttons">
              {saleTypeButtons.map((item, index) => (
                <button
                  type="button"
                  key={uuid()}
                  className={item.selected ? 'selected' : ''}
                  onClick={() => handleClick(index)}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        </Animated>
      ) : (
        <></>
      )}
    </div>
  );
};

SaleType.propTypes = {
  saleTypeButtons: PropTypes.oneOfType([PropTypes.array]),
  setSaleTypeButtons: PropTypes.func,
};

SaleType.defaultProps = {
  saleTypeButtons: [],
  setSaleTypeButtons: () => {},
};

export default SaleType;
