import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import leftArrow from '../../assets/images/left-arrow.svg';
import rightArrow from '../../assets/images/right-arrow.svg';

const Pagination = ({ data, perPage, setOffset }) => {
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (item) => {
    setOffset(Math.ceil(item.selected * perPage));
  };

  useEffect(() => {
    setPageCount(Math.ceil(data.length / perPage));
  }, [data, perPage]);

  useEffect(() => {
    // Prev Icon
    const prev = window.document.querySelector('.previous a');
    if (prev) {
      const prevIcon = window.document.createElement('img');
      prevIcon.src = leftArrow;
      prev.innerHTML = '';
      prev.appendChild(prevIcon);
    }

    // Next Icon
    const next = window.document.querySelector('.next a');
    if (next) {
      const nextIcon = window.document.createElement('img');
      nextIcon.src = rightArrow;
      next.innerHTML = '';
      next.appendChild(nextIcon);
    }
  }, []);

  return (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      breakLabel="..."
      breakClassName="break-me"
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
    />
  );
};

Pagination.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
};

export default Pagination;
