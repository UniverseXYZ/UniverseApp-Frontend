import React, { useContext, useState, useEffect, useRef } from 'react';
import arrowDown from '../../../../../assets/images/arrow-down.svg';
import searchIcon from '../../../../../assets/images/search.svg';
import Input from '../../../../input/Input';
import AppContext from '../../../../../ContextAPI';
import { handleClickOutside } from '../../../../../utils/helpers';

const ActiveAuctionsFilters = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Newest');
  const [search, setSearch] = useState('');
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
    <div className="active__auctions__filters">
      <div className="active__auctions__filters__head">
        <h1 className="title">Filters</h1>
        <button type="button">Clear all</button>
      </div>
      <div className="active__auctions__filters__fields">
        <div
          ref={ref}
          className={`dropdown ${isDropdownOpened ? 'opened' : ''}`}
          onClick={() => setIsDropdownOpened(!isDropdownOpened)}
          aria-hidden="true"
          hoverBoxShadowGradient
        >
          <span className="selected__item">{selectedItem}</span>
          <img className="chevron__down" src={arrowDown} alt="Arrow" />
          <div className="box--shadow--effect--block" />
          {isDropdownOpened && (
            <div className="sorting__dropdown">
              <ul>
                <li
                  onClick={() => {
                    setSelectedItem('Newest');
                    setIsDropdownOpened(false);
                  }}
                  aria-hidden="true"
                >
                  Newest
                </li>
                <li
                  onClick={() => {
                    setSelectedItem('Highest bid');
                    setIsDropdownOpened(false);
                  }}
                  aria-hidden="true"
                >
                  Highest bid
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="search">
          <Input
            type="text"
            placeholder="Search auctions by name or artist"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            hoverBoxShadowGradient
          />
          <img src={searchIcon} alt="Search" />
        </div>
      </div>
    </div>
  );
};

export default ActiveAuctionsFilters;
