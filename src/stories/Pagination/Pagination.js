import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';
import ReactPaginate from 'react-paginate';
import leftArrow from '../../assets/images/left-arrow.svg';
import rightArrow from '../../assets/images/right-arrow.svg';

const Pagination = (props) => {
  const { className, disabled, active, ...rest } = props;

  useEffect(() => {
    // Prev Icon
    const prev = document.querySelector('.previous a');
    if (prev) {
      const prevIcon = document.createElement('img');
      prevIcon.src = leftArrow;
      prev.innerHTML = '';
      prev.appendChild(prevIcon);
    }

    // Next Icon
    const next = document.querySelector('.next a');
    if (next) {
      const nextIcon = document.createElement('img');
      nextIcon.src = rightArrow;
      next.innerHTML = '';
      next.appendChild(nextIcon);
    }
  }, []);

  return (
    <>
      {className === 'default' ? (
        <div>
          <ReactPaginate
            previousLabel=""
            nextLabel=""
            breakLabel="..."
            breakClassName="break-me"
            //   pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            //   onPageChange={handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      ) : className.includes('arrows') ? (
        className.includes('previous') ? (
          <div className={disabled ? `${className} disabled` : className}>
            <img src={leftArrow} alt="Left arrow" />
          </div>
        ) : (
          <div className={disabled ? `${className} disabled` : className}>
            <img src={rightArrow} alt="Right arrow" />
          </div>
        )
      ) : className.includes('page') ? (
        <div className={active ? `${className} active` : className}>
          <p>1</p>
        </div>
      ) : (
        <div className="etc">
          <p>...</p>
        </div>
      )}
    </>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

Pagination.defaultProps = {
  className: '',
  disabled: false,
  active: false,
};

export default Pagination;
