import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import arrowDown from '../../assets/images/browse-nft-arrow-down.svg';
import './SortBySelect.scss';

const SortBySelect = (props) => {
  const {
    data,
    sortData,
    className,
    onChange,
    defaultValue,
    getData,
    getDesc,
    desc,
    hideFirstOption,
    disableOptions,
  } = props;
  const [sortValue, setSortValue] = useState(defaultValue);
  const [showSecondDropdown, setShowSecondDropdown] = useState(false);
  const ref = useRef(null);
  const ref2 = useRef(null);

  useEffect(() => {
    onChange(sortValue);
    if (data?.length) {
      const sortedData = desc ? data.sort((a, b) => b.id - a.id) : data.sort((a, b) => a.id - b.id);
      getData([...sortedData]);
    }
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
            {sortData.map((item, index) => (
              <div
                className={`dropdown--item ${disableOptions[index] ? 'disable' : ''}`}
                key={uuid()}
                aria-hidden="true"
                onClick={() => !disableOptions[index] && setSortValue(item)}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  sortData: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  getData: PropTypes.func,
  getDesc: PropTypes.func,
  desc: PropTypes.bool,
  hideFirstOption: PropTypes.bool,
  disableOptions: PropTypes.oneOfType([PropTypes.array]),
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
  defaultValue: 'Sort by',
  getData: () => {},
  getDesc: () => {},
  desc: false,
  hideFirstOption: false,
  disableOptions: [],
};

export default SortBySelect;
