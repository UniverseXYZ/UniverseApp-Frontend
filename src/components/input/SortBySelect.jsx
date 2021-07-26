import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import arrowDown from '../../assets/images/browse-nft-arrow-down.svg';
import './SortBySelect.scss';

const SortBySelect = (props) => {
  const { sortData, className, onChange } = props;
  const [sortValue, setSortValue] = useState('Sort by');
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const ref = useRef(null);
  const ref2 = useRef(null);

  useEffect(() => {
    onChange(sortValue);
  }, [sortValue]);

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
            {sortData.map((item) => (
              <div
                className="dropdown--item"
                key={uuid()}
                aria-hidden="true"
                onClick={() => setSortValue(item)}
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
  onChange: PropTypes.func,
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
  onChange: () => {},
};

export default SortBySelect;
