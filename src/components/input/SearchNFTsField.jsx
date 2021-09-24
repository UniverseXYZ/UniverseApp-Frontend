import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../assets/images/search-gray.svg';
import './SearchField.scss';

const SearchNFTsField = ({ searchValue, setSearchValue, dropdown, getData, ...resProps }) => {
  const [focusField, setFocusField] = useState('');

  return (
    <div className={`search--field--component ${focusField}`}>
      <img className="search" src={searchIcon} alt="Search" />
      <input
        type="text"
        className="inp"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        onFocus={() => setFocusField('focus--field')}
        onBlur={() => setFocusField('')}
        {...resProps}
      />
      <div className="focus--field--box--shadow" />
    </div>
  );
};

SearchNFTsField.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  dropdown: PropTypes.bool,
  getData: PropTypes.func,
};

SearchNFTsField.defaultProps = {
  dropdown: true,
  getData: () => {},
};

export default SearchNFTsField;
