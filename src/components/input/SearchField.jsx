import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../../assets/images/search-gray.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import './SearchField.scss';

const SearchField = (props) => {
  const { data, CardElement, dropdown, searchText, setSearchText, enterKeyEvent, ...resProps } =
    props;
  const [focusField, setFocusField] = useState('');
  const [findData, setFindData] = useState('');
  const history = useHistory();
  const ref = useRef();
  const searchRef = useRef();

  const handleSearchKeyDown = (e) => {
    if (e.keyCode === 13 && enterKeyEvent) {
      if (searchText) {
        history.push(`/search`, { query: searchText });
        setSearchText('');
        searchRef.current.blur();
      }
    }
  };

  // useEffect(() => {
  //   const filterData = data.filter((item) =>
  //     item.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
  //   );
  //   if (!searchValue.length) {
  //     setFindData(data);
  //   }
  //   setFindData(filterData);
  // }, [searchValue]);

  // useEffect(() => {
  //   getData(findData);
  // }, [findData]);

  return (
    <div className={`search--field--component ${focusField}`}>
      <img className="search" src={searchIcon} alt="Search" />
      <input
        type="text"
        className="inp"
        // placeholder="Search"
        ref={searchRef}
        onChange={(e) => {
          if (e.target.value.length < 16) {
            setSearchText(e.target.value);
          }
        }}
        value={searchText}
        onKeyDown={handleSearchKeyDown}
        onFocus={() => setFocusField('focus--field')}
        onBlur={() => setFocusField('')}
        {...resProps}
      />
      <div className="focus--field--box--shadow" />
      {searchText.length > 0 && (
        <>
          <img
            className="close"
            src={closeIcon}
            alt="Close"
            onClick={() => setSearchText('')}
            aria-hidden="true"
          />
          {dropdown && (
            <div className="search__results" ref={ref}>
              {!findData.length && (
                <div className="no__result">
                  <p>No items found</p>
                </div>
              )}
              {!!findData.length &&
                findData.map((elem, index) => <CardElement {...elem} key={index.toString()} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
};

SearchField.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
  CardElement: PropTypes.node.isRequired,
  dropdown: PropTypes.bool,
  searchText: PropTypes.string,
  enterKeyEvent: PropTypes.bool,
  setSearchText: PropTypes.func,
};

SearchField.defaultProps = {
  dropdown: true,
  enterKeyEvent: true,
  searchText: '',
  setSearchText: () => {},
};

export default SearchField;
