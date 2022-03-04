import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';

// Icons
import searchIcon from '../../../../../../../../assets/images/search-gray.svg';

// Styles
import './SearchField.scss';

// Interfaces
import { ISearchBarValue } from '../index';

// Constants
const MAX_CHAR_LENGTH = 32;
interface IPropsSearchNFTsField {
  searchValue: ISearchBarValue;
  placeholder: string;
  onChange: (value: ISearchBarValue) => void;
};

export const SearchNFTsField = (props: IPropsSearchNFTsField) => {
  const [focusField, setFocusField] = useState<string>('');
  const [_value, _setLocalValue] = useState<ISearchBarValue>({ searchValue: ''});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const charsLength = e.target.value.length;
    if (charsLength > MAX_CHAR_LENGTH) return;

    const result = {
      searchValue: e.target.value,
    };

    _setLocalValue(result);
    props.onChange(result);
  }

  return (
    <div className={`search--field--component ${focusField}`}>
      <img className="search" src={searchIcon} alt="Search" />
      <DebounceInput
        debounceTimeout={300}
        type="text"
        className="inp"
        onChange={handleChange}
        value={_value.searchValue}
        onFocus={() => setFocusField('focus--field')}
        onBlur={() => setFocusField('')}
        placeholder={props.placeholder}
      />
      <div className="focus--field--box--shadow" />
    </div>
  );
};