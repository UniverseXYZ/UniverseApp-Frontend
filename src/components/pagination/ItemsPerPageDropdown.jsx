import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import AppContext from '../../ContextAPI';
import arrowDownIcon from '../../assets/images/arrow-down.svg';
import { handleClickOutside } from '../../utils/helpers';

const ItemsPerPageDropdown = ({ perPage, itemsPerPage, offset, page, changePerPage }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener(
      'click',
      (e) => handleClickOutside(e, 'items__per__page', ref, setShowDropdown),
      true
    );
    return () => {
      document.removeEventListener(
        'click',
        (e) => handleClickOutside(e, 'items__per__page', ref, setShowDropdown),
        true
      );
    };
  });

  return (
    <div className="items__per__page">
      <span>Items per page</span>
      <button type="button" ref={ref} onClick={() => setShowDropdown(!showDropdown)}>
        <span>{perPage}</span>
        <img src={arrowDownIcon} alt="Chevron" className={showDropdown ? 'rotate' : ''} />
        {showDropdown && (
          <div className="items__per__page__dropdown">
            <Animated animationIn="fadeIn">
              <ul>
                {itemsPerPage.map((n) => (
                  <li
                    key={uuid()}
                    className={perPage === n ? 'active' : ''}
                    onClick={() => changePerPage(n)}
                    aria-hidden="true"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </Animated>
          </div>
        )}
      </button>
    </div>
  );
};

ItemsPerPageDropdown.propTypes = {
  perPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.arrayOf(PropTypes.number),
  offset: PropTypes.number,
  page: PropTypes.number,
  changePerPage: PropTypes.func,
};

ItemsPerPageDropdown.defaultProps = {
  itemsPerPage: [9, 18, 36],
  offset: 0,
  page: 0,
  changePerPage: () => {},
};

export default ItemsPerPageDropdown;
