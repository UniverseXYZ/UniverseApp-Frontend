import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../../assets/images/search-gray.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import AppContext from '../../ContextAPI';
import './SearchField.scss';

const SearchField = (props) => {
  const { dropdown, searchText, setSearchText, enterKeyEvent, setApiPage, ...resProps } = props;
  const { setMyUniverseNFTsActiverPage } = useContext(AppContext);
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

  const handleInputChange = (e) => {
    if (e.target.value.length < 16) {
      setSearchText(e.target.value);
      setApiPage(1);
      setMyUniverseNFTsActiverPage(0);
    }
  };

  return (
    <div className={`search--field--component ${focusField}`}>
      <img className="search" src={searchIcon} alt="Search" />
      <input
        type="text"
        className="inp"
        // placeholder="Search"
        ref={searchRef}
        onChange={handleInputChange}
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
            </div>
          )}
        </>
      )}
    </div>
  );
};

SearchField.propTypes = {
  dropdown: PropTypes.bool,
  searchText: PropTypes.string,
  enterKeyEvent: PropTypes.bool,
  setSearchText: PropTypes.func,
  setApiPage: PropTypes.func.isRequired,
};

SearchField.defaultProps = {
  dropdown: true,
  enterKeyEvent: true,
  searchText: '',
  setSearchText: () => {},
};

export default SearchField;
