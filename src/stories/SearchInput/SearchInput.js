import React from 'react';
import PropTypes from 'prop-types';
import './SearchInput.scss';
import search from '../../assets/images/search.svg';
import searchActive from '../../assets/images/search-icon.svg';
import searchError from '../../assets/images/search-error.svg';

const SearchInput = (props) => {
  const { className, ...rest } = props;
  return (
    <div className="search-intup-l">
      {className === 'error-inp' ? (
        <img src={searchError} alt="Error" />
      ) : className === 'focus' || className === 'filled' ? (
        <img src={searchActive} alt="Active" />
      ) : (
        <img src={search} alt="Search" />
      )}
      <input className={`inp ${className} `} {...rest} />
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
};
SearchInput.defaultProps = {
  className: null,
};
export default SearchInput;
