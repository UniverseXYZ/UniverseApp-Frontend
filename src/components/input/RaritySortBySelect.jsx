import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import arrowDown from '../../assets/images/browse-nft-arrow-down.svg';

import './SortBySelect.scss';

const SortBySelect = (props) => {
  const {
    sortData,
    className,
    defaultValue,
    setSortField,
    setApiPage,
    resetPagination,
    hideFirstOption,
  } = props;
  const [sortValue, setSortValue] = useState(defaultValue);
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const ref2 = useRef(null);

  const handleOptionChange = (item) => {
    setSortValue(item);
    setApiPage(1);
    resetPagination();
    switch (item) {
      case 'Rarity Score':
        setSortField('rarityscore');
        break;
      case 'Polymorph Id':
        setSortField('tokenid');
        break;
      case 'Rank':
        setSortField('rank');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleOptionChange(defaultValue);
  }, []);

  return (
    <div
      className={
        !showSecondDropdown
          ? `sort--by--select--parent ${className}`
          : `sort--by--select--parent sort--by--select--parent--active ${className}`
      }
    >
      <div
        className={`dropdown ${showSecondDropdown ? 'open' : ''}`}
        aria-hidden="true"
        onClick={() => setShowSecondDropdown(!showSecondDropdown)}
        ref={ref2}
      >
        <span>{sortValue}</span>
        <img src={arrowDown} alt="Arrow down" className={showSecondDropdown ? 'rotate' : ''} />
        {showSecondDropdown && (
          <div className="dropdown--items">
            {sortData.map((item, index) => (
              <div
                className="dropdown--item"
                key={item}
                aria-hidden="true"
                onClick={() => handleOptionChange(item)}
                style={{ display: hideFirstOption && index === 0 ? 'none' : 'block' }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="box--shadow--effect--block" />
    </div>
  );
};

SortBySelect.propTypes = {
  sortData: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  setSortField: PropTypes.func.isRequired,
  setApiPage: PropTypes.func,
  resetPagination: PropTypes.func.isRequired,
  hideFirstOption: PropTypes.bool,
};

SortBySelect.defaultProps = {
  sortData: [
    'ending son',
    'lowest price first',
    'highest price first',
    'recently listed',
    'recently created',
    'recently sold',
    'most liked',
  ],
  className: '',
  defaultValue: 'Sort by',
  hideFirstOption: false,
  setApiPage: () => {},
};

export default SortBySelect;
