import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import leftArrow from '../../assets/images/left-arrow.svg';
import rightArrow from '../../assets/images/right-arrow.svg';

const ApiPagination = ({
  perPage,
  setOffset,
  apiPage,
  setApiPage,
  data,
  setIsLastPage,
  page,
  setPage,
  pagination,
}) => {
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (item) => {
    setOffset(Math.ceil(item.selected * perPage));
    setPage(item.selected);

    if (item.selected === pageCount - 1 && pagination.page !== pagination.totalPages) {
      setApiPage(apiPage + 1);
      setIsLastPage(true);
    }
  };

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

  useEffect(() => {
    setPageCount(Math.ceil(data.length / perPage));
  }, [data, perPage]);

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
      forcePage={page}
    />
  );
};

ApiPagination.propTypes = {
  perPage: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
  setIsLastPage: PropTypes.func.isRequired,
  apiPage: PropTypes.number.isRequired,
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setApiPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  pagination: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ApiPagination;
