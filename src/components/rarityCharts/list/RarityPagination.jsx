import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import AppContext from '../../../ContextAPI';
import leftArrow from '../../../assets/images/left-arrow.svg';
import rightArrow from '../../../assets/images/right-arrow.svg';

const RarityPagination = ({ data, perPage, setOffset, setApiPage, apiPage, setIsLastPage }) => {
  const { myUniverseNFTsActiverPage, setMyUniverseNFTsActiverPage } = useContext(AppContext);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (item) => {
    setOffset(Math.ceil(item.selected * perPage));
    setMyUniverseNFTsActiverPage(item.selected);
    // handle last page
    if (item.selected === pageCount - 1) {
      setApiPage(apiPage + 1);
      setIsLastPage(true);
    }
  };

  useEffect(() => {
    setPageCount(Math.ceil(data.length / perPage));
  }, [data, perPage]);

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
      forcePage={myUniverseNFTsActiverPage}
    />
  );
};

RarityPagination.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  apiPage: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
  setApiPage: PropTypes.func.isRequired,
  setIsLastPage: PropTypes.func.isRequired,
};

export default RarityPagination;
