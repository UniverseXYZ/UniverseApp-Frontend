import React, { useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../../../../../../../assets/images/search-gray.svg';
import './SearchField.scss';

interface IPropsSearchNFTsField {
  searchValue: string;
  placeholder: string;
  setSearchValue: (value: any) => void;
  resetPagination: () => void;
};

export const SearchNFTsField = (props: IPropsSearchNFTsField) => {
  const [focusField, setFocusField] = useState<string>('');

  return (
    <div className={`search--field--component ${focusField}`}>
      <img className="search" src={searchIcon} alt="Search" />
      <input
        type="text"
        className="inp"
        onChange={(e) => {
          if (e.target.value.length <= 32) {
            props.setSearchValue(e.target.value);
            props.resetPagination();
          }
        }}
        value={props.searchValue}
        onFocus={() => setFocusField('focus--field')}
        onBlur={() => setFocusField('')}
        placeholder={props.placeholder}
      />
      <div className="focus--field--box--shadow" />
    </div>
  );
};

SearchNFTsField.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  resetPagination: PropTypes.func,
};

SearchNFTsField.defaultProps = {
  resetPagination: () => {},
};

export default SearchNFTsField;
