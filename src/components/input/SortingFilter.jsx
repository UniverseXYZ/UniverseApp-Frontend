import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import arrowDown from '../../assets/images/browse-nft-arrow-down.svg';
import './SortingFilter.scss';

const SortingFilter = (props) => {
  const { title, countFilter, icon, children, className } = props;
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);

  useLayoutEffect(() => {
    document.addEventListener('click', (event) => {
      if (ref1.current && !ref1.current.contains(event.target)) {
        setOpen(false);
      }
    });
  });
  return (
    <div
      className={`sorting--filter ${open ? 'open' : ''} ${className}`}
      aria-hidden="true"
      onClick={() => setOpen(!open)}
      ref={ref1}
    >
      <p className="filter--name">
        {icon && <img className="filter__icon" src={icon} alt="img" />}
        {title}
        {!!countFilter && ` (${countFilter})`}
      </p>
      <img className={`arrow ${open ? 'rotate' : ''}`} src={arrowDown} alt="Arrow" />
      <div className="box--shadow--effect--block" />
      {open && children}
    </div>
  );
};

SortingFilter.propTypes = {
  title: PropTypes.string,
  countFilter: PropTypes.number,
  icon: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

SortingFilter.defaultProps = {
  title: '',
  countFilter: 0,
  icon: null,
  children: null,
  className: '',
};

export default SortingFilter;
