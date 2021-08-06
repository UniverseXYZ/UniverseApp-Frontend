import React, { useContext, useState, useEffect, useRef } from 'react';
import arrowDown from '../../../../../assets/images/arrow-down.svg';
import AppContext from '../../../../../ContextAPI';
import SearchField from '../../../../input/SearchField';

const FutureAuctionsFilters = () => {
  const { handleClickOutside } = useContext(AppContext);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Newest');
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
    <div className="future__auctions__filters">
      <div className="future__auctions__filters__head">
        <h1 className="title">Filters</h1>
        <button type="button">Clear all</button>
      </div>
      <div className="future__auctions__filters__fields">
        <div>
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
          <div className="box--shadow--effect--block" />
        </div>
        <div className="search">
          <SearchField
            data={[]}
            placeholder="Search auctions by name or artist"
            dropdown={false}
            CardElement={<></>}
            enterKeyEvent={false}
          />
        </div>
      </div>
    </div>
  );
};

export default FutureAuctionsFilters;
