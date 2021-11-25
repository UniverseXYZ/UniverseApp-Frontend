import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import arrowDown from '../../assets/images/browse-nft-arrow-down.svg';
import './SortBySelect.scss';

const SortBySelect = (props) => {
  const {
    className,
    hideFirstOption,
    disableOptions,
    setSelectedTypeIndex,
    sortData,
    sort,
    setSort,
  } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div
      className={
        !showDropdown
          ? `sort--by--select--parent ${className}`
          : `sort--by--select--parent sort--by--select--parent--active ${className}`
      }
    >
      <div
        className={`dropdown ${showDropdown ? 'open' : ''}`}
        aria-hidden="true"
        onClick={() => setShowDropdown(!showDropdown)}
        ref={ref}
      >
        <span>{sort}</span>
        <img src={arrowDown} alt="Arrow down" className={showDropdown ? 'rotate' : ''} />
        {showDropdown && (
          <div className="dropdown--items">
            {sortData.map((item, index) => (
              <div
                className={`dropdown--item ${disableOptions[index] ? 'disable' : ''}`}
                key={uuid()}
                aria-hidden="true"
                onClick={() => {
                  if (!disableOptions[index]) {
                    setSort(item);
                    setSelectedTypeIndex(index);
                  }
                }}
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
  sortData: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  sort: PropTypes.string.isRequired,
  hideFirstOption: PropTypes.bool,
  disableOptions: PropTypes.oneOfType([PropTypes.array]),
  setSelectedTypeIndex: PropTypes.func,
  setSort: PropTypes.func.isRequired,
};

SortBySelect.defaultProps = {
  className: '',
  hideFirstOption: false,
  disableOptions: [],
  setSelectedTypeIndex: () => {},
};

export default SortBySelect;
