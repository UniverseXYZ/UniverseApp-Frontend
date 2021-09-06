import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import arrowDown from '../../assets/images/arrow-down.svg';

const CollectionDropdown = ({
  isDropdownOpened,
  setIsDropdownOpened,
  setFilter,
  lobstersFilter,
  allCharactersFilter,
  polymorphsFilter,
  collectionFilter,
}) => {
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('target')) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpened(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="universe_filter">
      <div className="universe_filter_label">
        <span>Filter</span>
      </div>
      <div>
        <div
          ref={ref}
          className={`universe_dropdown ${isDropdownOpened ? 'opened' : ''}`}
          onClick={() => setIsDropdownOpened(!isDropdownOpened)}
          aria-hidden="true"
        >
          <span className="selected__universe__item">{collectionFilter}</span>
          <img className="arrow__down" src={arrowDown} alt="Arrow" />
          {isDropdownOpened && (
            <div className="sort__dropdown">
              <ul>
                <li onClick={setFilter} aria-hidden="true">
                  {allCharactersFilter}
                </li>
                <li onClick={setFilter} aria-hidden="true">
                  {polymorphsFilter}
                </li>
                <li onClick={setFilter} aria-hidden="true">
                  {lobstersFilter}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CollectionDropdown.propTypes = {
  isDropdownOpened: PropTypes.bool.isRequired,
  setIsDropdownOpened: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  allCharactersFilter: PropTypes.string.isRequired,
  polymorphsFilter: PropTypes.string.isRequired,
  lobstersFilter: PropTypes.string.isRequired,
  collectionFilter: PropTypes.string.isRequired,
};

export default CollectionDropdown;
