import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './ItemPerPage.scss';
import { Animated } from 'react-animated-css';
import arrowDownIcon from '../../assets/images/arrow-down.svg';

const ItemPerPage = (props) => {
  const { className, show, ...rest } = props;
  const [perPage, setPerPage] = useState(12);
  const [showDropdown, setShowDropdown] = useState(false);
  const itemsPerPage = [12, 24, 48];
  const ref = useRef(null);

  return (
    <div className="items__per__page">
      <span>Items per page</span>
      {className === 'default' ? (
        <button type="button" ref={ref} onClick={() => setShowDropdown(!showDropdown)}>
          <span>{perPage}</span>
          <img src={arrowDownIcon} alt="Chevron" className={showDropdown ? 'rotate' : ''} />
          {showDropdown && (
            <div className="items__per__page__dropdown">
              <Animated animationIn="fadeIn">
                <ul>
                  {itemsPerPage.map((n) => (
                    <li
                      key={n}
                      className={perPage === n ? 'active' : ''}
                      onClick={() => setPerPage(n)}
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
      ) : (
        <button type="button" ref={ref} onClick={() => setShowDropdown(show)}>
          <span>{perPage}</span>
          <img
            src={arrowDownIcon}
            alt="Chevron"
            className={className === 'opened' ? 'rotate' : ''}
          />
          {showDropdown ||
            (className === 'opened' && (
              <div className="items__per__page__dropdown">
                <Animated animationIn="fadeIn">
                  <ul>
                    {itemsPerPage.map((n) => (
                      <li
                        key={n}
                        className={perPage === n ? 'active' : ''}
                        onClick={() => setPerPage(n)}
                        aria-hidden="true"
                      >
                        {n}
                      </li>
                    ))}
                  </ul>
                </Animated>
              </div>
            ))}
        </button>
      )}
    </div>
  );
};

ItemPerPage.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
};

ItemPerPage.defaultProps = {
  className: 'default',
  show: true,
};

export default ItemPerPage;
