import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../../assets/images/search-gray.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import './SearchField.scss';

const SearchField = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [focusField, setFocusField] = useState('');
  const [findData, setFindData] = useState([]);
  const history = useHistory();
  const ref = useRef();
  const searchRef = useRef();
  const { data, CardElement, dropdown, getData, enterKeyEvent, ...resProps } = props;

  const handleSearchKeyDown = (e) => {
    if (e.keyCode === 13 && enterKeyEvent) {
      if (searchValue) {
        history.push(`/search`, { query: searchValue });
        setSearchValue('');
        searchRef.current.blur();
      }
    }
  };

  useEffect(() => {
    const filterData = data.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    if (!searchValue.length) {
      setFindData(data);
    }
    setFindData(filterData);
  }, [searchValue]);

  useEffect(() => {
    getData(findData);
  }, [findData]);

  return (
    <div className={`search--field--component ${focusField}`}>
      <img className="search" src={searchIcon} alt="Search" />
      <input
        type="text"
        className="inp"
        // placeholder="Search"
        ref={searchRef}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        onKeyDown={handleSearchKeyDown}
        onFocus={() => setFocusField('focus--field')}
        onBlur={() => setFocusField('')}
        {...resProps}
      />
      <div className="focus--field--box--shadow" />
      {searchValue.length > 0 && (
        <>
          <img
            className="close"
            src={closeIcon}
            alt="Close"
            onClick={() => setSearchValue('')}
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
  getData: PropTypes.func,
  enterKeyEvent: PropTypes.bool,
};

SearchField.defaultProps = {
  dropdown: true,
  getData: () => {},
  enterKeyEvent: true,
};

export default SearchField;
