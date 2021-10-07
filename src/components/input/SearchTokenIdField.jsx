import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../assets/images/search-gray.svg';
import './SearchTokenIdField.scss';

const SearchTokenIdField = ({ searchValue, setSearchValue }) => {
  const [focusField, setFocusField] = useState('');

  return (
    <div className={`search--tokenId--field ${focusField}`}>
      <img className="search--icon" src={searchIcon} alt="Search" />
      <input
        type="text"
        placeholder="Search"
        className="inp"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        onFocus={() => setFocusField('focus--field')}
        onBlur={() => setFocusField('')}
      />
      <div className="focus--field--box--shadow" />
    </div>
  );
};

SearchTokenIdField.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};

export default SearchTokenIdField;
