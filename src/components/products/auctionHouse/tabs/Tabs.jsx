import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useErrorContext } from '../../../../contexts/ErrorContext';
import './Tabs.scss';
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab.jsx';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab.jsx';
import { getAllFutureAuctions, getAllActiveAuctions } from '../../../../utils/api/auctions';

const ENDING = { filter: 'ending', option: 'Ending soon' };
const RECENT = { filter: 'recent', option: 'Recently added' };
const HIGHEST_BID = { filter: 'highestBid', option: 'Highest winning bid' };
const LOWEST_BID = { filter: 'lowestBid', option: 'Lowest winning bid' };
const STARTING = { filter: 'starting', option: 'Starts soon' };

const Tabs = () => {
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();
  const [auctions, setAuctions] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);
  const [sortActive, setSortActive] = useState(ENDING.option);
  const [sortPast, setSortPast] = useState(STARTING.option);
  const [currentPage, setCurrentPage] = useState(0);

  const getAuctions = async (request, _offset, filter) => {
    setLoading(true);
    try {
      const response = await request(_offset, perPage, filter);
      if (response.error) {
        setErrorTitle('Unexpected error');
        setErrorBody(response.message);
        setShowError(true);
      }
      if (response.auctions) {
        setAuctions(response.auctions);
      }

      if (response.pagination) {
        const { total } = response.pagination;
        const pages = Math.ceil(total / perPage);
        setPageCount(pages);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const requestWithParams = (offset) => {
    if (selectedTabIndex === 0) {
      if (sortActive === ENDING.option) {
        getAuctions(getAllActiveAuctions, offset, ENDING.filter);
      } else if (sortActive === RECENT.option) {
        getAuctions(getAllActiveAuctions, offset, RECENT.filter);
      } else if (sortActive === HIGHEST_BID.option) {
        getAuctions(getAllActiveAuctions, offset, HIGHEST_BID.filter);
      } else if (sortActive === LOWEST_BID.option) {
        getAuctions(getAllActiveAuctions, offset, LOWEST_BID.filter);
      }
    } else if (selectedTabIndex === 1) {
      if (sortPast === STARTING.option) {
        getAuctions(getAllFutureAuctions, offset, STARTING.filter);
      } else if (sortPast === RECENT.option) {
        getAuctions(getAllFutureAuctions, offset, RECENT.filter);
      }
    }
  };

  const handlePageClick = (item) => {
    // let the user see the tabs after changing the page
    window.scrollTo(0, 360);
    setCurrentPage(item.selected);
    const offset = Math.ceil(item.selected * perPage);
    requestWithParams(offset);
  };

  useEffect(() => {
    setCurrentPage(0);
    requestWithParams(0);
  }, [selectedTabIndex, perPage, sortActive, sortPast]);

  return (
    <div className="auction__house__tabs__section">
      <div className="auction__house__tabs__section__container">
        <div className="tabs">
          <button
            type="button"
            onClick={() => {
              setSelectedTabIndex(0);
            }}
            className={`active__auctions__btn${selectedTabIndex === 0 ? ' active' : ''}`}
          >
            Active auctions
            <div className="btn--left--shape">
              <span className="circle" />
            </div>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedTabIndex(1);
            }}
            className={`future__auctions__btn${selectedTabIndex === 1 ? ' active' : ''}`}
          >
            Future auctions
            <div className="btn--middle--shape">
              <span className="circle" />
            </div>
            <div className="btn--right--shape">
              <span className="circle" />
            </div>
          </button>
        </div>
        <div className="tab__content">
          {selectedTabIndex === 0 ? (
            <ActiveAuctionsTab
              auctions={auctions}
              loading={loading}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              perPage={perPage}
              setPerPage={setPerPage}
              sort={sortActive}
              setSort={setSortActive}
              forcePage={currentPage}
            />
          ) : (
            <FutureAuctionsTab
              auctions={auctions}
              loading={loading}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              perPage={perPage}
              setPerPage={setPerPage}
              sort={sortPast}
              setSort={setSortPast}
              forcePage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Tabs);
