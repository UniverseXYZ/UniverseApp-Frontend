import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import arrowDown from '../../assets/images/arrow-down.svg';
import searchIcon from '../../assets/images/search.svg';
import AppContext from '../../ContextAPI';

const Filters = ({ search, setSearch }) => {
  const { handleClickOutside } = useContext(AppContext);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Sort by');
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener(
      'click',
      (e) => handleClickOutside(e, 'dropdown', ref, setIsDropdownOpened),
      true
    );
    return () => {
      document.removeEventListener(
        'click',
        (e) => handleClickOutside(e, 'dropdown', ref, setIsDropdownOpened),
        true
      );
    };
  });

  return (
    <div className="collection__filters">
      <div className="collection__filters__head">
        <h1 className="title">Items</h1>
      </div>
      <div className="collection__filters__fields">
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img src={searchIcon} alt="Search" />
        </div>
        <div
          ref={ref}
          className={`dropdown ${isDropdownOpened ? 'opened' : ''}`}
          onClick={() => setIsDropdownOpened(!isDropdownOpened)}
          aria-hidden="true"
        >
          <span className="selected__item">{selectedItem}</span>
          <img className="chevron__down" src={arrowDown} alt="Arrow" />
          {isDropdownOpened && (
            <div className="sorting__dropdown">
              <ul>
                <li
                  onClick={() => {
                    setSelectedItem('Sort by');
                    setIsDropdownOpened(false);
                  }}
                  aria-hidden="true"
                >
                  Sort by
                </li>
                <li
                  onClick={() => {
                    setSelectedItem('Recently created');
                    setIsDropdownOpened(false);
                  }}
                  aria-hidden="true"
                >
                  Recently created
                </li>
                <li
                  onClick={() => {
                    setSelectedItem('Recently sold');
                    setIsDropdownOpened(false);
                  }}
                  aria-hidden="true"
                >
                  Recently sold
                </li>
                <li
                  onClick={() => {
                    setSelectedItem('Most viewed');
                    setIsDropdownOpened(false);
                  }}
                  aria-hidden="true"
                >
                  Most viewed
                </li>
                <li
                  onClick={() => {
                    setSelectedItem('Oldest');
                    setIsDropdownOpened(false);
                  }}
                  aria-hidden="true"
                >
                  Oldest
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default Filters;
